import { BlogPost } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { IFindUniqueBlogDTO, IUpdateBlogDTO } from '../../../domain/dtos/blogs';
import { setupUniqueBlogQuery } from '../helpers/blogs';
import AppError from '../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../domain/enums/responseCode';
import IBlogPostRepository from '../../repositories/blogsRepository';
import IMessageBroker from '../../providers/messageBroker';
import { blogUpdated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import { validateUpdateBlog } from '../../../utils/joi/blog';

export default class UpddateBlog
  implements
    IUseCase<
      [IFindUniqueBlogDTO, IUpdateBlogDTO],
      ReturnValue<BlogPost | null>
    >
{
  constructor(
    private readonly repo: IBlogPostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[query, data]: [IFindUniqueBlogDTO, IUpdateBlogDTO]
  ): Promise<ReturnValue<BlogPost | null>> {
    // Validate input
    await validateUpdateBlog(data);

    const Query = setupUniqueBlogQuery(query);

    // Ensure there is at least a key for the filter
    if (!Object.keys(Query).length) {
      return new ReturnValue<null>(
        false,
        'Invalid query parameters',
        null,
        new AppError('Invalid query parameters', ResponseCodes.BadRequest)
      );
    }

    // Ensure post exists
    const found = await this.repo.getPost({
      where: Query,
    });

    if (!found) {
      return new ReturnValue<null>(
        false,
        'Blog not found',
        null,
        new AppError('Blog not found', ResponseCodes.NotFound)
      );
    }

    // Update the post
    const updated = await this.repo.updatePost({
      where: Query,
      data,
    });

    // Publish event
    try {
      this.providers.messageBroker.publish({
        topic: blogUpdated,
        message: JSON.stringify(updated),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Blog updated successfully', updated);
  }
}

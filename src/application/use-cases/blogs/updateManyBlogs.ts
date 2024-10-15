import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { IFindBlogDTO, IUpdateBlogDTO } from '../../../domain/dtos/blogs';
import { setupFindManyBlogsQuery } from '../helpers/blogs';
import IBlogPostRepository from '../../repositories/blogsRepository';
import IMessageBroker from '../../providers/messageBroker';
import { blogsUpdated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import { validateUpdateBlog } from '../../../utils/joi/blog';

export default class UpddateBlogs
  implements
    IUseCase<[IFindBlogDTO, IUpdateBlogDTO], ReturnValue<Prisma.BatchPayload>>
{
  constructor(
    private readonly repo: IBlogPostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[query, data]: [IFindBlogDTO, IUpdateBlogDTO]
  ): Promise<ReturnValue<Prisma.BatchPayload>> {
    // Validate input
    await validateUpdateBlog(data);

    const Query = setupFindManyBlogsQuery(query);

    // Update the post
    const updated = await this.repo.updateManyPosts({
      where: Query,
      data,
    });

    // Publish event
    try {
      this.providers.messageBroker.publish({
        topic: blogsUpdated,
        message: JSON.stringify({
          ...updated,
          query,
        }),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Blogs updated successfully', updated);
  }
}

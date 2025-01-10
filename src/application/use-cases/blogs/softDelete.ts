import { BlogPost } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { IFindUniqueBlogDTO } from '../../../domain/dtos/blogs';
import { setupUniqueBlogQuery } from '../helpers/blogs';
import IBlogPostRepository from '../../repositories/blogsRepository';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { blogDeleted } from '../../../utils/kafkaTopics.json';

export default class SoftDeleteBlog
  implements IUseCase<[IFindUniqueBlogDTO], ReturnValue<BlogPost | null>>
{
  constructor(
    private readonly repository: IBlogPostRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[query]: [IFindUniqueBlogDTO]
  ): Promise<ReturnValue<BlogPost | null>> {
    const { messageBoker } = this.providers;

    const Query = setupUniqueBlogQuery(query);

    const deletedBlog = await this.repository.updatePost({
      where: Query,
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: blogDeleted,
        message: JSON.stringify(deletedBlog),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedBlog);
  }
}

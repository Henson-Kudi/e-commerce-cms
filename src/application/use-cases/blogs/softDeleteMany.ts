import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { IFindBlogDTO } from '../../../domain/dtos/blogs';
import { setupFindManyBlogsQuery } from '../helpers/blogs';
import IBlogPostRepository from '../../repositories/blogsRepository';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { blogPostsSoftDeleted } from '../../../utils/kafkaTopics.json';

export default class SoftDeleteBlogs
  implements IUseCase<[IFindBlogDTO], ReturnValue<Prisma.BatchPayload>>
{
  constructor(
    private readonly repository: IBlogPostRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[query]: [IFindBlogDTO]
  ): Promise<ReturnValue<Prisma.BatchPayload>> {
    const { messageBoker } = this.providers;

    const Query = setupFindManyBlogsQuery(query);

    const deletedBlogs = await this.repository.updateManyPosts({
      where: Query,
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: blogPostsSoftDeleted,
        message: JSON.stringify({
          ...deletedBlogs,
          query,
        }),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedBlogs);
  }
}

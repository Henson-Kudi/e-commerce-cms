import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { IFindBlogDTO } from '../../../domain/dtos/blogs';
import { setupFindManyBlogsQuery } from '../helpers/blogs';
import IBlogPostRepository from '../../repositories/blogsRepository';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { blogPostsDeleted } from '../../../utils/kafkaTopics.json';

export default class DeleteBlogs
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

    const deletedBlogs = await this.repository.deletePosts({
      where: Query,
    });

    try {
      messageBoker.publish({
        topic: blogPostsDeleted,
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

import { BlogPost } from '@prisma/client';
import IUseCase from '..';
import { ICreateBlogDTO } from '../../../domain/dtos/blogs';
import { validateCreateBlog } from '../../../utils/joi/blog';
import IBlogPostRepository from '../../repositories/blogsRepository';
import IMessageBroker from '../../providers/messageBroker';
import slugify from '../../../utils/slugify';
import { blogCreated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';

export default class CreateBlogUseCase
  implements IUseCase<[ICreateBlogDTO], ReturnValue<BlogPost>> {
  constructor(
    private readonly repo: IBlogPostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) { }

  async execute(...[data]: [ICreateBlogDTO]): Promise<ReturnValue<BlogPost>> {

    const { messageBroker } = this.providers;

    // Validate input
    await validateCreateBlog(data);

    // Maybe we want to ensure blogpost does not already exist in db before creating (not very necessary cus title and slug is unique at db level)

    // Create blog
    const blog = await this.repo.createPost({
      data: {
        ...data,
        slug: slugify(data.title),
      },
    });

    // Publish event
    try {
      messageBroker.publish({
        topic: blogCreated,
        message: JSON.stringify(blog),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', blog);
  }
}

import { BlogPost } from '@prisma/client';
import BlogPostService, {
  blogPostService,
} from '../../../../application/services/blogService';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import { validateCreateBlog } from '../../../../utils/joi/blog';

export default class CreateBlogController
  implements IContoller<ReturnValue<BlogPost>>
{
  constructor(private readonly blogsService: BlogPostService) {}

  async handle(request: RequestObject): Promise<ReturnValue<BlogPost>> {
    const createdBy =
      request.headers?.userId ??
      request.headers?.['user-id'] ??
      request.headers?.['userid'];

    await validateCreateBlog({
      ...(request.body || {}),
      createdBy,
    });

    const result = await this.blogsService.createPost({
      ...(request.body || {}),
      createdBy,
    });

    return result;
  }
}

export const createBlogController = new CreateBlogController(blogPostService);

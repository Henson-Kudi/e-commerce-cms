import { BlogPost } from '@prisma/client';
import BlogPostService, {
  blogPostService,
} from '../../../../application/services/blogService';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';

export default class FindBlogController
  implements IContoller<ReturnValue<BlogPost | null>>
{
  constructor(private readonly blogsService: BlogPostService) {}

  handle(request: RequestObject): Promise<ReturnValue<BlogPost | null>> {
    return this.blogsService.getPost({
      ...(request.query || {}),
      id: request.params.id,
    });
  }
}

export const findBlogController = new FindBlogController(blogPostService);

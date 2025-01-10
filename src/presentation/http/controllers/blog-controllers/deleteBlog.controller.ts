import { BlogPost } from '@prisma/client';
import BlogPostService, {
  blogPostService,
} from '../../../../application/services/blogService';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';

export default class DeleteBlogController
  implements IContoller<ReturnValue<BlogPost | null>>
{
  constructor(private readonly blogsService: BlogPostService) {}

  handle(request: RequestObject): Promise<ReturnValue<BlogPost | null>> {
    return this.blogsService.deletePost(
      {
        id: request.params.id,
        ...(request.query || {}),
      },
      { soft: request.query?.soft && request.query.soft === 'true' }
    );
  }
}

export const deleteBlogController = new DeleteBlogController(blogPostService);

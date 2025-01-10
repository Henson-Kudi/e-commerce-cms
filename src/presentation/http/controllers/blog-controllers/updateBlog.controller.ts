import { BlogPost } from '@prisma/client';
import BlogPostService, {
  blogPostService,
} from '../../../../application/services/blogService';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import { validateUpdateBlog } from '../../../../utils/joi/blog';

export default class UpdateBlogController
  implements IContoller<ReturnValue<BlogPost | null>>
{
  constructor(private readonly blogsService: BlogPostService) {}

  async handle(request: RequestObject): Promise<ReturnValue<BlogPost | null>> {
    const lastModifiedBy =
      request.headers?.userId ??
      request.headers?.['user-id'] ??
      request.headers?.['userid'];
    const {
      title,
      content,
      delta,
      headerImage,
      metaTitle,
      metaDescription,
      metaTags,
      isActive,
    } = request.body || {};

    await validateUpdateBlog({
      headerImage,
      title,
      content,
      delta,
      metaTitle,
      metaDescription,
      metaTags,
      isActive,
      lastModifiedBy,
    });

    const result = await this.blogsService.updatePost(
      {
        id: request.params.id,
      },
      {
        headerImage,
        title,
        content,
        delta,
        metaTitle,
        metaDescription,
        metaTags,
        isActive,
        lastModifiedBy,
      }
    );

    return result;
  }
}

export const updateBlogController = new UpdateBlogController(blogPostService);

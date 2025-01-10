import { BlogPost } from '@prisma/client';
import BlogPostService, {
  blogPostService,
} from '../../../../application/services/blogService';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import AppError from '../../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../../domain/enums/responseCode';

export default class GetBlogByslugController
  implements IContoller<ReturnValue<BlogPost | null>>
{
  constructor(private readonly blogsService: BlogPostService) {}

  handle(request: RequestObject): Promise<ReturnValue<BlogPost | null>> {
    if (!request.params.slug) {
      return Promise.resolve(
        new ReturnValue(
          false,
          'slug is required',
          null,
          new AppError('slug is required', ResponseCodes.BadRequest)
        )
      );
    }

    return this.blogsService.getPost({
      slug: request.params.slug,
    });
  }
}

export const getBlogBySlugController = new GetBlogByslugController(
  blogPostService
);

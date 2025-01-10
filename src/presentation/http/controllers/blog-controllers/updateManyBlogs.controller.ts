import { Prisma } from '@prisma/client';
import BlogPostService, {
  blogPostService,
} from '../../../../application/services/blogService';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import { validateUpdateBlog } from '../../../../utils/joi/blog';

export default class UpdateBlogsController
  implements IContoller<ReturnValue<Prisma.BatchPayload>>
{
  constructor(private readonly blogsService: BlogPostService) {}

  async handle(
    request: RequestObject
  ): Promise<ReturnValue<Prisma.BatchPayload>> {
    await validateUpdateBlog({
      ...(request.body || {}),
      lastModifiedBy: request.headers?.userId,
    });

    const result = await this.blogsService.updateManyPosts(
      {
        id: request.params.id,
      },
      {
        ...(request.body || {}),
        lastModifiedBy: request.headers?.userId,
      }
    );

    return result;
  }
}

export const updateBlogsController = new UpdateBlogsController(blogPostService);

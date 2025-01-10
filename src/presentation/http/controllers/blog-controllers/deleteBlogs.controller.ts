import { Prisma } from '@prisma/client';
import BlogPostService, {
  blogPostService,
} from '../../../../application/services/blogService';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';

export default class DeleteBlogsController
  implements IContoller<ReturnValue<Prisma.BatchPayload>>
{
  constructor(private readonly blogsService: BlogPostService) {}

  handle(request: RequestObject): Promise<ReturnValue<Prisma.BatchPayload>> {
    return this.blogsService.deletePosts(
      {
        id: request.params.id,
        ...(request.query || {}),
      },
      { soft: request.query?.soft && request.query.soft === 'true' }
    );
  }
}

export const deleteBlogsController = new DeleteBlogsController(blogPostService);

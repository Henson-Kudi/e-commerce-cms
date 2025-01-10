import { Banner } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValueWithPagination } from '../../../../domain/valueObjects/returnValue';
import BannersService, {
  bannersService,
} from '../../../../application/services/bannerService';

export default class FindBannersController
  implements IContoller<ReturnValueWithPagination<Banner[]>>
{
  constructor(private readonly service: BannersService) {}

  handle(request: RequestObject): Promise<ReturnValueWithPagination<Banner[]>> {
    const page = request.query?.page ? Number(request.query.page) : 1;
    const limit = request.query?.limit ? Number(request.query.limit) : 10;

    return this.service.getBanners(
      {
        ...(request.query || {}),
        isActive:
          !request?.query?.isActive || (request.query?.isActive !== 'false' && request.query?.isActive !== false),
        isDeleted:
          request?.query?.isDeleted && request.query?.isDeleted === 'true',
      },
      {
        limit: !isNaN(limit) && limit > 0 ? limit : 10,
        page: !isNaN(page) && page > 0 ? page : 1,
      }
    );
  }
}

export const findBannersController = new FindBannersController(bannersService);

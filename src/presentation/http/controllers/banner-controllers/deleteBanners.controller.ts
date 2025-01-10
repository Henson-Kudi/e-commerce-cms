import { Prisma } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import BannersService, {
  bannersService,
} from '../../../../application/services/bannerService';

export default class DeleteBannersController
  implements IContoller<ReturnValue<Prisma.BatchPayload>>
{
  constructor(private readonly service: BannersService) {}

  handle(request: RequestObject): Promise<ReturnValue<Prisma.BatchPayload>> {
    return this.service.deleteBanners(
      {
        ...(request.query || {}),
        id: request.params.id,
      },
      { soft: request.query?.soft && request.query.soft === 'true' }
    );
  }
}

export const deleteBannersController = new DeleteBannersController(
  bannersService
);

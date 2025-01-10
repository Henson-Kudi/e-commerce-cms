import { Banner } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import BannersService, {
  bannersService,
} from '../../../../application/services/bannerService';
import AppError from '../../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../../domain/enums/responseCode';

export default class DeleteBannerController
  implements IContoller<ReturnValue<Banner | null>>
{
  constructor(private readonly service: BannersService) {}

  handle(request: RequestObject): Promise<ReturnValue<Banner | null>> {
    if (!request?.params?.id) {
      return Promise.resolve(
        new ReturnValue(
          false,
          'id is required',
          null,
          new AppError('id is required', ResponseCodes.BadRequest)
        )
      );
    }

    return this.service.deleteBanner(request.params.id, {
      soft: request.query?.soft && request.query.soft === 'true',
    });
  }
}

export const deleteBannerController = new DeleteBannerController(
  bannersService
);

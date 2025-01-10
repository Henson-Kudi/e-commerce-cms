import { Banner } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import { validateCreateBanner } from '../../../../utils/joi/banner';
import BannersService, {
  bannersService,
} from '../../../../application/services/bannerService';

export default class CreateBannerController
  implements IContoller<ReturnValue<Banner>>
{
  constructor(private readonly service: BannersService) {}

  async handle(request: RequestObject): Promise<ReturnValue<Banner>> {
    await validateCreateBanner({
      ...(request.body || {}),
      createdBy: request.headers?.userId,
    });

    const result = await this.service.createBanner({
      ...(request.body || {}),
      createdBy: request.headers?.userId,
    });

    return result;
  }
}

export const createBannerController = new CreateBannerController(
  bannersService
);

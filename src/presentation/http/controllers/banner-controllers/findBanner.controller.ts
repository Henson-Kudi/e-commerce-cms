import { Banner } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import BannersService, {
  bannersService,
} from '../../../../application/services/bannerService';

export default class FindBannerController
  implements IContoller<ReturnValue<Banner | null>>
{
  constructor(private readonly service: BannersService) {}

  handle(request: RequestObject): Promise<ReturnValue<Banner | null>> {
    return this.service.getBanner({
      ...(request.query || {}),
      id: request.params.id,
    });
  }
}

export const findBannerController = new FindBannerController(bannersService);

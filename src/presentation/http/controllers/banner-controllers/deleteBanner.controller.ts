import { Banner } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import BannersService, { bannersService } from "../../../../application/services/bannerService";

export default class DeleteBannerController implements IContoller<ReturnValue<Banner | null>> {
    constructor(private readonly service: BannersService) { }

    handle(request: RequestObject): Promise<ReturnValue<Banner | null>> {
        return this.service.deleteBanner({
            id: request.params.id,
            ...(request.query || {})
        }, { soft: request.query?.soft && request.query.soft === 'true' });

    }




}

export const deleteBannerController = new DeleteBannerController(bannersService);
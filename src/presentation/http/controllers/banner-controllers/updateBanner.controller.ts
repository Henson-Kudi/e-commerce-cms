import { Banner } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import { validateUpdateBanner } from "../../../../utils/joi/banner";
import BannersService, { bannersService } from "../../../../application/services/bannerService";

export default class UpdateBannerController implements IContoller<ReturnValue<Banner | null>> {
    constructor(private readonly service: BannersService) { }

    async handle(request: RequestObject): Promise<ReturnValue<Banner | null>> {
        await validateUpdateBanner({
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        const result = await this.service.updateBanner(request.params.id, {
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        return result
    }




}

export const updateBannerController = new UpdateBannerController(bannersService);
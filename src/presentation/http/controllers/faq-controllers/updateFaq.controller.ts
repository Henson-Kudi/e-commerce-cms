import { Faq } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import { validateUpdateFaq } from "../../../../utils/joi/faq";
import FaqService, { faqService } from "../../../../application/services/faqService";

export default class UpdateFaqController implements IContoller<ReturnValue<Faq | null>> {
    constructor(private readonly service: FaqService) { }

    async handle(request: RequestObject): Promise<ReturnValue<Faq | null>> {
        await validateUpdateFaq({
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        const result = await this.service.updateFaq(request.params.id, {
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        return result
    }




}

export const updateFaqController = new UpdateFaqController(faqService)
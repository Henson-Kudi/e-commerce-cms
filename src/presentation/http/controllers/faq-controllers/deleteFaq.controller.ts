import { Faq } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import FaqService, { faqService } from "../../../../application/services/faqService";

export default class DeleteFaqController implements IContoller<ReturnValue<Faq | null>> {
    constructor(private readonly service: FaqService) { }

    handle(request: RequestObject): Promise<ReturnValue<Faq | null>> {
        return this.service.deleteFaq({
            id: request.params.id,
            ...(request.query || {})
        }, { soft: request.query?.soft && request.query.soft === 'true' });

    }




}

export const deleteFaqController = new DeleteFaqController(faqService)
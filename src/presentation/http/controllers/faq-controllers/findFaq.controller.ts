import { Faq } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import FaqService, { faqService } from "../../../../application/services/faqService";

export default class FindFaqController implements IContoller<ReturnValue<Faq | null>> {
    constructor(private readonly service: FaqService) { }

    handle(request: RequestObject): Promise<ReturnValue<Faq | null>> {

        return this.service.getFaq({
            ...(request.query || {}),
            id: request.params.id,
        });
    }
}

export const findFaqController = new FindFaqController(faqService)
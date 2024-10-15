import { Faq } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import { validateCreateFaq } from "../../../../utils/joi/faq";
import FaqService, { faqService } from "../../../../application/services/faqService";

export default class CreateFaqController implements IContoller<ReturnValue<Faq>> {
    constructor(private readonly service: FaqService) { }

    async handle(request: RequestObject): Promise<ReturnValue<Faq>> {
        await validateCreateFaq({
            ...(request.body || {}),
            createdBy: request.headers?.userId,
        });

        const result = await this.service.createFaq({
            ...(request.body || {}),
            createdBy: request.headers?.userId,
        });

        return result
    }




}

export const createFaqController = new CreateFaqController(faqService)
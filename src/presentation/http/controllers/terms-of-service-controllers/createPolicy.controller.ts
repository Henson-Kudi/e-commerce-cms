import { TermsOfService } from "@prisma/client";
import TermsOfServiceService, { termsOfServiceService } from "../../../../application/services/termsOfService";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import { validateCreateTermsAndConditions } from "../../../../utils/joi/termsAndConditions";
import RequestObject from "../../../../utils/types/requestObject";
import IContoller from "../Icontroller";

export default class CreateTermsOfServiceController implements IContoller<ReturnValue<TermsOfService>> {
    constructor(private readonly service: TermsOfServiceService) { }

    async handle(request: RequestObject): Promise<ReturnValue<TermsOfService>> {
        await validateCreateTermsAndConditions({
            ...(request.body || {}),
            createdBy: request.headers?.userId,
        });

        const result = await this.service.createTermsOfService({
            ...(request.body || {}),
            createdBy: request.headers?.userId,
        });

        return result
    }




}

export const createTermsOfServiceController = new CreateTermsOfServiceController(termsOfServiceService)

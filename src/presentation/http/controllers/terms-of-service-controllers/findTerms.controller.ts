import { TermsOfService } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import TermsService, { termsOfServiceService } from "../../../../application/services/termsOfService";

export default class FindTermsController implements IContoller<ReturnValue<TermsOfService | null>> {
    constructor(private readonly service: TermsService) { }

    handle(request: RequestObject): Promise<ReturnValue<TermsOfService | null>> {

        return this.service.getTermsOfService({
            ...(request.query || {}),
            id: request.params.id,
        });
    }
}

export const findTermsController = new FindTermsController(termsOfServiceService)
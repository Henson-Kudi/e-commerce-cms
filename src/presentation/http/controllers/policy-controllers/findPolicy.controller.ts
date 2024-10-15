import { PrivacyPolicy } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import PolicyService, { policyService } from "../../../../application/services/policyService";

export default class FindPolicyController implements IContoller<ReturnValue<PrivacyPolicy | null>> {
    constructor(private readonly service: PolicyService) { }

    handle(request: RequestObject): Promise<ReturnValue<PrivacyPolicy | null>> {

        return this.service.getPolicy({
            ...(request.query || {}),
            id: request.params.id,
        });
    }
}

export const findPolicyController = new FindPolicyController(policyService)

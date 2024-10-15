import { PrivacyPolicy } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import PolicyService, { policyService } from "../../../../application/services/policyService";

export default class DeletePolicyController implements IContoller<ReturnValue<PrivacyPolicy | null>> {
    constructor(private readonly service: PolicyService) { }

    handle(request: RequestObject): Promise<ReturnValue<PrivacyPolicy | null>> {
        return this.service.deletePolicy({
            id: request.params.id,
            ...(request.query || {})
        }, { soft: request.query?.soft && request.query.soft === 'true' });

    }




}

export const deletePolicyController = new DeletePolicyController(policyService)

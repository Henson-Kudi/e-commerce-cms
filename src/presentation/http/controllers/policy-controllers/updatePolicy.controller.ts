import { PrivacyPolicy } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import PolicyService, { policyService } from "../../../../application/services/policyService";
import { validateUpdatePrivacyPolicy } from "../../../../utils/joi/privacyPolicy";

export default class UpdatePolicyController implements IContoller<ReturnValue<PrivacyPolicy | null>> {
    constructor(private readonly service: PolicyService) { }

    async handle(request: RequestObject): Promise<ReturnValue<PrivacyPolicy | null>> {
        await validateUpdatePrivacyPolicy({
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        const result = await this.service.updatePolicy(request.params.id, {
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        return result
    }




}

export const updatePolicyController = new UpdatePolicyController(policyService)

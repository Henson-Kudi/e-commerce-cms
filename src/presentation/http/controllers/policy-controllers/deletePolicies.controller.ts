import { Prisma } from "@prisma/client";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue"
import PolicyService, { policyService } from "../../../../application/services/policyService";

export default class DeletePoliciesController implements IContoller<ReturnValue<Prisma.BatchPayload>> {
    constructor(private readonly service: PolicyService) { }

    handle(request: RequestObject): Promise<ReturnValue<Prisma.BatchPayload>> {

        return this.service.deletePolicies({
            ...(request.query || {}),
            id: request.params.id,
        }, { soft: request.query?.soft && request.query.soft === 'true' });

    }




}

export const deletePoliciesController = new DeletePoliciesController(policyService)
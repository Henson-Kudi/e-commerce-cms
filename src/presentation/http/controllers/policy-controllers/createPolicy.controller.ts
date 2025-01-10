import { PrivacyPolicy } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import PolicyService, {
  policyService,
} from '../../../../application/services/policyService';
import { validateCreatePrivacyPolicy } from '../../../../utils/joi/privacyPolicy';

export default class CreatePolicyController
  implements IContoller<ReturnValue<PrivacyPolicy>>
{
  constructor(private readonly service: PolicyService) {}

  async handle(request: RequestObject): Promise<ReturnValue<PrivacyPolicy>> {
    await validateCreatePrivacyPolicy({
      ...(request.body || {}),
      createdBy: request.headers?.userId,
    });

    const result = await this.service.createPolicy({
      ...(request.body || {}),
      createdBy: request.headers?.userId,
    });

    return result;
  }
}

export const createPolicyController = new CreatePolicyController(policyService);

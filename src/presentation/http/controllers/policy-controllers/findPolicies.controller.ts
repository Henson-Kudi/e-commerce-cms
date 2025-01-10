import { PrivacyPolicy } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValueWithPagination } from '../../../../domain/valueObjects/returnValue';
import PolicyService, {
  policyService,
} from '../../../../application/services/policyService';

export default class FindPoliciesController
  implements IContoller<ReturnValueWithPagination<PrivacyPolicy[]>>
{
  constructor(private readonly service: PolicyService) {}

  handle(
    request: RequestObject
  ): Promise<ReturnValueWithPagination<PrivacyPolicy[]>> {
    const page = request.query?.page ? Number(request.query.page) : 1;
    const limit = request.query?.limit ? Number(request.query.limit) : 10;

    return this.service.getPolicies(
      {
        ...(request.query || {}),
      },
      {
        limit: !isNaN(limit) && limit > 0 ? limit : 10,
        page: !isNaN(page) && page > 0 ? page : 1,
      }
    );
  }
}

export const findPoliciesController = new FindPoliciesController(policyService);

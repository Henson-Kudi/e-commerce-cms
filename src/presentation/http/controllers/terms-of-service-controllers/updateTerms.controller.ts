import { TermsOfService } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import TermsService, {
  termsOfServiceService,
} from '../../../../application/services/termsOfService';
import { validateUpdateTermsAndConditions } from '../../../../utils/joi/termsAndConditions';

export default class UpdateTermsController
  implements IContoller<ReturnValue<TermsOfService | null>>
{
  constructor(private readonly service: TermsService) {}

  async handle(
    request: RequestObject
  ): Promise<ReturnValue<TermsOfService | null>> {
    await validateUpdateTermsAndConditions({
      ...(request.body || {}),
      lastModifiedBy: request.headers?.userId,
    });

    const result = await this.service.updateTermsOfService(request.params.id, {
      ...(request.body || {}),
      lastModifiedBy: request.headers?.userId,
    });

    return result;
  }
}

export const updateTermsController = new UpdateTermsController(
  termsOfServiceService
);

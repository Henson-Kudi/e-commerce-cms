import { TermsOfService } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import TermsOfServiceService, {
  termsOfServiceService,
} from '../../../../application/services/termsOfService';

export default class DeleteTermsController
  implements IContoller<ReturnValue<TermsOfService | null>>
{
  constructor(private readonly service: TermsOfServiceService) {}

  handle(request: RequestObject): Promise<ReturnValue<TermsOfService | null>> {
    return this.service.deleteTermsOfService(
      {
        id: request.params.id,
        ...(request.query || {}),
      },
      { soft: request.query?.soft && request.query.soft === 'true' }
    );
  }
}

export const deleteTermsController = new DeleteTermsController(
  termsOfServiceService
);

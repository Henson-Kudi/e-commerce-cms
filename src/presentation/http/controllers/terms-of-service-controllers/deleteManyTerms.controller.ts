import { Prisma } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import TermsOfService, {
  termsOfServiceService,
} from '../../../../application/services/termsOfService';

export default class DeleteManyTermsController
  implements IContoller<ReturnValue<Prisma.BatchPayload>>
{
  constructor(private readonly service: TermsOfService) {}

  handle(request: RequestObject): Promise<ReturnValue<Prisma.BatchPayload>> {
    return this.service.deleteManyTermsOfService(
      {
        ...(request.query || {}),
        id: request.params.id,
      },
      { soft: request.query?.soft && request.query.soft === 'true' }
    );
  }
}

export const deleteManyTermsController = new DeleteManyTermsController(
  termsOfServiceService
);

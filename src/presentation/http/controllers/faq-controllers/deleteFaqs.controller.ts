import { Prisma } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import FaqService, {
  faqService,
} from '../../../../application/services/faqService';

export default class DeleteFaqsController
  implements IContoller<ReturnValue<Prisma.BatchPayload>>
{
  constructor(private readonly service: FaqService) {}

  handle(request: RequestObject): Promise<ReturnValue<Prisma.BatchPayload>> {
    return this.service.deleteFaqs(
      {
        ...(request.query || {}),
        id: request.params.id,
      },
      { soft: request.query?.soft && request.query.soft === 'true' }
    );
  }
}

export const deleteFaqsController = new DeleteFaqsController(faqService);

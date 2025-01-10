import { Faq } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValue } from '../../../../domain/valueObjects/returnValue';
import FaqService, {
  faqService,
} from '../../../../application/services/faqService';
import AppError from '../../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../../domain/enums/responseCode';

export default class DeleteFaqController
  implements IContoller<ReturnValue<Faq | null>>
{
  constructor(private readonly service: FaqService) {}

  handle(request: RequestObject): Promise<ReturnValue<Faq | null>> {
    if (!request?.params?.id) {
      return Promise.resolve(
        new ReturnValue(
          false,
          'id is required',
          null,
          new AppError('id is required', ResponseCodes.BadRequest)
        )
      );
    }

    return this.service.deleteFaq(request?.params?.id, {
      soft: request.query?.soft && request.query.soft === 'true',
    });
  }
}

export const deleteFaqController = new DeleteFaqController(faqService);

import { Faq } from '@prisma/client';
import IContoller from '../Icontroller';
import RequestObject from '../../../../utils/types/requestObject';
import { ReturnValueWithPagination } from '../../../../domain/valueObjects/returnValue';
import FaqService, {
  faqService,
} from '../../../../application/services/faqService';

export default class FindFaqsController
  implements IContoller<ReturnValueWithPagination<Faq[]>>
{
  constructor(private readonly service: FaqService) {}

  handle(request: RequestObject): Promise<ReturnValueWithPagination<Faq[]>> {
    const page = request.query?.page ? Number(request.query.page) : 1;
    const limit = request.query?.limit ? Number(request.query.limit) : 10;

    return this.service.getFaqs(
      {
        ...(request.query || {}),
        isActive:
          request?.query?.isActive && request.query?.isActive === 'true',
        isDeleted:
          request?.query?.isDeleted && request.query?.isDeleted === 'true',
      },
      {
        limit: !isNaN(limit) && limit > 0 ? limit : 10,
        page: !isNaN(page) && page > 0 ? page : 1,
      }
    );
  }
}
export const findFaqsController = new FindFaqsController(faqService);

import { Faq } from '@prisma/client';
import IUseCase from '..';
import { ReturnValueWithPagination } from '../../../domain/valueObjects/returnValue';
import { setupFindManyFaqsQuery } from '../helpers/faqs';
import { setupPagination } from '../helpers';
import { IFindFaqDTO, IFindFaqOptions } from '../../../domain/dtos/faqs';
import IFaqPostRepository from '../../repositories/faqRepository';

export default class FindFaqs
  implements
  IUseCase<
    [IFindFaqDTO, IFindFaqOptions],
    ReturnValueWithPagination<Faq[]>
  > {
  constructor(private readonly repository: IFaqPostRepository) { }

  async execute(
    ...[query, options]: [IFindFaqDTO, IFindFaqOptions]
  ): Promise<ReturnValueWithPagination<Faq[]>> {

    const Query = setupFindManyFaqsQuery(query);
    const pagination = setupPagination(options);

    const count = await this.repository.countFaqs({ where: Query });

    const foundFaqs = await this.repository.getFaqs({
      where: Query,
      take: pagination.limit,
      skip: pagination.skip,
    });

    return new ReturnValueWithPagination(true, 'Success', {
      data: foundFaqs,
      total: count,
      ...pagination,
    });
  }
}

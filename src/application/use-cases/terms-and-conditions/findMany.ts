import { TermsOfService } from '@prisma/client';
import IUseCase from '..';
import { ReturnValueWithPagination } from '../../../domain/valueObjects/returnValue';
import { setupPagination } from '../helpers';
import {
  IFindTermsAndConditionsDTO,
  IFindTermsAndConditionsOptions,
} from '../../../domain/dtos/termsAndConditions';
import ITermsOfServicePostRepository from '../../repositories/termsOfService';
import { setupFindManyTermsAndConditonsQuery } from '../helpers/termsAndConditions';

export default class FindManyTermsOfService
  implements
    IUseCase<
      [IFindTermsAndConditionsDTO, IFindTermsAndConditionsOptions],
      ReturnValueWithPagination<TermsOfService[]>
    >
{
  constructor(private readonly repository: ITermsOfServicePostRepository) {}

  async execute(
    ...[query, options]: [
      IFindTermsAndConditionsDTO,
      IFindTermsAndConditionsOptions,
    ]
  ): Promise<ReturnValueWithPagination<TermsOfService[]>> {
    const Query = setupFindManyTermsAndConditonsQuery(query);
    const pagination = setupPagination(options);

    const count = await this.repository.countTermsOfServices({ where: Query });

    const found = await this.repository.getTermsOfServices({
      where: Query,
      take: pagination.limit,
      skip: pagination.skip,
    });

    return new ReturnValueWithPagination(true, 'Success', {
      data: found,
      total: count,
      ...pagination,
    });
  }
}

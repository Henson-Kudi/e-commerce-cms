import { PrivacyPolicy } from '@prisma/client';
import IUseCase from '..';
import { ReturnValueWithPagination } from '../../../domain/valueObjects/returnValue';
import { setupPagination } from '../helpers';
import { IFindPolicyDTO, IFindPrivacyOptions } from '../../../domain/dtos/privacyPolicy';
import { setupFindManyPoliciesQuery } from '../helpers/privacyPolicy';
import IPrivacyPolicyRepository from '../../repositories/privacyPolicy';

export default class FindPolicies
  implements
  IUseCase<
    [IFindPolicyDTO, IFindPrivacyOptions],
    ReturnValueWithPagination<PrivacyPolicy[]>
  > {
  constructor(private readonly repository: IPrivacyPolicyRepository) { }

  async execute(
    ...[query, options]: [IFindPolicyDTO, IFindPrivacyOptions]
  ): Promise<ReturnValueWithPagination<PrivacyPolicy[]>> {

    const Query = setupFindManyPoliciesQuery(query);
    const pagination = setupPagination(options);

    const count = await this.repository.countPolicies({ where: Query });

    const foundFaqs = await this.repository.getPolicies({
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

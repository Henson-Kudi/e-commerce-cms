import { TermsOfService } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import ITermsOfServicePostRepository from '../../repositories/termsOfService';

export default class FindTermsOfService
  implements IUseCase<[string], ReturnValue<TermsOfService | null>> {
  constructor(private readonly repository: ITermsOfServicePostRepository

  ) { }

  async execute(
    ...[id]: [string]
  ): Promise<ReturnValue<TermsOfService | null>> {

    const found = await this.repository.getTermsOfService({
      where: { id },
    });

    return new ReturnValue(true, 'Success', found);
  }
}

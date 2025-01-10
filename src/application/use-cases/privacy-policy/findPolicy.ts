import { PrivacyPolicy } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import IPrivacyPolicyRepository from '../../repositories/privacyPolicy';

export default class FindPolicy
  implements IUseCase<[string], ReturnValue<PrivacyPolicy | null>>
{
  constructor(private readonly repository: IPrivacyPolicyRepository) {}

  async execute(...[id]: [string]): Promise<ReturnValue<PrivacyPolicy | null>> {
    const faq = await this.repository.getPolicy({
      where: { id },
    });

    return new ReturnValue(true, 'Success', faq);
  }
}

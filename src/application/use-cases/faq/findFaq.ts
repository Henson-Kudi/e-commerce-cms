import { Faq } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import IFaqPostRepository from '../../repositories/faqRepository';

export default class FindFaq
  implements IUseCase<[string], ReturnValue<Faq | null>> {
  constructor(private readonly repository: IFaqPostRepository) { }

  async execute(
    ...[id]: [string]
  ): Promise<ReturnValue<Faq | null>> {

    const faq = await this.repository.getFaq({
      where: { id },
    });

    return new ReturnValue(true, 'Success', faq);
  }
}

import { Faq } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { faqSoftDeleted } from '../../../utils/kafkaTopics.json';
import IFaqPostRepository from '../../repositories/faqRepository';

export default class SoftDeleteFaq
  implements IUseCase<[string], ReturnValue<Faq | null>> {
  constructor(
    private readonly repository: IFaqPostRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[id]: [string]
  ): Promise<ReturnValue<Faq | null>> {

    const { messageBoker } = this.providers;

    const deletedFaq = await this.repository.updateFaq({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: faqSoftDeleted,
        message: JSON.stringify(deletedFaq),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedFaq);
  }
}

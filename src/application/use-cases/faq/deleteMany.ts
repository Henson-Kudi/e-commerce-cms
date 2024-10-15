import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { faqsDeleted } from '../../../utils/kafkaTopics.json';
import IFaqPostRepository from '../../repositories/faqRepository';

export default class DeleteFaqs
  implements IUseCase<[string[]], ReturnValue<Prisma.BatchPayload>> {
  constructor(
    private readonly repository: IFaqPostRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[ids]: [string[]]
  ): Promise<ReturnValue<Prisma.BatchPayload>> {
    const { messageBoker } = this.providers;

    const deletedFaqs = await this.repository.deleteFaqs({
      where: { id: { in: ids } },
    });

    try {
      messageBoker.publish({
        topic: faqsDeleted,
        message: JSON.stringify({
          ...deletedFaqs,
          query: { id: ids },
        }),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedFaqs);
  }
}

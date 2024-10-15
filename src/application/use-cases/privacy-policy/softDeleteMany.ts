import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { policiesSoftDeleted } from '../../../utils/kafkaTopics.json';
import IPrivacyPolicyRepository from '../../repositories/privacyPolicy';

export default class SoftDeletePolicies
  implements IUseCase<[string[]], ReturnValue<Prisma.BatchPayload>> {
  constructor(
    private readonly repository: IPrivacyPolicyRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[ids]: [string[]]
  ): Promise<ReturnValue<Prisma.BatchPayload>> {
    const { messageBoker } = this.providers;

    const deletedFaqs = await this.repository.updateManyPolicies({
      where: { id: { in: ids } },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: policiesSoftDeleted,
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

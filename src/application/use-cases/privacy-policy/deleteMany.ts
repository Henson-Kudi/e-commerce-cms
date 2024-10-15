import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { policiesDeleted } from '../../../utils/kafkaTopics.json';
import IPrivacyPolicyRepository from '../../repositories/privacyPolicy';

export default class DeletePolicies
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

    const deletedFaqs = await this.repository.deletePolicies({
      where: { id: { in: ids } }
    });

    try {
      messageBoker.publish({
        topic: policiesDeleted,
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

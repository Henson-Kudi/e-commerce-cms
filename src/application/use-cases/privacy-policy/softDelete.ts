import { PrivacyPolicy } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { policySoftDeleted } from '../../../utils/kafkaTopics.json';
import IPrivacyPolicyRepository from '../../repositories/privacyPolicy';

export default class SoftDeletePolicy
  implements IUseCase<[string], ReturnValue<PrivacyPolicy | null>> {
  constructor(
    private readonly repository: IPrivacyPolicyRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[id]: [string]
  ): Promise<ReturnValue<PrivacyPolicy | null>> {

    const { messageBoker } = this.providers;

    const deletedPolicy = await this.repository.updatePolicy({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: policySoftDeleted,
        message: JSON.stringify(deletedPolicy),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedPolicy);
  }
}

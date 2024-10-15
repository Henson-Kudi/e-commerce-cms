import { TermsOfService } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { conditionSoftDeleted } from '../../../utils/kafkaTopics.json';
import ITermsOfServicePostRepository from '../../repositories/termsOfService';

export default class SoftDeleteTermsOfService
  implements IUseCase<[string], ReturnValue<TermsOfService | null>> {
  constructor(
    private readonly repository: ITermsOfServicePostRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[id]: [string]
  ): Promise<ReturnValue<TermsOfService | null>> {

    const { messageBoker } = this.providers;

    const deleted = await this.repository.updateTermsOfService({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: conditionSoftDeleted,
        message: JSON.stringify(deleted),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deleted);
  }
}

import { TermsOfService } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { conditionDeleted } from '../../../utils/kafkaTopics.json';
import ITermsOfServicePostRepository from '../../repositories/termsOfService';

export default class DeleteTermsOfService
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


    const deleted = await this.repository.deleteTermsOfService({
      where: { id },
    });

    try {
      messageBoker.publish({
        topic: conditionDeleted,
        message: JSON.stringify(deleted),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deleted);
  }
}

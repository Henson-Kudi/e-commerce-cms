import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { conditionsSoftDeleted } from '../../../utils/kafkaTopics.json';
import ITermsOfServicePostRepository from '../../repositories/termsOfService';

export default class SoftDeleteManyTermsOfService
  implements IUseCase<[string[]], ReturnValue<Prisma.BatchPayload>> {
  constructor(
    private readonly repository: ITermsOfServicePostRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[ids]: [string[]]
  ): Promise<ReturnValue<Prisma.BatchPayload>> {
    const { messageBoker } = this.providers;

    const deleted = await this.repository.updateManyTermsOfServices({
      where: { id: { in: ids } },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: conditionsSoftDeleted,
        message: JSON.stringify({
          ...deleted,
          query: { id: ids },
        }),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deleted);
  }
}

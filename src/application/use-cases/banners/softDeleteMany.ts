import { Prisma } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { bannersDeleted } from '../../../utils/kafkaTopics.json';
import IBannerRepository from '../../repositories/bannersRepository';

export default class SoftDeleteBanners
  implements IUseCase<[string[]], ReturnValue<Prisma.BatchPayload>>
{
  constructor(
    private readonly repository: IBannerRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[ids]: [string[]]
  ): Promise<ReturnValue<Prisma.BatchPayload>> {
    const { messageBoker } = this.providers;

    const deletedBanners = await this.repository.updateManyBanners({
      where: { id: { in: ids } },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    try {
      messageBoker.publish({
        topic: bannersDeleted,
        message: JSON.stringify({
          ...deletedBanners,
          query: { id: ids },
        }),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedBanners);
  }
}

import { Banner } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import IBannerRepository from '../../repositories/bannersRepository';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { bannerSoftDeleted } from '../../../utils/kafkaTopics.json';

export default class SoftDeleteBanner
  implements IUseCase<[string], ReturnValue<Banner | null>> {
  constructor(
    private readonly repository: IBannerRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[id]: [string]
  ): Promise<ReturnValue<Banner | null>> {

    const { messageBoker } = this.providers;

    const deletedBanner = await this.repository.updateBanner({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      },
    });

    try {
      messageBoker.publish({
        topic: bannerSoftDeleted,
        message: JSON.stringify(deletedBanner),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedBanner);
  }
}

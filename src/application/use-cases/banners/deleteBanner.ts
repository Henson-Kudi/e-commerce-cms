import { Banner } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import IBannerPostRepository from '../../repositories/bannersRepository';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { bannerDeleted } from '../../../utils/kafkaTopics.json';

export default class DeleteBanner
  implements IUseCase<[string], ReturnValue<Banner | null>>
{
  constructor(
    private readonly repository: IBannerPostRepository,
    private readonly providers: {
      messageBoker: IMessageBroker;
    }
  ) {}

  async execute(...[id]: [string]): Promise<ReturnValue<Banner | null>> {
    const { messageBoker } = this.providers;

    const deletedBanner = await this.repository.deleteBanner({
      where: { id },
    });

    try {
      messageBoker.publish({
        topic: bannerDeleted,
        message: JSON.stringify(deletedBanner),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', deletedBanner);
  }
}

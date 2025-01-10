import { Banner } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import AppError from '../../../domain/valueObjects/error';
import { ResponseCodes } from '../../../domain/enums/responseCode';
import IMessageBroker from '../../providers/messageBroker';
import { bannerUpdated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import { IUpdateBannerDTO } from '../../../domain/dtos/banners';
import IBannerRepository from '../../repositories/bannersRepository';
import { validateUpdateBanner } from '../../../utils/joi/banner';

export default class UpddateBanner
  implements IUseCase<[string, IUpdateBannerDTO], ReturnValue<Banner | null>>
{
  constructor(
    private readonly repo: IBannerRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[id, data]: [string, IUpdateBannerDTO]
  ): Promise<ReturnValue<Banner | null>> {
    // Validate input
    await validateUpdateBanner(data);

    // Ensure there is at least a key for the filter
    if (!id) {
      return new ReturnValue<null>(
        false,
        'Please provide banner id',
        null,
        new AppError('Please provide banner id', ResponseCodes.BadRequest)
      );
    }

    // Ensure post exists
    const found = await this.repo.getBanner({
      where: { id },
    });

    if (!found || found.isDeleted) {
      return new ReturnValue<null>(
        false,
        'Banner not found! Probably deleted.',
        null,
        new AppError(
          'Banner not found! Probably deleted.',
          ResponseCodes.NotFound
        )
      );
    }

    // Update the post
    const updated = await this.repo.updateBanner({
      where: { id },
      data,
    });

    // Publish event
    try {
      this.providers.messageBroker.publish({
        topic: bannerUpdated,
        message: JSON.stringify(updated),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Faq updated successfully', updated);
  }
}

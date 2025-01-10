import { Banner } from '@prisma/client';
import IUseCase from '..';
import { ICreateBannerDTO } from '../../../domain/dtos/banners';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { validateCreateBanner } from '../../../utils/joi/banner';
import { bannerCreated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import IBannerPostRepository from '../../repositories/bannersRepository';

export default class CreateBannerUseCase
  implements IUseCase<[ICreateBannerDTO], ReturnValue<Banner>>
{
  constructor(
    private readonly repo: IBannerPostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) {}

  async execute(data: ICreateBannerDTO): Promise<ReturnValue<Banner>> {
    const { messageBroker } = this.providers;

    // Validate input
    await validateCreateBanner(data);

    // Create Banner
    const Banner = await this.repo.createBanner({
      data: {
        ...data,
      },
    });

    // Publish event
    try {
      messageBroker.publish({
        topic: bannerCreated,
        message: JSON.stringify(Banner),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', Banner);
  }
}

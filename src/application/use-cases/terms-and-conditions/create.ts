import { TermsOfService } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { conditionCreated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import slugify from '../../../utils/slugify';
import { ICreateTermsAndConditionsDTO } from '../../../domain/dtos/termsAndConditions';
import { validateCreateTermsAndConditions } from '../../../utils/joi/termsAndConditions';
import ITermsOfServicePostRepository from '../../repositories/termsOfService';

export default class CreateTermsOfServiceUseCase
  implements
    IUseCase<[ICreateTermsAndConditionsDTO], ReturnValue<TermsOfService>>
{
  constructor(
    private readonly repo: ITermsOfServicePostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[data]: [ICreateTermsAndConditionsDTO]
  ): Promise<ReturnValue<TermsOfService>> {
    const { messageBroker } = this.providers;

    // Validate input
    await validateCreateTermsAndConditions(data);

    // Create PrivacyPolicy
    const PrivacyPolicy = await this.repo.createTermsOfService({
      data: {
        ...data,
        slug: slugify(data.title),
      },
    });

    // Publish event
    try {
      messageBroker.publish({
        topic: conditionCreated,
        message: JSON.stringify(PrivacyPolicy),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', PrivacyPolicy);
  }
}

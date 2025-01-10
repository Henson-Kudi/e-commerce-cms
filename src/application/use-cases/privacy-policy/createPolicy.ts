import { PrivacyPolicy } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { policyCreated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { ICreatePolicyDTO } from '../../../domain/dtos/privacyPolicy';
import IPrivacyPolicyRepository from '../../repositories/privacyPolicy';
import { validateCreatePrivacyPolicy } from '../../../utils/joi/privacyPolicy';
import slugify from '../../../utils/slugify';

export default class CreatePolicyUseCase
  implements IUseCase<[ICreatePolicyDTO], ReturnValue<PrivacyPolicy>>
{
  constructor(
    private readonly repo: IPrivacyPolicyRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[data]: [ICreatePolicyDTO]
  ): Promise<ReturnValue<PrivacyPolicy>> {
    const { messageBroker } = this.providers;

    // Validate input
    await validateCreatePrivacyPolicy(data);

    // Create PrivacyPolicy
    const PrivacyPolicy = await this.repo.createPolicy({
      data: {
        ...data,
        slug: slugify(data.title),
      },
    });

    // Publish event
    try {
      messageBroker.publish({
        topic: policyCreated,
        message: JSON.stringify(PrivacyPolicy),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', PrivacyPolicy);
  }
}

import { PrivacyPolicy } from '@prisma/client';
import IUseCase from '..';
import { ResponseCodes } from '../../../domain/enums/responseCode';
import AppError from '../../../domain/valueObjects/error';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { policyUpdated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { IUpdatePolicyDTO } from '../../../domain/dtos/privacyPolicy';
import IPrivacyPolicyRepository from '../../repositories/privacyPolicy';
import { validateUpdatePrivacyPolicy } from '../../../utils/joi/privacyPolicy';

export default class UpddatePolicy
  implements
  IUseCase<
    [string, IUpdatePolicyDTO],
    ReturnValue<PrivacyPolicy | null>
  > {
  constructor(
    private readonly repo: IPrivacyPolicyRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[id, data]: [string, IUpdatePolicyDTO]
  ): Promise<ReturnValue<PrivacyPolicy | null>> {

    // Validate input
    await validateUpdatePrivacyPolicy(data);

    // Ensure there is at least a key for the filter
    if (!id) {
      return new ReturnValue<null>(
        false,
        'Please provide policy id',
        null,
        new AppError('Please provide policy id', ResponseCodes.BadRequest)
      );
    }

    // Ensure post exists
    const found = await this.repo.getPolicy({
      where: { id },
    });

    if (!found || found.isDeleted) {
      return new ReturnValue<null>(
        false,
        'Policy not found! Probably deleted.',
        null,
        new AppError('Policy not found! Probably deleted.', ResponseCodes.NotFound)
      );
    }

    // Update the post
    const updated = await this.repo.updatePolicy({
      where: { id },
      data,
    });

    // Publish event
    try {
      this.providers.messageBroker.publish({
        topic: policyUpdated,
        message: JSON.stringify(updated),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Policy updated successfully', updated);
  }
}

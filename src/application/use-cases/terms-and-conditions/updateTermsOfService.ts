import { TermsOfService } from '@prisma/client';
import IUseCase from '..';
import { ResponseCodes } from '../../../domain/enums/responseCode';
import AppError from '../../../domain/valueObjects/error';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { conditionUpdated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import { IUpdateTermsAndConditionsDTO } from '../../../domain/dtos/termsAndConditions';
import ITermsOfServicePostRepository from '../../repositories/termsOfService';
import { validateUpdateTermsAndConditions } from '../../../utils/joi/termsAndConditions';

export default class UpddateTermsOfService
  implements
    IUseCase<
      [string, IUpdateTermsAndConditionsDTO],
      ReturnValue<TermsOfService | null>
    >
{
  constructor(
    private readonly repo: ITermsOfServicePostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) {}

  async execute(
    ...[id, data]: [string, IUpdateTermsAndConditionsDTO]
  ): Promise<ReturnValue<TermsOfService | null>> {
    // Validate input
    await validateUpdateTermsAndConditions(data);

    // Ensure there is at least a key for the filter
    if (!id) {
      return new ReturnValue<null>(
        false,
        'Please provide condition id',
        null,
        new AppError('Please provide condition id', ResponseCodes.BadRequest)
      );
    }

    // Ensure post exists
    const found = await this.repo.getTermsOfService({
      where: { id },
    });

    if (!found || found.isDeleted) {
      return new ReturnValue<null>(
        false,
        'Condition not found! Probably deleted.',
        null,
        new AppError(
          'Condition not found! Probably deleted.',
          ResponseCodes.NotFound
        )
      );
    }

    // Update the post
    const updated = await this.repo.updateTermsOfService({
      where: { id },
      data,
    });

    // Publish event
    try {
      this.providers.messageBroker.publish({
        topic: conditionUpdated,
        message: JSON.stringify(updated),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(
      true,
      'Terms of service updated successfully',
      updated
    );
  }
}

import { Faq } from '@prisma/client';
import IUseCase from '..';
import { IUpdateFaqDTO } from '../../../domain/dtos/faqs';
import { ResponseCodes } from '../../../domain/enums/responseCode';
import AppError from '../../../domain/valueObjects/error';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { validateUpdateFaq } from '../../../utils/joi/faq';
import { faqUpdated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import IFaqPostRepository from '../../repositories/faqRepository';

export default class UpddateFaq
  implements
  IUseCase<
    [string, IUpdateFaqDTO],
    ReturnValue<Faq | null>
  > {
  constructor(
    private readonly repo: IFaqPostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) { }

  async execute(
    ...[id, data]: [string, IUpdateFaqDTO]
  ): Promise<ReturnValue<Faq | null>> {

    // Validate input
    await validateUpdateFaq(data);

    // Ensure there is at least a key for the filter
    if (!id) {
      return new ReturnValue<null>(
        false,
        'Please provide faq id',
        null,
        new AppError('Please provide faq id', ResponseCodes.BadRequest)
      );
    }

    // Ensure post exists
    const found = await this.repo.getFaq({
      where: { id },
    });

    if (!found || found.isDeleted) {
      return new ReturnValue<null>(
        false,
        'Faq not found! Probably deleted.',
        null,
        new AppError('Faq not found! Probably deleted.', ResponseCodes.NotFound)
      );
    }

    // Update the post
    const updated = await this.repo.updateFaq({
      where: { id },
      data,
    });

    // Publish event
    try {
      this.providers.messageBroker.publish({
        topic: faqUpdated,
        message: JSON.stringify(updated),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Faq updated successfully', updated);
  }
}

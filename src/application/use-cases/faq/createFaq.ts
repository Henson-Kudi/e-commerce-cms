import { Faq } from '@prisma/client';
import IUseCase from '..';
import { ICreateFaqDTO } from '../../../domain/dtos/faqs';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { validateCreateFaq } from '../../../utils/joi/faq';
import { faqCreated } from '../../../utils/kafkaTopics.json';
import logger from '../../../utils/logger';
import IMessageBroker from '../../providers/messageBroker';
import IFaqPostRepository from '../../repositories/faqRepository';

export default class CreateFaqUseCase
  implements IUseCase<[ICreateFaqDTO], ReturnValue<Faq>> {
  constructor(
    private readonly repo: IFaqPostRepository,
    private readonly providers: {
      messageBroker: IMessageBroker;
    }
  ) { }

  async execute(...[data]: [ICreateFaqDTO]): Promise<ReturnValue<Faq>> {

    const { messageBroker } = this.providers;

    // Validate input
    await validateCreateFaq(data);

    // Create Faq
    const Faq = await this.repo.createFaq({
      data
    });

    // Publish event
    try {
      messageBroker.publish({
        topic: faqCreated,
        message: JSON.stringify(Faq),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return new ReturnValue(true, 'Success', Faq);
  }
}

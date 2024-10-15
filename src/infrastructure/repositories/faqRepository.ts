import { Prisma, Faq } from '@prisma/client';
import IFaqPostRepository from '../../application/repositories/faqRepository';
import { DefaultArgs } from '@prisma/client/runtime/library';

export default class FaqRepositoory implements IFaqPostRepository {
  constructor(private readonly dataSource: Prisma.FaqDelegate<DefaultArgs>) {}

  createFaq(data: Prisma.FaqCreateArgs): Promise<Faq> {
    return this.dataSource.create(data);
  }
  getFaqs(query: Prisma.FaqFindManyArgs): Promise<Faq[]> {
    return this.dataSource.findMany(query);
  }
  getFaq(query: Prisma.FaqFindUniqueArgs): Promise<Faq | null> {
    return this.dataSource.findUnique(query);
  }
  updateFaq(query: Prisma.FaqUpdateArgs): Promise<Faq | null> {
    return this.dataSource.update(query);
  }
  updateManyFaqs(
    query: Prisma.FaqUpdateManyArgs
  ): Promise<Prisma.BatchPayload> {
    return this.dataSource.updateMany(query);
  }
  deleteFaq(query: Prisma.FaqDeleteArgs): Promise<Faq | null> {
    return this.dataSource.delete(query);
  }
  deleteFaqs(query: Prisma.FaqDeleteManyArgs): Promise<Prisma.BatchPayload> {
    return this.dataSource.deleteMany(query);
  }

  countFaqs(query: Prisma.FaqCountArgs): Promise<number> {
    return this.dataSource.count(query);
  }
}

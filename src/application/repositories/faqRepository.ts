import { Faq, Prisma } from '@prisma/client';
export default interface IFaqPostRepository {
  createFaq(data: Prisma.FaqCreateArgs): Promise<Faq>;
  getFaqs(query: Prisma.FaqFindManyArgs): Promise<Faq[]>;
  getFaq(query: Prisma.FaqFindUniqueArgs): Promise<Faq | null>;
  updateFaq(query: Prisma.FaqUpdateArgs): Promise<Faq | null>;
  updateManyFaqs(query: Prisma.FaqUpdateManyArgs): Promise<Prisma.BatchPayload>;
  deleteFaq(query: Prisma.FaqDeleteArgs): Promise<Faq | null>;
  deleteFaqs(query: Prisma.FaqDeleteManyArgs): Promise<Prisma.BatchPayload>;
  countFaqs(query: Prisma.FaqCountArgs): Promise<number>;
}

import { TermsOfService, Prisma } from '@prisma/client';
export default interface ITermsOfServicePostRepository {
  createTermsOfService(
    data: Prisma.TermsOfServiceCreateArgs
  ): Promise<TermsOfService>;
  getTermsOfServices(
    query: Prisma.TermsOfServiceFindManyArgs
  ): Promise<TermsOfService[]>;
  getTermsOfService(
    query: Prisma.TermsOfServiceFindUniqueArgs
  ): Promise<TermsOfService | null>;
  updateTermsOfService(
    query: Prisma.TermsOfServiceUpdateArgs
  ): Promise<TermsOfService | null>;
  updateManyTermsOfServices(
    query: Prisma.TermsOfServiceUpdateManyArgs
  ): Promise<Prisma.BatchPayload>;
  deleteTermsOfService(
    query: Prisma.TermsOfServiceDeleteArgs
  ): Promise<TermsOfService | null>;
  deleteTermsOfServices(
    query: Prisma.TermsOfServiceDeleteManyArgs
  ): Promise<Prisma.BatchPayload>;
  countTermsOfServices(query: Prisma.TermsOfServiceCountArgs): Promise<number>;
}

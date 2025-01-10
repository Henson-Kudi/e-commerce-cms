import { PrivacyPolicy, Prisma } from '@prisma/client';
export default interface IPrivacyPolicyRepository {
  createPolicy(data: Prisma.PrivacyPolicyCreateArgs): Promise<PrivacyPolicy>;
  getPolicies(
    query: Prisma.PrivacyPolicyFindManyArgs
  ): Promise<PrivacyPolicy[]>;
  getPolicy(
    query: Prisma.PrivacyPolicyFindUniqueArgs
  ): Promise<PrivacyPolicy | null>;
  updatePolicy(
    query: Prisma.PrivacyPolicyUpdateArgs
  ): Promise<PrivacyPolicy | null>;
  updateManyPolicies(
    query: Prisma.PrivacyPolicyUpdateManyArgs
  ): Promise<Prisma.BatchPayload>;
  deletePolicy(
    query: Prisma.PrivacyPolicyDeleteArgs
  ): Promise<PrivacyPolicy | null>;
  deletePolicies(
    query: Prisma.PrivacyPolicyDeleteManyArgs
  ): Promise<Prisma.BatchPayload>;
  countPolicies(query: Prisma.PrivacyPolicyCountArgs): Promise<number>;
}

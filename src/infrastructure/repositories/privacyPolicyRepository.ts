import { Prisma, PrivacyPolicy } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import IPrivacyPolicyRepository from "../../application/repositories/privacyPolicy";

export default class PrivacyPolicyRepository implements IPrivacyPolicyRepository {
    constructor(private readonly dataSource: Prisma.PrivacyPolicyDelegate<DefaultArgs>) { }

    createPolicy(data: Prisma.PrivacyPolicyCreateArgs): Promise<PrivacyPolicy> {
        return this.dataSource.create(data)
    }
    getPolicies(query: Prisma.PrivacyPolicyFindManyArgs): Promise<PrivacyPolicy[]> {
        return this.dataSource.findMany(query)
    }
    getPolicy(query: Prisma.PrivacyPolicyFindUniqueArgs): Promise<PrivacyPolicy | null> {
        return this.dataSource.findUnique(query)
    }
    updatePolicy(query: Prisma.PrivacyPolicyUpdateArgs): Promise<PrivacyPolicy | null> {
        return this.dataSource.update(query)
    }
    updateManyPolicies(query: Prisma.PrivacyPolicyUpdateManyArgs): Promise<Prisma.BatchPayload> {
        return this.dataSource.updateMany(query)
    }
    deletePolicy(query: Prisma.PrivacyPolicyDeleteArgs): Promise<PrivacyPolicy | null> {
        return this.dataSource.delete(query)
    }
    deletePolicies(query: Prisma.PrivacyPolicyDeleteManyArgs): Promise<Prisma.BatchPayload> {
        return this.dataSource.deleteMany(query)
    }
    countPolicies(query: Prisma.PrivacyPolicyCountArgs): Promise<number> {
        return this.dataSource.count(query)
    }



}
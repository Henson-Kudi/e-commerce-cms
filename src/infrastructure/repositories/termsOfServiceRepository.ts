import { Prisma, TermsOfService } from "@prisma/client";
import ITermsOfServicePostRepository from "../../application/repositories/termsOfService";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default class TermsOfServiceRepository implements ITermsOfServicePostRepository {
    constructor(private readonly dataSource: Prisma.TermsOfServiceDelegate<DefaultArgs>) { }

    createTermsOfService(data: Prisma.TermsOfServiceCreateArgs): Promise<TermsOfService> {
        return this.dataSource.create(data)
    }
    getTermsOfServices(query: Prisma.TermsOfServiceFindManyArgs): Promise<TermsOfService[]> {
        return this.dataSource.findMany(query)
    }
    getTermsOfService(query: Prisma.TermsOfServiceFindUniqueArgs): Promise<TermsOfService | null> {
        return this.dataSource.findUnique(query)
    }
    updateTermsOfService(query: Prisma.TermsOfServiceUpdateArgs): Promise<TermsOfService | null> {
        return this.dataSource.update(query)
    }
    updateManyTermsOfServices(query: Prisma.TermsOfServiceUpdateManyArgs): Promise<Prisma.BatchPayload> {
        return this.dataSource.updateMany(query)
    }
    deleteTermsOfService(query: Prisma.TermsOfServiceDeleteArgs): Promise<TermsOfService | null> {
        return this.dataSource.delete(query)
    }
    deleteTermsOfServices(query: Prisma.TermsOfServiceDeleteManyArgs): Promise<Prisma.BatchPayload> {
        return this.dataSource.deleteMany(query)
    }
    countTermsOfServices(query: Prisma.TermsOfServiceCountArgs): Promise<number> {
        return this.dataSource.count(query)
    }

}
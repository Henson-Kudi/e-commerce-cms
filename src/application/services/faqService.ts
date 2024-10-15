import { ICreateFaqDTO, IFindFaqDTO, IFindFaqOptions, IUpdateFaqDTO } from "../../domain/dtos/faqs"
import database from "../../infrastructure/database"
import messageBroker from "../../infrastructure/providers/messageBroker"
import FaqRepositoory from "../../infrastructure/repositories/faqRepository"
import CreateFaqUseCase from "../use-cases/faq/createFaq"
import DeleteFaq from "../use-cases/faq/deleteFaq"
import DeleteFaqs from "../use-cases/faq/deleteMany"
import FindFaq from "../use-cases/faq/findFaq"
import FindFaqs from "../use-cases/faq/findFaqs"
import SoftDeleteFaq from "../use-cases/faq/softDelete"
import SoftDeleteFaqs from "../use-cases/faq/softDeleteMany"
import UpddateFaq from "../use-cases/faq/updateFaq"


export default class FaqService {
    private readonly repo = new FaqRepositoory(database.faq)

    getFaqs(filter: IFindFaqDTO, options: IFindFaqOptions) {
        return new FindFaqs(this.repo).execute(filter, options)
    }

    getFaq(id: string) {
        return new FindFaq(this.repo).execute(id)
    }

    createFaq(data: ICreateFaqDTO) {
        return new CreateFaqUseCase(this.repo, { messageBroker: messageBroker }).execute(data)
    }

    updateFaq(id: string, data: IUpdateFaqDTO) {
        return new UpddateFaq(this.repo, { messageBroker: messageBroker }).execute(id, data)
    }

    deleteFaq(id: string, options?: { soft?: boolean }) {
        return options?.soft ? new SoftDeleteFaq(this.repo, { messageBoker: messageBroker }).execute(id) : new DeleteFaq(this.repo, { messageBoker: messageBroker }).execute(id)
    }

    deleteFaqs(ids: string[], options?: { soft?: boolean }) {
        return options?.soft ? new SoftDeleteFaqs(this.repo, { messageBoker: messageBroker }).execute(ids) : new DeleteFaqs(this.repo, { messageBoker: messageBroker }).execute(ids)
    }
}

export const faqService = new FaqService()
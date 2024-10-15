import { ICreateBannerDTO, IFindBannerDTO, IFindBannerOptions, IUpdateBannerDTO } from "../../domain/dtos/banners"
import database from "../../infrastructure/database"
import messageBroker from "../../infrastructure/providers/messageBroker"
import BannerRepository from "../../infrastructure/repositories/bannersRepository"
import CreateBannerUseCase from "../use-cases/banners/createBanner"
import DeleteBanner from "../use-cases/banners/deleteBanner"
import DeleteBanners from "../use-cases/banners/deleteMany"
import FindBanner from "../use-cases/banners/findBanner"
import FindBanners from "../use-cases/banners/findBanners"
import SoftDeleteBanner from "../use-cases/banners/softDelete"
import SoftDeleteBanners from "../use-cases/banners/softDeleteMany"
import UpddateBanner from "../use-cases/banners/updateBanner"

export default class BannersService {
    private readonly repo = new BannerRepository(database.banner)

    getBanners(filter: IFindBannerDTO, options: IFindBannerOptions) {
        return new FindBanners(this.repo).execute(filter, options)
    }

    getBanner(id: string) {
        return new FindBanner(this.repo).execute(id)
    }

    createBanner(data: ICreateBannerDTO) {
        return new CreateBannerUseCase(this.repo, { messageBroker: messageBroker }).execute(data)
    }

    updateBanner(id: string, data: IUpdateBannerDTO) {
        return new UpddateBanner(this.repo, { messageBroker: messageBroker }).execute(id, data)
    }

    deleteBanner(id: string, options?: { soft?: boolean }) {
        return options?.soft ? new SoftDeleteBanner(this.repo, { messageBoker: messageBroker }).execute(id) : new DeleteBanner(this.repo, { messageBoker: messageBroker }).execute(id)
    }

    deleteBanners(ids: string[], options?: { soft?: boolean }) {
        return options?.soft ? new SoftDeleteBanners(this.repo, { messageBoker: messageBroker }).execute(ids) : new DeleteBanners(this.repo, { messageBoker: messageBroker }).execute(ids)
    }
}

export const bannersService = new BannersService()
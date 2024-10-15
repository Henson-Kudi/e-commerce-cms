import { Prisma, Banner } from '@prisma/client';
import IBannerPostRepository from '../../application/repositories/bannersRepository';
import { DefaultArgs } from '@prisma/client/runtime/library';

export default class BannerRepository implements IBannerPostRepository {
  constructor(
    private readonly dataSource: Prisma.BannerDelegate<DefaultArgs>
  ) {}

  createBanner(data: Prisma.BannerCreateArgs): Promise<Banner> {
    return this.dataSource.create(data);
  }
  getBanners(query: Prisma.BannerFindManyArgs): Promise<Banner[]> {
    return this.dataSource.findMany(query);
  }
  getBanner(query: Prisma.BannerFindUniqueArgs): Promise<Banner | null> {
    return this.dataSource.findUnique(query);
  }
  updateBanner(query: Prisma.BannerUpdateArgs): Promise<Banner | null> {
    return this.dataSource.update(query);
  }
  updateManyBanners(
    query: Prisma.BannerUpdateManyArgs
  ): Promise<Prisma.BatchPayload> {
    return this.dataSource.updateMany(query);
  }
  deleteBanner(query: Prisma.BannerDeleteArgs): Promise<Banner | null> {
    return this.dataSource.delete(query);
  }
  deleteBanners(
    query: Prisma.BannerDeleteManyArgs
  ): Promise<Prisma.BatchPayload> {
    return this.dataSource.deleteMany(query);
  }
  countBanners(query: Prisma.BannerCountArgs): Promise<number> {
    return this.dataSource.count(query);
  }
}

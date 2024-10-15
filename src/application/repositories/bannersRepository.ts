import { Banner, Prisma } from '@prisma/client';
export default interface IBannerRepository {
  createBanner(data: Prisma.BannerCreateArgs): Promise<Banner>;
  getBanners(query: Prisma.BannerFindManyArgs): Promise<Banner[]>;
  getBanner(query: Prisma.BannerFindUniqueArgs): Promise<Banner | null>;
  updateBanner(query: Prisma.BannerUpdateArgs): Promise<Banner | null>;
  updateManyBanners(
    query: Prisma.BannerUpdateManyArgs
  ): Promise<Prisma.BatchPayload>;
  deleteBanner(query: Prisma.BannerDeleteArgs): Promise<Banner | null>;
  deleteBanners(
    query: Prisma.BannerDeleteManyArgs
  ): Promise<Prisma.BatchPayload>;
  countBanners(query: Prisma.BannerCountArgs): Promise<number>;
}

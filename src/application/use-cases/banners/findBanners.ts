import { Banner } from '@prisma/client';
import IUseCase from '..';
import { ReturnValueWithPagination } from '../../../domain/valueObjects/returnValue';
import { setupFindManyBannersQuery } from '../helpers/banners';
import { setupPagination } from '../helpers';
import { IFindBannerDTO, IFindBannerOptions } from '../../../domain/dtos/banners';
import IBannerRepository from '../../repositories/bannersRepository';

export default class FindBanners
  implements
  IUseCase<
    [IFindBannerDTO, IFindBannerOptions],
    ReturnValueWithPagination<Banner[]>
  > {
  constructor(private readonly repository: IBannerRepository) { }

  async execute(
    ...[query, options]: [IFindBannerDTO, IFindBannerOptions]
  ): Promise<ReturnValueWithPagination<Banner[]>> {

    const Query = setupFindManyBannersQuery(query);
    const pagination = setupPagination(options);

    const count = await this.repository.countBanners({ where: Query });

    const foundBanners = await this.repository.getBanners({
      where: Query,
      take: pagination.limit,
      skip: pagination.skip,
    });

    return new ReturnValueWithPagination(true, 'Success', {
      data: foundBanners,
      total: count,
      ...pagination,
    });
  }
}

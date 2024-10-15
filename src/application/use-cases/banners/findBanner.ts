import { Banner } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import IBannerPostRepository from '../../repositories/bannersRepository';

export default class FindBanner
  implements IUseCase<[string], ReturnValue<Banner | null>> {
  constructor(private readonly repository: IBannerPostRepository) { }

  async execute(
    ...[id]: [string]
  ): Promise<ReturnValue<Banner | null>> {

    const Banner = await this.repository.getBanner({
      where: { id },
    });

    return new ReturnValue(true, 'Success', Banner);
  }
}

import { BlogPost } from '@prisma/client';
import IUseCase from '..';
import { ReturnValueWithPagination } from '../../../domain/valueObjects/returnValue';
import { IFindBlogDTO, IFindBlogOptions } from '../../../domain/dtos/blogs';
import { setupFindManyBlogsQuery } from '../helpers/blogs';
import { setupPagination } from '../helpers';
import IBlogPostRepository from '../../repositories/blogsRepository';

export default class FindBlogs
  implements
  IUseCase<
    [IFindBlogDTO, IFindBlogOptions],
    ReturnValueWithPagination<BlogPost[]>
  > {
  constructor(private readonly repository: IBlogPostRepository) { }

  async execute(
    ...[query, options]: [IFindBlogDTO, IFindBlogOptions]
  ): Promise<ReturnValueWithPagination<BlogPost[]>> {

    const Query = setupFindManyBlogsQuery(query);
    const pagination = setupPagination(options);

    const count = await this.repository.countPosts({ where: Query });

    const foundBlogs = await this.repository.getPosts({
      where: Query,
      take: pagination.limit,
      skip: pagination.skip,
    });

    return new ReturnValueWithPagination(true, 'Success', {
      data: foundBlogs,
      total: count,
      ...pagination,
    });
  }
}

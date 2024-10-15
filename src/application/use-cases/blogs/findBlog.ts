import { BlogPost } from '@prisma/client';
import IUseCase from '..';
import { ReturnValue } from '../../../domain/valueObjects/returnValue';
import { IFindUniqueBlogDTO } from '../../../domain/dtos/blogs';
import { setupUniqueBlogQuery } from '../helpers/blogs';
import IBlogPostRepository from '../../repositories/blogsRepository';

export default class FindBlog
  implements IUseCase<[IFindUniqueBlogDTO], ReturnValue<BlogPost | null>>
{
  constructor(private readonly repository: IBlogPostRepository) {}

  async execute(
    ...[query]: [IFindUniqueBlogDTO]
  ): Promise<ReturnValue<BlogPost | null>> {
    const Query = setupUniqueBlogQuery(query);

    const blog = await this.repository.getPost({
      where: Query,
    });

    return new ReturnValue(true, 'Success', blog);
  }
}

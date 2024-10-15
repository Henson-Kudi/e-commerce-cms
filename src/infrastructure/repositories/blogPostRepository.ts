import { Prisma, BlogPost } from '@prisma/client';
import IBlogPostRepository from '../../application/repositories/blogsRepository';
import { DefaultArgs } from '@prisma/client/runtime/library';

export default class BlogPostRepository implements IBlogPostRepository {
  constructor(
    private readonly dataSource: Prisma.BlogPostDelegate<DefaultArgs>
  ) {}
  countPosts(query: Prisma.BlogPostCountArgs): Promise<number> {
    return this.dataSource.count(query);
  }
  createPost(data: Prisma.BlogPostCreateArgs): Promise<BlogPost> {
    return this.dataSource.create(data);
  }
  getPosts(query: Prisma.BlogPostFindManyArgs): Promise<BlogPost[]> {
    return this.dataSource.findMany(query);
  }
  getPost(query: Prisma.BlogPostFindUniqueArgs): Promise<BlogPost | null> {
    return this.dataSource.findUnique(query);
  }
  updatePost(query: Prisma.BlogPostUpdateArgs): Promise<BlogPost | null> {
    return this.dataSource.update(query);
  }
  updateManyPosts(
    query: Prisma.BlogPostUpdateManyArgs
  ): Promise<Prisma.BatchPayload> {
    return this.dataSource.updateMany(query);
  }
  deletePost(query: Prisma.BlogPostDeleteArgs): Promise<BlogPost | null> {
    return this.dataSource.delete(query);
  }
  deletePosts(
    query: Prisma.BlogPostDeleteManyArgs
  ): Promise<Prisma.BatchPayload> {
    return this.dataSource.deleteMany(query);
  }
}

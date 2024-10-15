import { BlogPost, Prisma } from '@prisma/client';
export default interface IBlogPostRepository {
  createPost(data: Prisma.BlogPostCreateArgs): Promise<BlogPost>;
  getPosts(query: Prisma.BlogPostFindManyArgs): Promise<BlogPost[]>;
  getPost(query: Prisma.BlogPostFindUniqueArgs): Promise<BlogPost | null>;
  updatePost(query: Prisma.BlogPostUpdateArgs): Promise<BlogPost | null>;
  updateManyPosts(
    query: Prisma.BlogPostUpdateManyArgs
  ): Promise<Prisma.BatchPayload>;
  deletePost(query: Prisma.BlogPostDeleteArgs): Promise<BlogPost | null>;
  deletePosts(
    query: Prisma.BlogPostDeleteManyArgs
  ): Promise<Prisma.BatchPayload>;
  countPosts(query: Prisma.BlogPostCountArgs): Promise<number>;
}

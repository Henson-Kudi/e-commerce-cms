import { ICreateBlogDTO, IFindBlogDTO, IFindBlogOptions, IFindUniqueBlogDTO, IUpdateBlogDTO } from "../../domain/dtos/blogs"
import database from "../../infrastructure/database"
import messageBroker from "../../infrastructure/providers/messageBroker"
import BlogPostRepository from "../../infrastructure/repositories/blogPostRepository"
import CreateBlogUseCase from "../use-cases/blogs/createBlog"
import DeleteBlog from "../use-cases/blogs/deleteBlog"
import DeleteBlogs from "../use-cases/blogs/deleteMany"
import FindBlog from "../use-cases/blogs/findBlog"
import FindBlogs from "../use-cases/blogs/findBlogs"
import SoftDeleteBlog from "../use-cases/blogs/softDelete"
import SoftDeleteBlogs from "../use-cases/blogs/softDeleteMany"
import UpddateBlog from "../use-cases/blogs/updateBlog"
import UpddateBlogs from "../use-cases/blogs/updateManyBlogs"

export default class BlogPostService {
    private readonly blogsRepo = new BlogPostRepository(database.blogPost)

    getPosts(filter: IFindBlogDTO, options: IFindBlogOptions) {
        return new FindBlogs(this.blogsRepo).execute(filter, options)
    }

    getPost(query: IFindUniqueBlogDTO) {
        return new FindBlog(this.blogsRepo).execute(query)
    }

    createPost(data: ICreateBlogDTO) {
        return new CreateBlogUseCase(this.blogsRepo, { messageBroker: messageBroker }).execute(data)
    }

    updatePost(query: IFindUniqueBlogDTO, data: IUpdateBlogDTO) {
        return new UpddateBlog(this.blogsRepo, { messageBroker: messageBroker }).execute(query, data)
    }

    updateManyPosts(query: IFindBlogDTO, data: IUpdateBlogDTO) {
        return new UpddateBlogs(this.blogsRepo, { messageBroker: messageBroker }).execute(query, data)
    }

    deletePost(query: IFindUniqueBlogDTO, options?: { soft?: boolean }) {
        return options?.soft ? new SoftDeleteBlog(this.blogsRepo, { messageBoker: messageBroker }).execute(query) : new DeleteBlog(this.blogsRepo, { messageBoker: messageBroker }).execute(query)
    }

    deletePosts(query: IFindBlogDTO, options?: { soft?: boolean }) {
        return options?.soft ? new SoftDeleteBlogs(this.blogsRepo, { messageBoker: messageBroker }).execute(query) : new DeleteBlogs(this.blogsRepo, { messageBoker: messageBroker }).execute(query)
    }
}

export const blogPostService = new BlogPostService()
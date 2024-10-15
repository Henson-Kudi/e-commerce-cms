import { BlogPost } from "@prisma/client";
import BlogPostService, { blogPostService } from "../../../../application/services/blogService";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValue } from "../../../../domain/valueObjects/returnValue";
import { validateUpdateBlog } from "../../../../utils/joi/blog";

export default class UpdateBlogController implements IContoller<ReturnValue<BlogPost | null>> {
    constructor(private readonly blogsService: BlogPostService) { }

    async handle(request: RequestObject): Promise<ReturnValue<BlogPost | null>> {
        await validateUpdateBlog({
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        const result = await this.blogsService.updatePost({
            id: request.params.id
        }, {
            ...(request.body || {}),
            lastModifiedBy: request.headers?.userId,
        });

        return result
    }




}

export const updateBlogController = new UpdateBlogController(blogPostService)
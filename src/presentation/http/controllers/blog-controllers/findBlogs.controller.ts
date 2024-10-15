import { BlogPost } from "@prisma/client";
import BlogPostService, { blogPostService } from "../../../../application/services/blogService";
import IContoller from "../Icontroller";
import RequestObject from "../../../../utils/types/requestObject";
import { ReturnValueWithPagination } from "../../../../domain/valueObjects/returnValue";

export default class FindBlogsController implements IContoller<ReturnValueWithPagination<BlogPost[]>> {
    constructor(private readonly blogsService: BlogPostService) { }

    handle(request: RequestObject): Promise<ReturnValueWithPagination<BlogPost[]>> {
        const page = request.query?.page ? Number(request.query.page) : 1;
        const limit = request.query?.limit ? Number(request.query.limit) : 10;

        return this.blogsService.getPosts({
            ...(request.query || {})
        }, {
            limit: !isNaN(limit) && limit > 0 ? limit : 10,
            page: !isNaN(page) && page > 0 ? page : 1,

        });
    }




}

export const findBlogsController = new FindBlogsController(blogPostService)
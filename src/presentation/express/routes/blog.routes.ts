import { Router } from "express";
import routesHandler from "./routesHandler";
import { createBlogController } from "../../http/controllers/blog-controllers/createBlog.controller";
import { findBlogsController } from "../../http/controllers/blog-controllers/findBlogs.controller";
import { updateBlogController } from "../../http/controllers/blog-controllers/updateBlog.controller";
import { deleteBlogController } from "../../http/controllers/blog-controllers/deleteBlog.controller";
import { findBlogController } from "../../http/controllers/blog-controllers/findBlog.controller";
import { updateBlogsController } from "../../http/controllers/blog-controllers/updateManyBlogs.controller";
import { deleteBlogsController } from "../../http/controllers/blog-controllers/deleteBlogs.controller";
import authenticateRequest from "../middlewares/authenticate";

const router = Router()

router.route('/').post(authenticateRequest, routesHandler(createBlogController)).get(routesHandler(findBlogsController))

router.route('/bulk').put(authenticateRequest, routesHandler(updateBlogsController)).delete(authenticateRequest, routesHandler(deleteBlogsController))

router.route('/:id').put(authenticateRequest, routesHandler(updateBlogController)).delete(authenticateRequest, routesHandler(deleteBlogController)).get(routesHandler(findBlogController))

export default router
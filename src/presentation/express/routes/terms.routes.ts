import { Router } from "express";
import routesHandler from "./routesHandler";
import { createTermsOfServiceController } from "../../http/controllers/terms-of-service-controllers/createPolicy.controller";
import { findTermsController } from "../../http/controllers/terms-of-service-controllers/findTerms.controller";
import { findManyTermsController } from "../../http/controllers/terms-of-service-controllers/findManyTerms.controller";
import { deleteManyTermsController } from "../../http/controllers/terms-of-service-controllers/deleteManyTerms.controller";
import { updateTermsController } from "../../http/controllers/terms-of-service-controllers/updateTerms.controller";
import { deleteTermsController } from "../../http/controllers/terms-of-service-controllers/deleteTerms.controller";
import authenticateRequest from "../middlewares/authenticate";

const router = Router()

router.route('/').post(authenticateRequest, routesHandler(createTermsOfServiceController)).get(routesHandler(findManyTermsController))

router.route('/bulk').delete(authenticateRequest, routesHandler(deleteManyTermsController))

router.route('/:id').put(authenticateRequest, routesHandler(updateTermsController)).delete(authenticateRequest, routesHandler(deleteTermsController)).get(routesHandler(findTermsController))

export default router
import { Router } from "express";
import routesHandler from "./routesHandler";
import { createPolicyController } from "../../http/controllers/policy-controllers/createPolicy.controller";
import { findPoliciesController } from "../../http/controllers/policy-controllers/findPolicies.controller";
import { deletePoliciesController } from "../../http/controllers/policy-controllers/deletePolicies.controller";
import { updatePolicyController } from "../../http/controllers/policy-controllers/updatePolicy.controller";
import { findPolicyController } from "../../http/controllers/policy-controllers/findPolicy.controller";
import { deletePolicyController } from "../../http/controllers/policy-controllers/deletePolicy.controller";
import authenticateRequest from "../middlewares/authenticate";

const router = Router()

router.route('/').post(authenticateRequest, routesHandler(createPolicyController)).get(routesHandler(findPoliciesController))

router.route('/bulk').delete(authenticateRequest, routesHandler(deletePoliciesController))

router.route('/:id').put(authenticateRequest, routesHandler(updatePolicyController)).delete(authenticateRequest, routesHandler(deletePolicyController)).get(routesHandler(findPolicyController))

export default router
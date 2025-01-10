import { Router } from 'express';
import routesHandler from './routesHandler';
import { createFaqController } from '../../http/controllers/faq-controllers/createFaq.controller';
import { findFaqsController } from '../../http/controllers/faq-controllers/findFaqs.controller';
import { deleteFaqsController } from '../../http/controllers/faq-controllers/deleteFaqs.controller';
import { updateFaqController } from '../../http/controllers/faq-controllers/updateFaq.controller';
import { findFaqController } from '../../http/controllers/faq-controllers/findFaq.controller';
import { deleteFaqController } from '../../http/controllers/faq-controllers/deleteFaq.controller';
import authenticateRequest from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .post(authenticateRequest, routesHandler(createFaqController))
  .get(routesHandler(findFaqsController));

router
  .route('/bulk')
  .delete(authenticateRequest, routesHandler(deleteFaqsController));

router
  .route('/:id')
  .put(authenticateRequest, routesHandler(updateFaqController))
  .delete(authenticateRequest, routesHandler(deleteFaqController))
  .get(routesHandler(findFaqController));

export default router;

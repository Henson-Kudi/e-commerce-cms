import { Router } from 'express';
import routesHandler from './routesHandler';
import { createBannerController } from '../../http/controllers/banner-controllers/createBanner.controller';
import { findBannersController } from '../../http/controllers/banner-controllers/findBanners.controller';
import { deleteBannersController } from '../../http/controllers/banner-controllers/deleteBanners.controller';
import { updateBannerController } from '../../http/controllers/banner-controllers/updateBanner.controller';
import { findBannerController } from '../../http/controllers/banner-controllers/findBanner.controller';
import { deleteBannerController } from '../../http/controllers/banner-controllers/deleteBanner.controller';
import authenticateRequest from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .post(authenticateRequest, routesHandler(createBannerController))
  .get(routesHandler(findBannersController));

router
  .route('/bulk')
  .delete(authenticateRequest, routesHandler(deleteBannersController));

router
  .route('/:id')
  .put(authenticateRequest, routesHandler(updateBannerController))
  .delete(authenticateRequest, routesHandler(deleteBannerController))
  .get(routesHandler(findBannerController));

export default router;

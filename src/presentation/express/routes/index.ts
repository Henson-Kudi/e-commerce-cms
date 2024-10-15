// You can modify this file the way you like but make sure to export the router as default so that it initialised in index.ts
import { Router } from 'express';
import blogRoutes from './blog.routes';
import bannerRoutes from './banner.routes';
import faqRoutes from './faq.routes';
import policyRoutes from './policy.routes';
import termsRoutes from './terms.routes';
import authenticateRequest from '../middlewares/authenticate';

const router = Router();

// Define your routes here
router.use('/blogs', blogRoutes)
router.use('/banners', bannerRoutes)
router.use('/faq', faqRoutes)
router.use('/privacy-policy', policyRoutes)
router.use('/terms-and-conditions', termsRoutes)

export default router;

import { Router } from 'express';

import authRoutes from './authRoutes';

const router = Router();

// Auth Routes
router.use('/auth', authRoutes);

export default router;

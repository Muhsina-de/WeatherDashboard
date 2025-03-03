import { Router } from 'express';
import apiRoutes from './api';
import htmlRoutes from './htmlRoutes';

const router = Router();

// API routes
router.use('/api', apiRoutes);

// HTML routes should come last
router.use('/', htmlRoutes);

export default router; 
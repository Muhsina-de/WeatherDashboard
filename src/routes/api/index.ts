import { Router } from 'express';
import weatherRoutes from './weatherRoutes';

const router = Router();
router.use('/weather', weatherRoutes);

export default router; 
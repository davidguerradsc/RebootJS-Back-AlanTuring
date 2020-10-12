import { Router } from 'express';
import usersRoutes from './usersRoutes';
import loginRoutes from './loginRoutes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/login', loginRoutes);

export default router;

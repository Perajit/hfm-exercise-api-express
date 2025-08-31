import express from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { profileQuery, register } from './user.controller';

const router = express.Router();

router.post('/register', register);
router.get('/profile', authMiddleware, profileQuery);

export default router;

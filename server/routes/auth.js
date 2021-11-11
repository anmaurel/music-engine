import express from 'express';

import authController from '../controllers/auth.js';

const router = express.Router();

router.get('/login', authController.login);
router.get('/callback', authController.callback);
router.get('/refresh-token', authController.refreshToken);

export default router;
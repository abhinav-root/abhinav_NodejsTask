import express from 'express';
import patientsRouter from './patients.route.js';
import psychiatristsRouter from './psychiatrists.route.js';
import authRouter from './auth.route.js';
import auth from '../middlewares/authenticate.js';

const router = express.Router();

router.use('/patients', auth, patientsRouter);

router.use('/psychiatrists', auth, psychiatristsRouter);

router.use('/token', authRouter);

export default router;

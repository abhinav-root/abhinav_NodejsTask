import express from 'express';
import patientsRouter from './patients.route.js';
import psychiatristsRouter from './psychiatrists.route.js';
import authRouter from './auth.route.js';

const router = express.Router();

router.use('/patients', patientsRouter);

router.use('/psychiatrists', psychiatristsRouter);

router.use('/token', authRouter);

export default router;

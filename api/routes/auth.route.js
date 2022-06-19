import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { apiResponse, JWT_SECRET } from '../utils/common.js';

const router = express.Router();

router.post('/', body('email').isEmail(), async (req, res) => {
    const { email } = req.body;
    const token = sign(email, JWT_SECRET);
    return apiResponse(
        res,
        201,
        true,
        'Token created successfully',
        { token },
        null
    );
});

export default router;

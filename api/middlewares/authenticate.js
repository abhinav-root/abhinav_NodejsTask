import { apiResponse, JWT_SECRET } from '../utils/common.js';
import jwt from 'jsonwebtoken';
const { verify } = jwt;

function auth(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const bearerToken = bearerHeader?.split(' ')[1];
    if (!bearerToken) {
        return apiResponse(
            res,
            403,
            false,
            'Bearer token missing',
            null,
            'Please provide a Beared Token in Header'
        );
    }
    verify(bearerToken, JWT_SECRET, (err, data) => {
        if (err) {
            return apiResponse(
                res,
                401,
                false,
                'Unauthorized',
                null,
                'You are unauthorized to perform this action'
            );
        }
    });
    next();
}

export default auth;

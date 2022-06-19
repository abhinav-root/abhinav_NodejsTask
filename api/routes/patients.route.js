import express from 'express';

import { body, param } from 'express-validator';

import { isValidPhone } from '../utils/common.js';
import {
    deletePatiendById,
    getPatientById,
    registerPatient,
} from '../controllers/patient.controller.js';
import { upload } from '../utils/helpers.js';

const router = express.Router();

// Get patient by Id
router.get(
    '/:id',
    param('id').trim().escape().notEmpty().isNumeric(),
    getPatientById
);

// Create patient
router.post(
    '/',
    upload.single('photo'),
    body('name')
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    body('address')
        .trim()
        .escape()
        .isLength({ min: 10 })
        .withMessage('address should be at least 10 characters)'),
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('invalid email address'),
    body('phone').trim().escape().custom(isValidPhone),
    body('password').trim().custom(isValidPassword),
    registerPatient
);

router.delete('/:id', param('id').notEmpty(), deletePatiendById);

export default router;

function isPasswordTooShort(password) {
    return password.length < 8;
}

function isPasswordTooLong(password) {
    return password.length >= 15;
}

function isValidPassword(password) {
    if (isPasswordTooShort(password)) {
        throw new Error('password must be atleast 8 characters');
    }
    if (isPasswordTooLong(password)) {
        throw new Error('password must be cannot exceed 15 characters');
    }
    const regExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/);
    if (!regExp.test(password)) {
        throw new Error(
            'Password must contain one uppercase, one lowercase and a number'
        );
    }
    return true;
}

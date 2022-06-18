import express from 'express';
import expressValidator from 'express-validator';
import {
    deletePsychiatristByid,
    getAllPatientsForPsychiatrist,
    getPatientsCountForEachPsychiatrist,
    registerPsychiatrist,
} from '../controllers/psychiatrist.controller.js';
import auth from '../middlewares/authenticate.js';
const { param, body, validationResult } = expressValidator;
import { hospitals, isValidPhone } from '../utils/common.js';

const router = express.Router();

router.get('/', auth, getPatientsCountForEachPsychiatrist);

router.post(
    '/',
    body('firstName')
        .toLowerCase()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('firstName cannot be empty')
        .isLength({ max: 20 })
        .withMessage('firstName cannot exceed 20 characters'),
    body('lastName')
        .toLowerCase()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('lastName cannot be empty')
        .isLength({ max: 20 })
        .withMessage('lastName cannot exceed 20 characters'),
    body('hospital')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('hospital name cannot be empty')
        .isIn(hospitals)
        .withMessage(
            `hospital must be one of the following ${JSON.stringify({
                hospitals,
            })}`
        ),
    body('pincode')
        .trim()
        .escape()
        .isLength({ max: 6, min: 6 })
        .withMessage('pincode must be exactly 6 digits')
        .optional({ checkFalsy: true, nullable: true }),
    body('state')
        .toLowerCase()
        .trim()
        .escape()
        .isLength({ max: 20 })
        .withMessage('state name too long')
        .optional({ checkFalsy: true, nullable: true }),
    body('phone')
        .trim()
        .escape()
        .custom(isValidPhone)
        .optional({ checkFalsy: true, nullable: true }),
    registerPsychiatrist
);

router.get('/:psychiatristId/patients', getAllPatientsForPsychiatrist);

router.delete(
    '/:psychiatristId',
    param('psychiatristId')
        .notEmpty()
        .withMessage('id cannot be empty')
        .isNumeric()
        .withMessage('psychiatristId must be a number'),
    deletePsychiatristByid
);

export default router;

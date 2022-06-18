import bcrypt from 'bcrypt';
import { Psychiatrist } from '../models/psychiatrist.model.js';
import { apiResponse, InternalServerError } from '../utils/common.js';
import { Patient } from '../models/patient.model.js';
import { validationResult } from 'express-validator';

export async function getPatientById(req, res) {
    const { id } = req.params;
    try {
        const patient = await getPatiendById(id);
        if (!patient) {
            return apiResponse(
                res,
                404,
                false,
                'Patient not found',
                null,
                'Invalid patient id'
            );
        }
        return apiResponse(res, 200, true, 'Patient found', patient, null);
    } catch (e) {
        return InternalServerError(res, 'Something went wrong');
    }
}

export async function registerPatient(req, res) {
    const { name, address, email, phone, password, psychiatristId } = req.body;
    const file = req.file;
    const errors = validationResult(req);
    if (!isValidData(errors)) {
        return apiResponse(
            res,
            400,
            false,
            'Could not register patient',
            null,
            errors
        );
    }
    const patientExist = await patientExistWithEmail(email);
    if (patientExist) {
        return apiResponse(
            res,
            409,
            false,
            'Could not register patient',
            null,
            'Patient exists with this email'
        );
    }
    try {
        const psychiatrist = await Psychiatrist.findByPk(psychiatristId);
        if (!psychiatrist) {
            return apiResponse(
                res,
                400,
                false,
                'Could not register patient',
                null,
                'Psychiatrist with given id not found'
            );
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const patient = await Patient.create({
            fullName: name,
            address,
            email,
            phone,
            password: hashedPassword,
            PsychiatristId: psychiatristId,
            profilePicturePath: getFileName(req, file),
        });
        return apiResponse(
            res,
            201,
            true,
            'Patient registered successfully',
            {
                id: patient.dataValues.id,
                createdAt: patient.dataValues.createdAt,
            },
            null
        );
    } catch (e) {
        console.log(e);
        return InternalServerError(res, 'Could not register patient');
    }
}

// Delete patient by Id
export async function deletePatiendById(req, res) {
    const { id } = req.params;
    try {
        const patient = await Patient.destroy({ where: { id: id } });
        console.log(patient);
        if (!patient) {
            return apiResponse(
                res,
                404,
                false,
                'Patient not found',
                null,
                'Invalid patient id'
            );
        }
        return apiResponse(
            res,
            200,
            true,
            'Patient deleted successfully',
            null,
            null
        );
    } catch (e) {
        return InternalServerError(res, 'Could not delete');
    }
}

async function patientExistWithEmail(email) {
    const patient = await Patient.findOne({
        where: { email },
    });
    console.log(patient);
    return patient;
}

const getPatiendById = async (patientId) => {
    const patient = await Patient.findByPk(patientId, {
        attributes: ['fullName', 'email', 'address', 'phone'],
    });
    return patient;
};

import { sequelize } from '../../db/config.js';
import { Hospital } from '../models/hospital.model.js';
import { Patient } from '../models/patient.model.js';
import { Psychiatrist } from '../models/psychiatrist.model.js';
import { apiResponse, InternalServerError } from '../utils/common.js';

// Get count of patients registered for each psychiatrist
export async function getPatientsCountForEachPsychiatrist(req, res) {
    try {
        const [results, metadata] = await sequelize.query(
            'SELECT p.first_name, p.last_name, h.name AS hospital_name, COUNT(*) AS patients_count FROM  Psychiatrist p INNER JOIN Patient p2 ON p.id = p2.psychiatrist_id INNER JOIN Hospital h ON p.hospital_id = h.id GROUP BY 1,2,3'
        );
        return apiResponse(res, 200, true, 'Data found', results, null);
    } catch (e) {
        console.log(e);
        return InternalServerError(res, 'Could not find data');
    }
}

// Get all patients of single psychiatrist
export async function getAllPatientsPsychiatrist(req, res) {
    const pyschId = req.params.psychiatristId;
    try {
        const result = await Psychiatrist.findByPk(pyschId, {
            attributes: [],
            include: [{ model: Patient, attributes: ['id', 'fullName'] }],
        });
        if (!result) {
            return apiResponse(
                res,
                403,
                false,
                'No patients found with given PsychiatristId',
                null,
                'Invalid PsychiatristId'
            );
        }
        const response = {
            patients: result.Patients,
        };
        return apiResponse(res, 200, true, 'Data found', response, null);
    } catch (e) {
        console.log(e);
        return InternalServerError(res, 'Could not find data');
    }
}

// Register psychiatrist
export async function registerPsychiatrist(req, res) {
    const { firstName, lastName, hospital, phone, pincode, state } = req.body;
    const errors = validationResult(req);
    if (!isValidData(errors)) {
        return apiResponse(res, 400, false, 'Invalid data', null, errors);
    }

    try {
        const isHospitalPresent = await Hospital.findOne({
            name: hospital,
        });
        if (!isHospitalPresent) {
            return apiResponse(
                res,
                400,
                false,
                'Could not create psychiatrist',
                null,
                'Hospital with given name not found'
            );
        }

        const psychiatrist = await Psychiatrist.create({
            firstName,
            lastName,
            phone,
            pincode,
            state,
            hospital_id: isHospitalPresent.dataValues.id,
        });

        return apiResponse(
            res,
            201,
            true,
            'psychiatrist registered successfully',
            {
                psychiatristId: psychiatrist.id,
                createdAt: psychiatrist.createdAt,
            }
        );
    } catch (e) {
        console.log(e);
        return InternalServerError(res);
    }
}

// Delete Psychiatrist by Id
export async function deletePsychiatristByid(req, res) {
    const { psychiatristId } = req.params;
    try {
        const isDeleted = Psychiatrist.destroy({
            where: { id: psychiatristId },
        });
        if (isDeleted) {
            return apiResponse(
                res,
                404,
                false,
                'Psychiatrist not found',
                null,
                'Invalid psychiatrist id'
            );
        }
        return apiResponse(
            res,
            200,
            true,
            'Psychiatrist deleted successfully',
            null,
            null
        );
    } catch (e) {
        console.log(e);
        return InternalServerError(res, 'Could not delete');
    }
}

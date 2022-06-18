import { faker } from '@faker-js/faker';
import { Hospital } from '../models/hospital.model.js';
import { Patient } from '../models/patient.model.js';
import { Psychiatrist } from '../models/psychiatrist.model.js';
import { hospitals } from '../utils/common.js';

async function createPsychiatrists(LIMIT = 100) {
    for (let i = 1; i <= LIMIT; i++) {
        try {
            await Psychiatrist.create({
                firstName: faker.name.firstName('male'),
                lastName: faker.name.lastName('male'),
                phone: faker.phone.phoneNumber('+91-##########'),
                pincode: faker.address.zipCode('######'),
                state: faker.address.state(),
                hospital_id: Math.ceil((Math.random() * 10) % 4),
            });
        } catch (e) {
            console.log(e);
        }
    }
    console.log(`\nINSERTED ${LIMIT} PsychiatristS\n`);
}

async function createPatients(LIMIT = 100) {
    for (let i = 1; i <= LIMIT; i++) {
        try {
            await Patient.create({
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                address: faker.address.streetAddress(),
                phone: faker.phone.phoneNumber('+91-##########'),
                password: faker.internet.password(),
                profilePicturePath: 'path/to/pic',
                PsychiatristId: Math.ceil((Math.random() * 100) % 100),
            });
        } catch (e) {
            console.log(e);
        }
    }
    console.log(`\nINSERTED ${LIMIT} Patients\n`);
}

async function insertHospitals() {
    for (const hospital of hospitals) {
        await Hospital.create({ name: hospital });
    }
}

async function seedDB() {
    await insertHospitals();
    await createPsychiatrists();
    await createPatients();
}

export { seedDB };

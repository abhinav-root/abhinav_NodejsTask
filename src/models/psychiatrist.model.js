import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';
import { Hospital } from './hospital.model.js';
import { Patient } from './patient.model.js';

const Psychiatrist = sequelize.define('Psychiatrist', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    pincode: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    state: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});

Hospital.hasMany(Psychiatrist, {
    foreignKey: {
        allowNull: false,
        name: 'hospital_id',
    },
});
Psychiatrist.belongsTo(Hospital);

Psychiatrist.hasMany(Patient, {
    foreignKey: {
        allowNull: false,
    },
});
Patient.belongsTo(Psychiatrist);

export { Psychiatrist };

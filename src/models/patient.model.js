import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';
import { Psychiatrist } from './psychiatrist.model.js';

const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePicturePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export { Patient };

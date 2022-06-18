import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';
import { Psychiatrist } from './psychiatrist.model.js';

const Hospital = sequelize.define('Hospital', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

export { Hospital };

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.DB_NAME;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const DIALECT = process.env.DB_DIALECT || 'mysql';
const PORT = process.env.DB_PORT;

const sequelize = new Sequelize({
    database: DATABASE,
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    port: PORT,
    dialect: DIALECT,
    define: {
        underscored: true,
        timestamps: true,
        deletedAt: true,
        freezeTableName: true,
    },
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { connect, sequelize };

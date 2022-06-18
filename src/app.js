import express from 'express';
import { connect } from '../db/config.js';
import router from './routes/index.js';
import { sequelize } from '../db/config.js';
import { seedDB } from './seeder/seed.js';

const main = async () => {
    await connect();

    if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
    }

    const app = express();

    const PORT = process.env.PORT || 5000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.urlencoded({ extended: true }));

    const apiPrefix = '/api/v1';

    app.use(apiPrefix, router);

    app.get(apiPrefix + '/seed', async (req, res) => {
        await seedDB();
        return res.send({
            msg: 'DB seeded with dummy patients and psychiatrists',
        });
    });

    app.listen(PORT, () =>
        console.log(`Express app listening on port ${PORT}`)
    );
};

main();

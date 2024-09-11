import express from 'express';
import cors from 'cors';
import operatorRoutes from './routes/operatorRoutes';
import clientRoutes from './routes/clientRoutes';
import  sequelize  from './sequelize/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/operators', operatorRoutes);
app.use('/api/clients', clientRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();

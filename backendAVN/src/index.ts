import express from 'express';
import cors from 'cors';
import operatorRoutes from './routes/operatorRoutes';
import clientRoutes from './routes/clientRoutes';
import  sequelize  from './sequelize/db'; // Altere para importação nomeada

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/operators', operatorRoutes);
app.use('/api/clients', clientRoutes);

// Função para iniciar o servidor
const startServer = async () => {
    try {
        // Sincroniza os modelos com o banco de dados
        await sequelize.sync(); // Adicione await aqui para garantir que a sincronização esteja concluída
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Inicia o servidor
startServer();

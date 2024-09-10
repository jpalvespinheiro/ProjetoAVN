import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('projetoavn', 'root', '20281422', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Habilita log para ver as queries
});

export default sequelize;

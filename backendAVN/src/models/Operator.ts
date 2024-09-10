import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize/db'; // Verifique se este caminho está correto

class Operator extends Model {
    id!: number; // O "public" é desnecessário aqui
    name!: string;

    // As propriedades de timestamps são geradas automaticamente pelo Sequelize
    createdAt!: Date;
    updatedAt!: Date;
}

Operator.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Permitir auto incremento
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,    // O nome é obrigatório
        },
    },
    {
        sequelize,               // Conexão do banco de dados
        modelName: 'Operator',    // Nome do modelo
        tableName: 'Operators',   // Nome da tabela no banco de dados
        timestamps: true,         // Cria automaticamente "createdAt" e "updatedAt"
    }
);

export default Operator;

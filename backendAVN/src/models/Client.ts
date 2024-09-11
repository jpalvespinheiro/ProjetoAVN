import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize/db';

class Client extends Model {
    public id!: number; 
    public name!: string;
    public birth_date!: Date;
    public value!: number;
    public email!: string;
    public operator_id!: number;
}

Client.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth_date: DataTypes.DATE,
    value: DataTypes.DECIMAL(10, 2),
    email: DataTypes.STRING,
    operator_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'operators',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Client',
});

export default Client;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize/db';

class Operator extends Model {
    id!: number;
    name!: string;


    createdAt!: Date;
    updatedAt!: Date;
}

Operator.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Operator',
        tableName: 'Operators', 
        timestamps: true,   
    }
);

export default Operator;

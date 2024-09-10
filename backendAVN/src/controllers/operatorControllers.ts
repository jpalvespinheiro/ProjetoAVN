import { Request, Response } from 'express';
import Operator from '../models/Operator';



export const createOperator = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        // Crie o novo operador sem especificar o ID
        const newOperator = await Operator.create({
            name,
        });

        res.status(201).json(newOperator);
    } catch (error) {
        console.error('Erro ao criar operador:', error);
        res.status(500).json({ error: 'Erro ao criar operador' });
    }
};


export const getOperators = async (req: Request, res: Response) => {
    const operators = await Operator.findAll();
    res.json(operators);
};

export const updateOperator = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    await Operator.update({ name }, { where: { id } });
    res.sendStatus(204);
};

export const deleteOperator = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Operator.destroy({ where: { id } });

        res.sendStatus(204); 
    } catch (error) {
        console.error('Erro ao deletar operador:', error);
        res.status(500).json({ error: 'Erro ao deletar operador' });
    }
};



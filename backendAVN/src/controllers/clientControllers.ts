import { Request, Response } from 'express';
import Client from '../models/Client';
import Operator from '../models/Operator';
import fs from 'fs';
import * as fastcsv from 'fast-csv';
import multer from 'multer';

// Importar clientes do CSV
export const importClients = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File not provided' });
    }

    const fileRows: any[] = [];
    fs.createReadStream(req.file.path)
        .pipe(fastcsv.parse({ headers: true }))
        .on('data', (row) => {
            fileRows.push(row);
        })
        .on('end', async () => {
            const operators = await Operator.findAll();
            const operatorCount = operators.length;

            // Distribuição sequencial
            for (let i = 0; i < fileRows.length; i++) {
                let operatorId: number | null = null;
                
                // Atribuir um operador se existir
                if (operatorCount > 0) {
                    operatorId = operators[i % operatorCount].id;
                }
                
                await Client.create({ ...fileRows[i], operator_id: operatorId });
            }
            res.sendStatus(200);
        });
};



// Obter todos os clientes
export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll();
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar clientes', details: error });
    }
};

// Criar um novo cliente
export const createClient = async (req: Request, res: Response) => {
    const { name, birth_date, value, email } = req.body;

    try {
        const { count } = await Client.findAndCountAll();
        const newId = count + 1;

        const newClient = await Client.create({
            id: newId,
            name,
            birth_date,
            value,
            email,
        });

        res.status(201).json(newClient);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
};

// Atualizar cliente
export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [updated] = await Client.update(req.body, {
            where: { id },
        });
        if (updated) {
            const updatedClient = await Client.findOne({ where: { id } });
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};

// Deletar cliente
export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Client.destroy({ where: { id } });
        res.sendStatus(204);
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};

// Redistribuir clientes
export const redistributeClients = async (req: Request, res: Response) => {
    const operators = await Operator.findAll();
    const clients = await Client.findAll();
    const operatorCount = operators.length;

    for (let i = 0; i < clients.length; i++) {
        const operatorId = operators[i % operatorCount].id;
        await Client.update({ operator_id: operatorId }, { where: { id: clients[i].id } });
    }
    res.sendStatus(200);
};

// Obter clientes redistribuídos
export const getRedistributedClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll({
            include: [{
                model: Operator,
                as: 'operator', // Certifique-se de que o alias esteja correto
            }],
        });
        return res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao buscar clientes redistribuídos:', error);
        return res.status(500).json({ error: 'Erro ao buscar clientes redistribuídos', details: error });
    }
};

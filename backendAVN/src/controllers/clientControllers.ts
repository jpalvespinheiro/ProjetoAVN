import { Request, Response } from 'express';
import Client from '../models/Client';
import Operator from '../models/Operator';
import fs from 'fs';
import * as fastcsv from 'fast-csv'; // ou import fastcsv from 'fast-csv';
import multer from 'multer';


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
                const operatorId = operators[i % operatorCount].id;
                await Client.create({ ...fileRows[i], operator_id: operatorId });
            }
            res.sendStatus(200);
        });
};

export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll();
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar clientes', details: error });
    }
};

export const createClient = async (req: Request, res: Response) => {
    const { name, birth_date, value, email } = req.body;

    try {
        // Obter todos os IDs usados
        const usedIds = await Client.findAll({ attributes: ['id'] });
        const usedIdSet = new Set(usedIds.map((client) => client.id));

        // Encontrar o menor ID disponível
        let newId = 1;
        while (usedIdSet.has(newId)) {
            newId++;
        }

        // Criar novo cliente com o ID disponível
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
        // Verificação de tipo
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Client.destroy({ where: { id } });

        res.sendStatus(204); // Deletado com sucesso
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};

export const redistributeClients = async (req: Request, res: Response) => {
    const operators = await Operator.findAll();
    const clients = await Client.findAll();
    const operatorCount = operators.length;

    // Redistribuição sequencial
    for (let i = 0; i < clients.length; i++) {
        const operatorId = operators[i % operatorCount].id;
        await Client.update({ operator_id: operatorId }, { where: { id: clients[i].id } });
    }
    res.sendStatus(200);
};

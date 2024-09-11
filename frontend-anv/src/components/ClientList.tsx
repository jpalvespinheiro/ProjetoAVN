// src/components/ClientList.tsx
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';

interface Client {
    id: number;
    name: string;
    operatorId: number; // ou o que for relevante
}

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/clients'); // Ajuste a URL conforme necessário
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <List>
            {clients.map(client => (
                <ListItem key={client.id}>
                    <ListItemText primary={client.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default ClientList;

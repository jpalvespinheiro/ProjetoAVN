import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button } from '@mui/material';
import { collumClients } from '../types'; // Importe o Client do novo arquivo

interface ClientListProps {
  clients: collumClients[]; // Use a interface importada
  onDelete: (id: number) => Promise<void>;
  onEdit: (client: collumClients) => void;
}

interface ClientListProps {
  clients: collumClients[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (client: collumClients) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onDelete, onEdit }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Data de Nascimento</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Email</TableSortLabel>
            </TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.birthDate}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(client)}>Editar</Button>
                <Button onClick={() => client.id !== undefined && onDelete(client.id)}>Deletar</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientList;

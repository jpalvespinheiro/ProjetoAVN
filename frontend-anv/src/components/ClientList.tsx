import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button } from '@mui/material';
import { collumClients } from '../types'; 
import Papa from 'papaparse'; 

interface ClientListProps {
  clients: collumClients[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (client: collumClients) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onDelete, onEdit }) => {
  const handleExport = () => {
    const csv = Papa.unparse(clients); 
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'clientes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleExport} style={{ marginTop: '20px' }}>
        Exportar para CSV
      </Button>
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
    </div>
  );
};

export default ClientList;

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button } from '@mui/material';

interface OperatorsTableProps {
  operators: { id: number; name: string }[];
  onDelete: (id: number) => void;
  onEdit: (operator: { id: number; name: string }) => void;
}

const OperatorsTable: React.FC<OperatorsTableProps> = ({ operators, onDelete, onEdit }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>Nome do Operador</TableSortLabel>
            </TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operators.map((operator) => (
            <TableRow key={operator.id}>
              <TableCell>{operator.name}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary" onClick={() => onEdit(operator)}>
                  Editar
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onDelete(operator.id)} style={{ marginLeft: '10px' }}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OperatorsTable;

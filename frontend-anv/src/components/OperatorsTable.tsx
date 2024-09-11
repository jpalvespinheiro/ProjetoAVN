import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

interface Operator {
  id: number;
  name: string;
}

interface OperatorsTableProps {
  operators: Operator[];
  onDelete: (id: number) => void;
  onEdit: (operator: Operator) => void;
}

const OperatorsTable = ({ operators, onDelete, onEdit }: OperatorsTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operators.map((operator) => (
            <TableRow key={operator.id}>
              <TableCell>{operator.name}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => onEdit(operator)}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => onDelete(operator.id)}>
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

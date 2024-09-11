import { useState, useEffect } from 'react';
import { Container, Paper, ThemeProvider, createTheme } from '@mui/material';
import OperatorForm from './components/OperatorForm';
import OperatorsTable from './components/OperatorsTable';
import { getOperators, createOperator, deleteOperator, updateOperator } from './services/operatorService';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

interface Operator {
  id: number;
  name: string;
}

const App = () => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    const { data } = await getOperators();
    setOperators(data);
  };

  const handleCreate = async (name: string) => {
    await createOperator(name);
    fetchOperators();
  };

  const handleUpdate = async (id: number, name: string) => {
    await updateOperator(id, name);
    fetchOperators();
    setCurrentOperator(null);
  };

  const handleDelete = async (id: number) => {
    await deleteOperator(id);
    fetchOperators();
  };

  const handleEdit = (operator: Operator) => {
    setCurrentOperator(operator);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
          <h1 style={{ textAlign: 'center' }}>Gerenciar Operadores</h1>
          <OperatorForm onSave={currentOperator ? (name: string) => handleUpdate(currentOperator.id, name) : handleCreate} operator={currentOperator} />
        </Paper>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <OperatorsTable operators={operators} onDelete={handleDelete} onEdit={handleEdit} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;

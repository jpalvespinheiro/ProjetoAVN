import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { createOperator, updateOperator, deleteOperator, getOperators } from './services/operatorService'; 
import { createClient, updateClient, deleteClient, getClients, importClientsCSV } from './services/clientService'; // Adicionar importação CSV
import OperatorsTable from './components/OperatorsTable';
import OperatorForm from './components/OperatorForm';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import { Container, Paper, Snackbar, Typography, Button } from '@mui/material'; 
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Client {
  id?: number;
  name: string;
  birthDate: string;
  email: string;
}

const App = () => {
  const [operators, setOperators] = useState<{ id: number; name: string }[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentOperator, setCurrentOperator] = useState<{ id: number; name: string } | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchOperators();
    fetchClients();
  }, []);

  const fetchOperators = async () => {
    const response = await getOperators();
    setOperators(response.data);
  };

  const fetchClients = async () => {
    const response = await getClients();
    setClients(response.data);
  };

  const handleCreate = async (name: string) => {
    await createOperator(name);
    setSnackbarMessage('Operador adicionado com sucesso!');
    setOpenSnackbar(true);
    fetchOperators();
  };

  const handleUpdate = async (id: number, name: string) => {
    await updateOperator(id, name);
    setSnackbarMessage('Operador atualizado com sucesso!');
    setOpenSnackbar(true);
    fetchOperators();
    setCurrentOperator(null);
  };

  const handleDelete = async (id: number) => {
    await deleteOperator(id);
    setSnackbarMessage('Operador deletado com sucesso!');
    setOpenSnackbar(true);
    fetchOperators();
  };

  const handleEdit = (operator: { id: number; name: string }) => {
    setCurrentOperator(operator);
  };

  const handleClientCreate = async (client: { name: string; birthDate: string; email: string }) => {
    await createClient(client);
    setSnackbarMessage('Cliente criado com sucesso!');
    setOpenSnackbar(true);
    fetchClients();
  };

  const handleClientUpdate = async (id: number, client: { name: string; birthDate: string; email: string }) => {
    await updateClient(id, client);
    setSnackbarMessage('Cliente atualizado com sucesso!');
    setOpenSnackbar(true);
    fetchClients();
    setCurrentClient(null);
  };

  const handleClientDelete = async (id: number) => {
    await deleteClient(id);
    setSnackbarMessage('Cliente deletado com sucesso!');
    setOpenSnackbar(true);
    fetchClients();
  };

  const handleClientEdit = (client: Client) => {
    setCurrentClient(client);
  };

  // Essa função foi criada para importar os clientes via CSV
  const handleFileUpload = async (file: File) => {
    try {
      await importClientsCSV(file);
      setSnackbarMessage('Clientes importados com sucesso!');
      setOpenSnackbar(true);
      fetchClients();
    } catch (error) {
      setSnackbarMessage('Erro ao importar clientes!');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Router>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Routes>
          <Route path="/" element={
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h4" style={{ color: '#1976d2', marginBottom: '20px' }}>
                Bem-vindos Pessoal
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '20px' }}>
                A partir de agora você poderá fazer os cadastros.
              </Typography>
              <Link to="/operators">
                <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                  Cadastrar Operadores
                </Button>
              </Link>
              <Link to="/clients">
                <Button variant="contained" color="primary">
                  Cadastrar Clientes
                </Button>
              </Link>
            </Paper>
          } />
          <Route path="/operators" element={
            <Paper elevation={3} style={{ padding: '30px', marginBottom: '20px' }}>
              <Typography variant="h4" align="center" style={{ color: '#1976d2' }}>
                Gerenciar Operadores
              </Typography>
              <OperatorForm
                onSave={currentOperator ? (name) => handleUpdate(currentOperator.id, name) : handleCreate}
                operator={currentOperator}
              />
              <OperatorsTable operators={operators} onDelete={handleDelete} onEdit={handleEdit} />
            </Paper>
          } />
          <Route path="/clients" element={
            <Paper elevation={3} style={{ padding: '30px', marginBottom: '30px' }}>
              <Typography variant="h4" align="center" style={{ color: '#1976d2' }}>
                Gerenciar Clientes
              </Typography>
              <ClientForm
                client={currentClient}
                onSave={currentClient ? (client) => handleClientUpdate(currentClient.id!, client) : handleClientCreate}
                setCurrentClient={setCurrentClient}
                onFileUpload={handleFileUpload}
              />
              <ClientList clients={clients} onDelete={handleClientDelete} onEdit={handleClientEdit} />
            </Paper>
          } />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

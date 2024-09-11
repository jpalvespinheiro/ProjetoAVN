import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography variant="h4" style={{ color: '#1976d2', marginBottom: '20px' }}>
        Bem-vindos Pessoal
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
        A partir de agora você poderá fazer os cadastros.
      </Typography>
      <Box>
        <Button variant="contained" color="primary" onClick={() => navigate('/operators')} style={{ marginRight: '10px' }}>
          Cadastrar Operadores
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/clients')}>
          Cadastrar Clientes
        </Button>
      </Box>
    </Container>
  );
};

export default Home;

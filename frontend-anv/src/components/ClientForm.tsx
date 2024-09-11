import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collumClients } from '../types';

interface ClientFormProps {
  client: collumClients | null;
  onSave: (client: { name: string; birthDate: string; email: string }) => Promise<void>;
  setCurrentClient: React.Dispatch<React.SetStateAction<collumClients | null>>;
  onFileUpload: (file: File) => void; // Função para que possa tratar o upload do CSV
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSave, setCurrentClient, onFileUpload }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (client) {
      setName(client.name);
      setBirthDate(client.birthDate);
      setEmail(client.email);
    } else {
      setName('');
      setBirthDate('');
      setEmail('');
    }
  }, [client]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ name, birthDate: new Date(birthDate).toISOString().split('T')[0], email });
    setCurrentClient(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  const handleBack = () => {
    navigate('/'); // Volta a navegação para a página principal
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        style={{ marginBottom: '10px' }}
      />
      <TextField
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        fullWidth
        required
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        style={{ marginBottom: '10px' }}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Salvar
        </Button>
        <Button
          variant="contained"
          component="label"
          color="secondary"
        >
          Importar CSV
          <input type="file" accept=".csv" hidden onChange={handleFileChange} />
        </Button>
        <Button 
          onClick={handleFileUpload} 
          variant="contained" 
          color="secondary" 
          disabled={!file} 
          style={{ marginLeft: '10px' }}>
          Upload CSV
        </Button>
        <Button 
          onClick={handleBack} 
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px'}}>
          Voltar
        </Button>
      </Box>
    </form>
  );
};

export default ClientForm;

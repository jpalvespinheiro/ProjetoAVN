import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { collumClients } from '../types'; // Importe o Client do novo arquivo

interface ClientFormProps {
  client: collumClients | null; // Use a interface importada
  onSave: (client: { name: string; birthDate: string; email: string }) => Promise<void>;
  setCurrentClient: React.Dispatch<React.SetStateAction<collumClients | null>>;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onSave, setCurrentClient }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');

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
    await onSave({ name, birthDate: new Date(birthDate).toISOString().split('T')[0], email }); // Convertendo para ISO sem horas
    setCurrentClient(null); // Limpa o cliente atual após salvar
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Data de Nascimento"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Salvar
      </Button>
    </form>
  );
};

export default ClientForm;

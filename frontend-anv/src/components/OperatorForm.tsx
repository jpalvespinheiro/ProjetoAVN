import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface OperatorFormProps {
  onSave: (name: string) => void;
  operator: { id: number; name: string } | null;
}

const OperatorForm: React.FC<OperatorFormProps> = ({ onSave, operator }) => {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (operator) {
      setName(operator.name);
    } else {
      setName('');
    }
  }, [operator]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name);
    setName('');
  };

  const handleBack = () => {
    navigate('/'); // Navega para a página principal
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="Nome do Operador"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button type="submit" variant="contained" color="primary" style={{ width: '48%' }}>
            {operator ? 'Atualizar Operador' : 'Adicionar Operador'}
          </Button>
          <Button variant="contained" color="primary" onClick={handleBack} style={{ width: '48%' }}>
            Voltar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default OperatorForm;

import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface OperatorFormProps {
  onSave: (name: string) => void;
  operator: { id: number; name: string } | null;
}

const OperatorForm: React.FC<OperatorFormProps> = ({ onSave, operator }) => {
  const [name, setName] = useState('');

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
        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
          {operator ? 'Atualizar Operador' : 'Adicionar Operador'}
        </Button>
      </Box>
    </form>
  );
};

export default OperatorForm;

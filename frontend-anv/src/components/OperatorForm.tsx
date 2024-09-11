import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface OperatorFormProps {
  onSave: (name: string) => void;
  operator: { name: string } | null;
}

const OperatorForm = ({ onSave, operator }: OperatorFormProps) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (operator) {
      setName(operator.name);
    } else {
      setName('');
    }
  }, [operator]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Nome do Operador"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          {operator ? 'Atualizar' : 'Adicionar'}
        </Button>
      </Box>
    </form>
  );
};

export default OperatorForm;

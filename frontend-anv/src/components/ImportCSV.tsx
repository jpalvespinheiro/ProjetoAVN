import React from 'react';
import { Button } from '@mui/material';

const ImportCSV: React.FC<{ onImport: (data: any[]) => void }> = ({ onImport }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parsedData = parseCSV(text);
        onImport(parsedData);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n');
    const result: any[] = [];
    for (const line of lines) {
      const [name, birthDate] = line.split(',');
      result.push({ name, birthDate });
    }
    return result;
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={() => console.log("Importar")}>
        Importar Clientes
      </Button>
    </div>
  );
};

export default ImportCSV;

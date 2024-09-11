import api from './api';

// operatorService.ts
import axios from 'axios';

export const getOperators = async () => {
  return await api.get('/api/operators');
};

export const createOperator = async (name: string) => {
  return await api.post('/api/operators', { name });
};

export const deleteOperator = async (id: number) => {
  return await api.delete(`/api/operators/${id}`);
};

export const updateOperator = async (id: number, name: string) => {
  return await api.put(`/api/operators/${id}`, { name });
};

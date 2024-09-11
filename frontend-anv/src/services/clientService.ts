import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

export const getClients = async () => {
  return await api.get('/clients');
};

export const createClient = async (client: { name: string; birthDate: string; email: string }) => {
  return await api.post('/clients', client);
};

export const updateClient = async (id: number, client: { name: string; birthDate: string; email: string }) => {
  return await api.put(`/clients/${id}`, client);
};

export const deleteClient = async (id: number) => {
  return await api.delete(`/clients/${id}`);
};

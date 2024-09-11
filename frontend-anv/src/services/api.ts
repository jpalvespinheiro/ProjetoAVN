import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // Criação da conexão com o backend
});

export default api;

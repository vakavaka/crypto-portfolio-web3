import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPortfolioData = async () => {
  const response = await api.get('/portfolio');
  return response.data;
};

export const addWallet = async (walletData) => {
  const response = await api.post('/wallets', walletData);
  return response.data;
};

export const addExchange = async (exchangeData) => {
  const response = await api.post('/exchanges', exchangeData);
  return response.data;
};

export default api;
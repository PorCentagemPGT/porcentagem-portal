import axios from 'axios';
import { setupApiInterceptors } from './interceptors';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupApiInterceptors(api);

export default api;

// basicClient.js
import axios from 'axios';
import config from '../../config';

const basicClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
});

basicClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

basicClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default basicClient;

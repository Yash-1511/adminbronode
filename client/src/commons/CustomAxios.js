import axios from 'axios';
import { DOMAIN } from '../../config/key';

const jwt = `Bearer ${localStorage.getItem('login')}`;

//gọi lại hằng số hệ thống để sử dụng ở services
export const resConnector = axios.create({
  baseURL: DOMAIN,
  headers: { authorization: jwt },
});

resConnector.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('login');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    } else {
      delete resConnector.defaults.headers.common.authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

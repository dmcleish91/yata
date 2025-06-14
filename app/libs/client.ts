import axios from 'axios';
import { handleError } from './handleError';
import { APIEndpoints } from '~/constants/api';
import { env } from '../../src/config/env';

let authToken: string | null = null;

const ax = axios.create({
  baseURL: env.VITE_BASEURL,
  withCredentials: true,
});

export const setAccessToken = (token: string | null) => {
  authToken = token;
  if (token) {
    ax.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete ax.defaults.headers.common['Authorization'];
  }
};

export const logout = async () => {
  try {
    await ax.post(APIEndpoints.LOGOUT);
    setAccessToken(null);
  } catch (error) {
    handleError(error);
  }
};

// ax.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await logout();
//     }
//     return Promise.reject(error);
//   }
// );

export default ax;

import axios from 'axios';

let authToken: string | null = null;

const ax = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});

export const setAccessToken = (token: string | null) => {
  authToken = token;
};

export const logout = async () => {
  try {
    await ax.post('/v1/logout');
    setAccessToken(null);
    delete ax.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

ax.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await ax.post('/v1/refresh');
        const { access_token } = response.data.data;

        setAccessToken(access_token);
        ax.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        return ax(originalRequest);
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default ax;

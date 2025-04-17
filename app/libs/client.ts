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

    // Check if it's a 401 error, not a refresh token request, and hasn't been retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh-token')
    ) {
      originalRequest._retry = true;

      try {
        const response = await ax.post('/v1/refresh-token');
        const { access_token } = response.data.data;

        setAccessToken(access_token);
        ax.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // Update the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
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

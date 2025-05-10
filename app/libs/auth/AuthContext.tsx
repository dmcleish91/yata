import { useState, createContext, useContext, type ReactNode, useEffect } from 'react';
import type { AxiosError } from 'axios';
import ax, { setAccessToken } from '../client';
import type { AuthError, User } from '~/types/auth';
import { handleError } from '../handleError';

type AuthContextType = {
  user: User | null;
  error: AuthError | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<string | null>;
  refreshToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function login(data: { email: string; password: string }): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const payload = new URLSearchParams();
      payload.append('email', data.email);
      payload.append('password', data.password);

      const response = await ax.post('/login', payload.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        const { access_token } = response.data.data;
        ax.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setAccessToken(access_token);
        setUser({ isLoggedIn: true });
      }
    } catch (err) {
      const error = err as AxiosError;
      setError({
        message: error.message,
        code: error.response?.status || 500,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(): Promise<string | null> {
    const response = await ax.post(import.meta.env.VITE_BASEURL + '/logout');
    delete ax.defaults.headers.common['Authorization'];
    setAccessToken(null);
    setUser(null);
    return response.data;
  }

  async function refreshToken(): Promise<string | null> {
    try {
      const response = await ax.post('/refresh-token');

      if (response.status === 200) {
        const { access_token } = response.data.data;
        ax.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        setUser({ isLoggedIn: true });
        setAccessToken(access_token);
        return access_token;
      }
      return null;
    } catch (error) {
      handleError(error);
      await logout();
      return null;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, error, isLoading, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// utility function to make using context easier in components
export function useAuth() {
  const currentAuthContext = useContext(AuthContext);
  if (!currentAuthContext) {
    throw new Error('useAuth must be used within <AuthContext.Provider>');
  }
  return currentAuthContext;
}

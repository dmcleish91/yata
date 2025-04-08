import { useState, createContext, useContext, type ReactNode } from 'react';
import ax from './client';
import type { AxiosError } from 'axios';

type User = {
  email: string;
  token: string;
};

type AuthError = {
  message: string;
  status: number;
};

type AuthContextType = {
  user: User | null;
  error: AuthError | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
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

      const form = new FormData();
      form.append('email', data.email);
      form.append('password', data.password);
      const response = await ax.post('/login', form);

      if (response.status === 200) {
        ax.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setUser({ email: data.email, token: response.data.token });
      }
    } catch (err) {
      const error = err as AxiosError;
      setError({
        message: error.message,
        status: error.status || 500,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    delete ax.defaults.headers.common['Authorization'];
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, error, isLoading, login, logout }}>
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

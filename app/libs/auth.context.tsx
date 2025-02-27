import { useState, createContext, useContext, type ReactNode } from 'react';
import ax from './client';

type User = {
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<number>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(data: { email: string; password: string }): Promise<number> {
    const form = new FormData();
    form.append('email', data.email);
    form.append('password', data.password);
    const response = await ax.post('/login', form);

    if (response.status === 200) {
      ax.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser({ email: data.email, token: response.data.token });
    }
    //setUser(user);

    return response.status;
  }

  function logout() {
    delete ax.defaults.headers.common['Authorization'];
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

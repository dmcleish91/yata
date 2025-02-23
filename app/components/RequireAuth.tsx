import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../libs/auth.context';
import { useEffect, type ReactNode } from 'react';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return <Outlet />;
}

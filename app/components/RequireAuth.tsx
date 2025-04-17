import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../libs/auth.context';
import { useEffect } from 'react';

export default function RequireAuth() {
  const navigate = useNavigate();
  const { user, refreshToken } = useAuth();

  useEffect(() => {
    async function checkAuth() {
      if (!user) {
        const token = await refreshToken();
        if (!token) {
          navigate('/login');
        }
      }
    }

    checkAuth();
  }, [user, refreshToken, navigate]);

  if (!user) {
    return null;
  }

  return <Outlet />;
}

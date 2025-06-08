import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '~/libs/auth/AuthContext';
import { LoaderCircle } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    supabase.auth.onAuthStateChange((event, _) => {
      if (event === 'SIGNED_IN') {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <main className='flex items-center justify-center min-h-screen bg-base-200'>
      <LoaderCircle className='animate-spin' />
    </main>
  );
}

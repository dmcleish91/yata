import { LoaderCircle } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/libs/auth.context';

export default function Login() {
  const { login, error, isLoading, refreshToken, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    async function checkRefreshToken() {
      if (user) {
        navigate('/');
        return;
      }

      const token = await refreshToken();
      if (token) {
        navigate('/');
      } else {
        setChecking(false);
      }
    }
    checkRefreshToken();
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    console.log({ email, password });
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (checking) {
    return (
      <main className='flex items-center justify-center min-h-screen bg-base-200'>
        <LoaderCircle className='animate-spin' />
      </main>
    );
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-96 bg-base-100 shadow-xl p-8'>
        <h2 className='text-center text-2xl font-semibold'>Login</h2>
        {error && (
          <div className='alert alert-error my-4'>
            <span>{error.message}</span>
          </div>
        )}
        <form className='space-y-4' onSubmit={handleLogin}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              className='input input-bordered'
              // autoComplete='email'
              value={email}
              onChange={handleEmailInput}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              className='input input-bordered'
              //autoComplete='current-password'
              value={password}
              onChange={handlePasswordInput}
              required
            />
          </div>
          <button type='submit' className={`btn btn-primary w-full`} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className='text-center mt-4'>
          <a href='#' className='text-sm text-blue-500 hover:underline'>
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}

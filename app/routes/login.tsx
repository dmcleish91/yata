import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/libs/auth/AuthContext';
import { handleError } from '~/libs/handleError';

export default function Login() {
  const { login, error, isLoading, refreshToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const [checking, setIsChecking] = useState<boolean>(true);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      handleError(error);
    }
  }

  function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleShowPassword() {
    setPasswordType('text');
  }

  function handleHidePassword() {
    setPasswordType('password');
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        const refreshed = await refreshToken();
        if (refreshed) {
          navigate('/');
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        handleError(error);
        setIsChecking(false);
      }
    }

    checkAuth();
  }, [navigate]);

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
              autoComplete='email'
              value={email}
              onChange={handleEmailInput}
              required
            />
          </div>
          <div className='form-control'>
            <div className='label'>
              <span className='label-text'>Password</span>
            </div>

            <div className='inline-flex items-center relative w-full'>
              <button
                className='btn btn-ghost btn-sm btn-circle absolute right-0 mr-2'
                type='button'
                onMouseDown={handleShowPassword}
                onMouseUp={handleHidePassword}
                onMouseLeave={handleHidePassword}
                tabIndex={-1}>
                {passwordType === 'password' ? <EyeClosed /> : <Eye />}
              </button>

              <input
                id='password'
                type={passwordType}
                placeholder='********'
                value={password}
                onChange={handlePasswordInput}
                className='input input-bordered pr-11 w-full'
              />
            </div>
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

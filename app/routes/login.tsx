import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '~/libs/auth.context';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const statusCode = await login({ email, password });

    if (statusCode === 200) {
      navigate('/app');
    } else {
      toast.error('Need a beter login error message');
    }

    setLoading(false);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-96 bg-base-100 shadow-xl p-8'>
        <h2 className='text-center text-2xl font-semibold'>Login</h2>
        <form className='space-y-4' onSubmit={handleLogin}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              className='input input-bordered'
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
              value={password}
              onChange={handlePasswordInput}
              required
            />
          </div>
          <button type='submit' className={`btn btn-primary w-full`} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
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

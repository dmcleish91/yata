import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { APIEndpoints } from '~/constants/api';
import ax from '~/libs/client';
import { handleError } from '~/libs/handleError';
import { useConfettiBurst } from '~/hooks/useConfettiBurst';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();
  const { start: startConfetti } = useConfettiBurst();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    const payload = new URLSearchParams(form);
    const loginPayload = new URLSearchParams({
      email: form.email,
      password: form.password,
    });

    try {
      await ax.post(APIEndpoints.REGISTER, payload.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      await ax.post(APIEndpoints.LOGIN, loginPayload.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setStatus('success');
    } catch (error) {
      handleError(error);
      setStatus('error');
    }
  }

  useEffect(() => {
    if (status === 'success') {
      startConfetti({ duration: 5000, interval: 750 });
    }
  }, [status]);

  if (status === 'success') {
    return (
      <main className='flex items-center justify-center min-h-screen bg-base-200'>
        <div className='card w-96 bg-base-100 shadow-xl p-8 text-center'>
          <h2 className='text-2xl font-semibold mb-4'>Registration Successful!</h2>
          <p className='mb-6'>Your account has been created and you are now logged in.</p>
          <button className='btn btn-primary w-full' onClick={() => navigate('/')}>
            Go to App
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-96 bg-base-100 shadow-xl p-8'>
        <h2 className='text-center text-2xl font-semibold'>Register</h2>
        <form className='space-y-4' onSubmit={handleRegister}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <input
              name='username'
              type='text'
              placeholder='Enter your username'
              className='input input-bordered'
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              name='email'
              type='email'
              placeholder='Enter your email'
              className='input input-bordered'
              required
              autoComplete='off'
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              name='password'
              type='password'
              placeholder='Enter your password'
              className='input input-bordered'
              required
              autoComplete='off'
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            type='submit'
            className={`btn btn-primary w-full`}
            disabled={status === 'loading'}>
            {status === 'loading' ? (
              <span className='loading loading-spinner'></span>
            ) : null}
            {status === 'loading' ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className='text-center mt-4'>
          <a href='#' className='text-sm text-blue-500 hover:underline'>
            Already have an account? Login
          </a>
        </div>
      </div>
    </main>
  );
}

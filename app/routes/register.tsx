import { useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'sonner';
import { APIEndpoints } from '~/constants/api';
import ax from '~/libs/client';
import { handleError } from '~/libs/handleError';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false); // <-- new state

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = new URLSearchParams();
    payload.append('username', username);
    payload.append('email', email);
    payload.append('password', password);

    try {
      await ax.post(APIEndpoints.REGISTER, payload.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setRegistrationSuccessful(true);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  if (registrationSuccessful) {
    return (
      <main className='flex items-center justify-center min-h-screen bg-base-200'></main>
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
              type='text'
              placeholder='Enter your username'
              className='input input-bordered'
              required
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              className='input input-bordered'
              required
              autoComplete='off'
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
              required
              autoComplete='off'
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
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

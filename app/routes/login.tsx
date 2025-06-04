import { useState } from 'react';
import { useAuth } from '~/libs/auth/AuthContext';

export default function Login() {
  const { signInWithMagicLink, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithMagicLink(email);
      setSubmitted(true);
    } catch (error) {
      console.error('Magic link error:', error);
    }
  }

  function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  if (submitted) {
    return (
      <main className='flex items-center justify-center min-h-screen bg-base-200'>
        <div className='card w-96 bg-base-100 shadow-xl p-8'>
          <h2 className='text-2xl font-semibold text-center mb-4'>Check your email</h2>
          <p className='text-center'>
            We've sent a magic link to {email}. Click the link to sign in.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-96 bg-base-100 shadow-xl p-8'>
        <h2 className='text-center text-2xl font-semibold my-2'>Sign In</h2>
        {error && (
          <div className='alert alert-error my-4'>
            <span>{error.message}</span>
          </div>
        )}
        <form className='space-y-4' onSubmit={handleMagicLink}>
          <div className='form-control'>
            <input
              type='email'
              placeholder='Enter your email'
              className='input input-bordered'
              value={email}
              onChange={handleEmailInput}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary w-full' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </main>
  );
}

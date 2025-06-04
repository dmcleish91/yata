import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '~/libs/auth/AuthContext';
import { handleError } from '~/libs/handleError';

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
      handleError(error);
    }
  }

  function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleTryAgain() {
    setSubmitted(false);
    setEmail('');
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200 p-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl p-8'>
        <div className='card-body p-0'>
          <h2 className='text-2xl font-semibold text-center mb-2'>Sign In</h2>
          <p className='text-center text-base text-gray-500 mb-6'>Enter your email to receive a magic link</p>

          {/* Login Form */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              submitted ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}>
            {error && (
              <div className='alert alert-error mb-4'>
                <span>{error.message}</span>
              </div>
            )}
            <form className='space-y-4' onSubmit={handleMagicLink}>
              <div className='form-control'>
                <label htmlFor='email' className='sr-only'>
                  <span className='label-text'>Email address</span>
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  className='input input-bordered w-full'
                  value={email}
                  onChange={handleEmailInput}
                  required
                  disabled={isLoading}
                />
              </div>
              <button type='submit' className='btn btn-primary w-full flex items-center justify-center' disabled={isLoading || !email}>
                {isLoading ? (
                  <span className='loading loading-spinner loading-md'></span>
                ) : (
                  <>
                    <Mail className='w-4 h-4 mr-2' />
                    Send magic link
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Success Message */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center ${
              submitted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
            <div className='card bg-base-100 shadow-xl p-8 w-full'>
              <div className='flex flex-col items-center space-y-4'>
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                  <Mail className='w-8 h-8 text-green-600' />
                </div>
                <div className='space-y-2 text-center'>
                  <h3 className='text-lg font-semibold text-gray-500'>Check your email</h3>
                  <p className='text-sm text-gray-400 leading-relaxed'>
                    We've sent a magic link to <span className='font-medium text-gray-500'>{email}</span>.
                    <br />
                    Click the link to sign in.
                  </p>
                </div>
                <button type='button' className='btn btn-outline mt-4' onClick={handleTryAgain}>
                  Try different email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

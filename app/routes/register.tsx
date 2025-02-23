import { useState, type FormEvent } from 'react';

export default function Register() {
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate registration request
    setTimeout(() => {
      setLoading(false);
      alert('Registration successful!');
    }, 1500);
  };

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

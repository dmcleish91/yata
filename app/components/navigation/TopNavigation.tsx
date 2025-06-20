import { Link, useNavigate } from 'react-router';
import { useAuth } from '~/libs/auth/AuthContext';
import { handleError } from '~/libs/handleError';

export default function TopNavigation({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      const response = await signOut();
      console.log(response);
      navigate('/login');
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='bg-base-100 shadow-md'>
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
          <Link to='/' className='text-xl font-bold'>
            Yet Another Todo App 😒
          </Link>
          <div className='space-x-4'>
            {user?.isLoggedIn ? (
              <button onClick={handleSignOut} className='btn btn-ghost'>
                Logout
              </button>
            ) : (
              <>
                <Link to='/about' className='btn btn-ghost'>
                  About
                </Link>
                <Link to='/login' className='btn btn-ghost'>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className='flex-grow'>{children}</main>
    </div>
  );
}

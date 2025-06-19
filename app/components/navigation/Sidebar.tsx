import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/libs/auth/AuthContext';
import { Home, Inbox, Calendar, Clock, Info, LogOut, LogIn } from 'lucide-react';
import { handleError } from '~/libs/handleError';
import { useCallback } from 'react';
import { logError } from '~/libs/logger';

/**
 * Sidebar component that provides navigation and replaces the TopNavigation.
 * Uses DaisyUI styling and Lucide icons for a consistent look.
 */
export default function Sidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Memoized isActive
   */
  const isActive = useCallback(
    (path: string): boolean => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  /**
   * Memoized handleSignOut
   */
  const handleSignOut = useCallback(async (): Promise<void> => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      handleError(error);
    }
  }, [signOut, navigate]);

  return (
    <div className='bg-base-300 w-64 min-h-screen flex flex-col'>
      {/* Header */}
      <div className='border-b border-base-300/50'>
        <div className='flex items-center justify-between p-4'>
          <Link to='/' className='text-xl font-bold flex items-center gap-2' aria-label='Home' tabIndex={0}>
            <Home className='h-5 w-5' />
            YATA
          </Link>
        </div>
      </div>

      {/* Main Menu */}
      <div className='flex-1 overflow-y-auto'>
        <ul className='menu p-4 gap-2'>
          {user?.isLoggedIn && (
            <>
              <li>
                <Link
                  to='/'
                  className={`flex items-center gap-2 hover:bg-base-300/50 ${isActive('/') ? 'bg-base-300/50' : ''}`}
                  aria-current={isActive('/') ? 'page' : undefined}
                  aria-label='Inbox'
                  tabIndex={0}>
                  <Inbox className='h-5 w-5' />
                  <span>Inbox</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className={`flex items-center gap-2 hover:bg-base-300/50 ${isActive('/') ? 'bg-base-300/50' : ''}`}
                  aria-current={isActive('/') ? 'page' : undefined}
                  aria-label='Today'
                  tabIndex={0}>
                  <Calendar className='h-5 w-5' />
                  <span>Today</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className={`flex items-center gap-2 hover:bg-base-300/50 ${isActive('/') ? 'bg-base-300/50' : ''}`}
                  aria-current={isActive('/') ? 'page' : undefined}
                  aria-label='Upcoming'
                  tabIndex={0}>
                  <Clock className='h-5 w-5' />
                  <span>Upcoming</span>
                </Link>
              </li>
            </>
          )}
          {!user?.isLoggedIn && (
            <>
              <li>
                <Link
                  to='/about'
                  className={`flex items-center gap-2 hover:bg-base-300/50 ${isActive('/about') ? 'bg-base-300/50' : ''}`}
                  aria-current={isActive('/about') ? 'page' : undefined}
                  aria-label='About'
                  tabIndex={0}>
                  <Info className='h-5 w-5' />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  className={`flex items-center gap-2 hover:bg-base-300/50 ${isActive('/login') ? 'bg-base-300/50' : ''}`}
                  aria-current={isActive('/login') ? 'page' : undefined}
                  aria-label='Login'
                  tabIndex={0}>
                  <LogIn className='h-5 w-5' />
                  <span>Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Footer */}
      {user?.isLoggedIn && (
        <div className='border-t border-base-300/50 p-4'>
          <button onClick={handleSignOut} className='btn btn-ghost w-full flex items-center gap-2' aria-label='Logout' tabIndex={0}>
            <LogOut className='h-5 w-5' />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

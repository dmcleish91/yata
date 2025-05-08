import { Link } from 'react-router';

export default function TopNavigation({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='bg-base-100 shadow-md'>
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
          <Link to='/' className='text-xl font-bold'>
            Yet Another Todo App 😒
          </Link>
          <div className='space-x-4'>
            <Link to='/' className='btn btn-ghost'>
              Home
            </Link>
            <Link to='/about' className='btn btn-ghost'>
              About
            </Link>
            <Link to='/login' className='btn btn-ghost'>
              Login
            </Link>
          </div>
        </div>
      </nav>
      <main className='flex-grow'>{children}</main>
    </div>
  );
}

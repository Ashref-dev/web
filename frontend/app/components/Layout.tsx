'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className='min-h-screen flex flex-col bg-[#fafafa]'>
      <header className='border-b-4 border-black bg-primary sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <Link
              href='/'
              className='text-2xl md:text-3xl font-black uppercase tracking-tighter hover:scale-105 transition-transform'
            >
              Recipe<span className='text-white'>Share</span>
            </Link>
            <nav className='flex items-center gap-3 md:gap-6 font-bold'>
              <Link
                href='/'
                className='hover:underline decoration-4 underline-offset-4 transition-all hidden sm:inline'
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    href='/profile'
                    className='hover:underline decoration-4 underline-offset-4 transition-all hidden sm:inline'
                  >
                    Profile
                  </Link>
                  <Link href='/recipes/create'>
                    <button className='bg-black text-primary px-4 md:px-6 py-2 md:py-3 hover:bg-gray-800 transition-colors border-2 border-black font-bold uppercase text-sm'>
                      + New
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='hover:underline decoration-4 underline-offset-4 transition-all hidden sm:inline'
                  >
                    Login
                  </Link>
                  <Link href='/register'>
                    <button className='bg-black text-primary px-4 md:px-6 py-2 md:py-3 hover:bg-gray-800 transition-colors border-2 border-black font-bold uppercase text-sm'>
                      Join
                    </button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className='grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        {children}
      </main>
      <footer className='border-t-4 border-black bg-white py-8 mt-auto'>
        <div className='container mx-auto px-4 text-center'>
          <p className='font-black text-lg uppercase tracking-wide'>
            &copy; 2025 RecipeShare.{' '}
            <span className='text-primary'>Brutally Delicious.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

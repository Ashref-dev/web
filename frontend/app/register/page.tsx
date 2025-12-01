'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register({ username, email, password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side - Image & Branding */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='hidden lg:flex lg:w-1/2 relative overflow-hidden'
      >
        {/* Background Image */}
        <div 
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          }}
        />
        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/40 via-black/50 to-black/70' />
        
        {/* Content */}
        <div className='relative z-10 flex flex-col justify-between p-12 text-white'>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href='/' className='flex items-center gap-2'>
              <span className='text-3xl font-black tracking-tight'>
                RECIPE<span className='text-primary'>SHARE</span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='space-y-6'
          >
            <h1 className='text-5xl font-black leading-tight'>
              Start Your<br />
              <span className='text-primary'>Culinary Journey</span>
            </h1>
            <p className='text-xl text-gray-300 max-w-md'>
              Share your secret recipes, discover new flavors, and connect with food enthusiasts worldwide.
            </p>
            
            {/* Features */}
            <div className='space-y-4 mt-8'>
              {[
                { icon: '🍳', text: 'Create & share unlimited recipes' },
                { icon: '❤️', text: 'Save your favorite dishes' },
                { icon: '💬', text: 'Connect with fellow foodies' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className='flex items-center gap-3'
                >
                  <span className='text-2xl'>{feature.icon}</span>
                  <span className='text-lg font-medium'>{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className='text-sm text-gray-400'
          >
            © 2025 RecipeShare. Made with ❤️ for food lovers.
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-bl from-gray-50 to-gray-100'
      >
        <div className='w-full max-w-md'>
          {/* Mobile Logo */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='lg:hidden text-center mb-8'
          >
            <Link href='/'>
              <span className='text-3xl font-black tracking-tight'>
                RECIPE<span className='text-primary'>SHARE</span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
          >
            <div className='text-center mb-8'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className='inline-block mb-4'
              >
                <span className='text-5xl'>👨‍🍳</span>
              </motion.div>
              <h2 className='text-3xl font-black uppercase mb-2'>Join the Kitchen</h2>
              <p className='text-gray-600'>Create your account and start sharing</p>
            </div>

            {error && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className='bg-red-50 border-3 border-red-500 text-red-700 px-4 py-3 mb-6 font-medium'
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-bold uppercase mb-2'>Username</label>
                <input
                  type='text'
                  placeholder='ChefMaster99'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className='w-full px-4 py-3 border-3 border-black bg-white font-medium 
                           focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary
                           transition-all duration-200 placeholder:text-gray-400'
                />
              </div>

              <div>
                <label className='block text-sm font-bold uppercase mb-2'>Email</label>
                <input
                  type='email'
                  placeholder='chef@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='w-full px-4 py-3 border-3 border-black bg-white font-medium 
                           focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary
                           transition-all duration-200 placeholder:text-gray-400'
                />
              </div>
              
              <div>
                <label className='block text-sm font-bold uppercase mb-2'>Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='w-full px-4 py-3 border-3 border-black bg-white font-medium 
                           focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary
                           transition-all duration-200 placeholder:text-gray-400'
                />
              </div>

              <div>
                <label className='block text-sm font-bold uppercase mb-2'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className='w-full px-4 py-3 border-3 border-black bg-white font-medium 
                           focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary
                           transition-all duration-200 placeholder:text-gray-400'
                />
              </div>

              <motion.button
                type='submit'
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className='w-full py-4 bg-primary border-3 border-black font-black uppercase text-lg
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6'
              >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create Account'}
              </motion.button>
            </form>

            <div className='mt-8 text-center'>
              <p className='font-medium text-gray-600'>
                Already have an account?{' '}
                <Link href='/login' className='text-black font-bold underline hover:text-primary transition-colors'>
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className='mt-6 text-center'
          >
            <Link href='/' className='text-gray-500 hover:text-black font-medium transition-colors inline-flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

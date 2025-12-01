'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-[60vh]'>
        <Card className='w-full max-w-md'>
          <h2 className='text-3xl font-black mb-6 uppercase'>Welcome Back</h2>
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Email'
              type='email'
              placeholder='chef@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label='Password'
              type='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
          <p className='mt-4 text-center font-medium'>
            Don't have an account?{' '}
            <Link href='/register' className='underline font-bold'>
              Register here
            </Link>
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;

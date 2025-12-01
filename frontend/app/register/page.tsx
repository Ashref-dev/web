'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register({ username, email, password });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-[60vh]'>
        <Card className='w-full max-w-md'>
          <h2 className='text-3xl font-black mb-6 uppercase'>Join the Club</h2>
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Username'
              type='text'
              placeholder='ChefMaster99'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
              Register
            </Button>
          </form>
          <p className='mt-4 text-center font-medium'>
            Already have an account?{' '}
            <Link href='/login' className='underline font-bold'>
              Login here
            </Link>
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;

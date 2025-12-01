'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => void;
  register: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData: any) => {
    try {
      const { data } = await api.post('/api/auth/login', userData);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/');
    } catch (error: any) {
      console.error(
        'Login failed:',
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const { data } = await api.post('/api/auth/register', userData);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/');
    } catch (error: any) {
      console.error(
        'Registration failed:',
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

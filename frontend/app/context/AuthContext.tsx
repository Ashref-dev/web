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
      const response = await api.post('/auth/login', userData);
      const user = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      console.error('Login error:', message);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await api.post('/auth/register', userData);
      const user = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      console.error('Registration error:', message);
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

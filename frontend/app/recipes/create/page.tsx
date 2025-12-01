'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { useRouter } from 'next/navigation';

const CreateRecipePage = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [photo, setPhoto] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        '/recipes',
        {
          title,
          ingredients: ingredients.split('\n').filter((i) => i.trim()),
          instructions,
          photo,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      router.push('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe');
    }
  };

  return (
    <Layout>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-black uppercase mb-8'>
          Create New Recipe
        </h1>
        <Card>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Input
              label='Recipe Title'
              placeholder='Delicious Pasta Carbonara'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className='flex flex-col gap-1'>
              <label className='font-bold text-sm uppercase tracking-wide'>
                Ingredients (one per line)
              </label>
              <textarea
                className='w-full border-[3px] border-black p-3 font-medium outline-none focus:shadow-neo transition-shadow bg-white min-h-[150px]'
                placeholder='100g pasta&#10;2 eggs&#10;50g parmesan cheese'
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold text-sm uppercase tracking-wide'>
                Instructions
              </label>
              <textarea
                className='w-full border-[3px] border-black p-3 font-medium outline-none focus:shadow-neo transition-shadow bg-white min-h-[200px]'
                placeholder='1. Boil water&#10;2. Cook pasta...'
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>

            <Input
              label='Photo URL'
              placeholder='https://example.com/image.jpg'
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />

            <div className='flex gap-2'>
              <Button type='submit' className='flex-grow'>
                Create Recipe
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push('/')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateRecipePage;

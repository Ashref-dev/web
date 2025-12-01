'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import { useRouter, useParams } from 'next/navigation';

const EditRecipePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [photo, setPhoto] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await api.get(`/api/recipes/${id}`);
        setTitle(data.title);
        setIngredients(data.ingredients.join('\n'));
        setInstructions(data.instructions);
        setPhoto(data.photo || '');
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(
        `/api/recipes/${id}`,
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
      router.push(`/recipes/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe');
    }
  };

  return (
    <Layout>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-black uppercase mb-8'>Edit Recipe</h1>
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
                Update Recipe
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push(`/recipes/${id}`)}
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

export default EditRecipePage;

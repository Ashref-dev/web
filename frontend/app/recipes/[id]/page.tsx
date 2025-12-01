'use client';

import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import Input from '../../components/ui/Input';
import Link from 'next/link';

interface Comment {
  _id: string;
  username: string;
  text: string;
  createdAt: string;
}

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  photo: string;
  user: {
    _id: string;
    username: string;
  };
  comments: Comment[];
}

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const fetchRecipe = async () => {
    try {
      const { data } = await api.get(`/recipes/${id}`);
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  useEffect(() => {
    if (id) fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        router.push('/');
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        `/recipes/${id}/comments`,
        { text: comment },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setComment('');
      fetchRecipe();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await api.put(
        `/users/favorites/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      alert('Updated favorites!');
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  if (!recipe)
    return (
      <Layout>
        <div className='max-w-4xl mx-auto space-y-8 animate-pulse'>
          {/* Title Skeleton */}
          <div className='h-12 bg-gray-200 border-4 border-black w-3/4' />
          
          {/* Image Skeleton */}
          <div className='w-full h-96 bg-gray-200 border-4 border-black flex items-center justify-center'>
            <span className='text-6xl'>🍳</span>
          </div>

          {/* Two Column Skeleton */}
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <div className='h-8 bg-gray-200 border-2 border-black w-1/2 mb-4' />
              <div className='space-y-3'>
                <div className='h-4 bg-gray-100 border-2 border-gray-300 w-full' />
                <div className='h-4 bg-gray-100 border-2 border-gray-300 w-5/6' />
                <div className='h-4 bg-gray-100 border-2 border-gray-300 w-4/5' />
              </div>
            </div>
            <div className='bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <div className='h-8 bg-gray-200 border-2 border-black w-1/2 mb-4' />
              <div className='space-y-3'>
                <div className='h-4 bg-gray-100 border-2 border-gray-300 w-full' />
                <div className='h-4 bg-gray-100 border-2 border-gray-300 w-full' />
                <div className='h-4 bg-gray-100 border-2 border-gray-300 w-3/4' />
              </div>
            </div>
          </div>

          {/* Comments Skeleton */}
          <div className='bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <div className='h-8 bg-gray-200 border-2 border-black w-1/3 mb-4' />
            <div className='h-20 bg-gray-100 border-2 border-gray-300 w-full' />
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div className='flex justify-between items-start'>
          <h1 className='text-4xl font-black uppercase'>{recipe.title}</h1>
          <div className='flex gap-2'>
            {user && (
              <Button variant='outline' onClick={handleAddToFavorites}>
                ♥ Favorite
              </Button>
            )}
            {user && user._id === recipe.user._id && (
              <>
                <Button
                  variant='secondary'
                  onClick={() => router.push(`/recipes/${id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant='primary'
                  className='bg-red-500 text-white border-red-700'
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {recipe.photo && (
          <img
            src={recipe.photo}
            alt={recipe.title}
            className='w-full h-96 object-cover border-[3px] border-black shadow-neo'
          />
        )}

        <div className='grid md:grid-cols-2 gap-8'>
          <Card>
            <h2 className='text-2xl font-black uppercase mb-4 border-b-[3px] border-black pb-2'>
              Ingredients
            </h2>
            <ul className='list-disc list-inside space-y-2 font-medium'>
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className='text-2xl font-black uppercase mb-4 border-b-[3px] border-black pb-2'>
              Instructions
            </h2>
            <p className='whitespace-pre-wrap font-medium leading-relaxed'>
              {recipe.instructions}
            </p>
          </Card>
        </div>

        <Card>
          <h2 className='text-2xl font-black uppercase mb-4 border-b-[3px] border-black pb-2'>
            Comments
          </h2>
          <div className='space-y-4 mb-6'>
            {recipe.comments.length === 0 && (
              <p className='text-gray-500 italic'>
                No comments yet. Be the first!
              </p>
            )}
            {recipe.comments.map((c) => (
              <div key={c._id} className='bg-gray-50 p-3 border-2 border-black'>
                <div className='flex justify-between items-center mb-1'>
                  <span className='font-bold'>{c.username}</span>
                  <span className='text-xs text-gray-500'>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{c.text}</p>
              </div>
            ))}
          </div>

          {user ? (
            <form onSubmit={handleCommentSubmit} className='flex gap-2'>
              <Input
                placeholder='Add a comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='flex-grow'
              />
              <Button type='submit'>Post</Button>
            </form>
          ) : (
            <p className='text-center font-bold'>
              <Link href='/login' className='underline'>
                Login
              </Link>{' '}
              to comment.
            </p>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default RecipeDetailPage;

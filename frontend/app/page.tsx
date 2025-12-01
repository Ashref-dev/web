'use client';

import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import api from './services/api';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';

interface Recipe {
  _id: string;
  title: string;
  photo: string;
  user: {
    username: string;
  };
  createdAt: string;
  ingredients: string[];
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const { user } = useAuth();

  const fetchRecipes = async (pageNumber = 1, searchKeyword = '') => {
    try {
      const { data } = await api.get(
        `/api/recipes?pageNumber=${pageNumber}&keyword=${searchKeyword}`
      );
      setRecipes(data.recipes);
      setPage(data.page);
      setPages(data.pages);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes(page, keyword);
  }, [page, keyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchRecipes(1, keyword);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className='mb-16 text-center search-hero relative'>
        <div className='brutalist-accents' aria-hidden>
          <div className='accent-rectangle pulse-slow' />
        </div>
        <div className='inline-block border-4 border-black bg-primary p-2 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
          <h1 className='text-6xl md:text-8xl font-black uppercase tracking-tighter m-0 p-4'>
            Recipe<span className='text-white'>Share</span>
          </h1>
        </div>
        <p className='text-xl md:text-2xl font-bold max-w-2xl mx-auto mb-8 leading-relaxed'>
          Discover, create, and share{' '}
          <span className='bg-primary px-2 py-1 border-2 border-black'>
            delicious recipes
          </span>{' '}
          with food lovers around the world
        </p>

        {user ? (
          <Link href='/recipes/create'>
            <Button className='text-lg px-8 py-4 neo-brutalist-button pulse-slow'>+ Create Your Recipe</Button>
          </Link>
        ) : (
          <div className='flex gap-4 justify-center flex-wrap search-cta'>
            <Link href='/register'>
              <Button className='text-lg px-8 py-4 neo-brutalist-button'>Join Now</Button>
            </Link>
            <Link href='/login'>
              <Button variant='outline' className='text-lg px-8 py-4'>
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Search Section (centered, interactive) */}
      <div className='mb-12 w-full'>
        <div className='max-w-5xl mx-auto'>
          <form
            onSubmit={handleSearch}
            className='search-input-wrapper mx-auto items-center justify-center'
          >
            <div className='search-logo-wrapper neo-brutalist-card wiggle-slow mr-4'>
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden>
                <path d='M11 5a6 6 0 100 12 6 6 0 000-12z' stroke='#000' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M21 21l-4.3-4.3' stroke='#000' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </div>
            <div style={{ width: '100%' }}>
              <div className='flex gap-3 items-center'>
                <Input
                  placeholder='Search for recipes — e.g., “Chocolate Cake”'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className='text-lg neo-brutalist-input'
                  aria-label='Search recipes'
                />
                <Button
                  type='submit'
                  variant='secondary'
                  className='neo-brutalist-button search-button-anim'
                >
                  <span className='mr-2'>🔍</span>
                  Search
                </Button>
              </div>
              <div className='mt-2 text-xs text-gray-600 text-center search-sublabel'>
                Filter by keyword, ingredients, or author — use the search above
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Bar */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
        <div className='border-4 border-black bg-white p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <div className='text-4xl font-black text-primary'>
            {recipes.length}
          </div>
          <div className='text-sm font-bold uppercase tracking-wide mt-1'>
            Recipes Today
          </div>
        </div>
        <div className='border-4 border-black bg-primary p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <div className='text-4xl font-black'>∞</div>
          <div className='text-sm font-bold uppercase tracking-wide mt-1'>
            Possibilities
          </div>
        </div>
        <div className='border-4 border-black bg-white p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          <div className='text-4xl font-black text-primary'>100%</div>
          <div className='text-sm font-bold uppercase tracking-wide mt-1'>
            Delicious
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-4xl font-black uppercase border-b-4 border-black inline-block pb-2'>
          Latest Recipes
        </h2>
      </div>

      {/* Recipe Grid */}
      {recipes.length === 0 ? (
        <div className='text-center py-20'>
          <div className='inline-block border-4 border-black bg-white p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'>
            <p className='text-2xl font-black uppercase mb-4'>
              No Recipes Yet!
            </p>
            <p className='text-lg font-medium mb-6'>
              Be the first to share a delicious recipe
            </p>
            {user && (
              <Link href='/recipes/create'>
                <Button>Create First Recipe</Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {recipes.map((recipe) => (
            <Link href={`/recipes/${recipe._id}`} key={recipe._id}>
              <div className='group'>
                <Card className='h-full flex flex-col gap-4 hover:bg-yellow-50 transition-all cursor-pointer hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                  {recipe.photo ? (
                    <div className='relative overflow-hidden border-3 border-black'>
                      <img
                        src={recipe.photo}
                        alt={recipe.title}
                        className='w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  ) : (
                    <div className='w-full h-56 bg-linear-to-br from-gray-100 to-gray-200 border-3 border-black flex items-center justify-center'>
                      <span className='text-6xl'>🍳</span>
                    </div>
                  )}
                  <div className='flex-1 flex flex-col gap-2'>
                    <h3 className='text-2xl font-black uppercase leading-tight group-hover:text-primary transition-colors'>
                      {recipe.title}
                    </h3>
                    <div className='flex items-center gap-2 text-sm font-bold'>
                      <span className='bg-black text-primary px-2 py-1 uppercase text-xs'>
                        By {recipe.user?.username || 'Unknown'}
                      </span>
                      {recipe.ingredients && (
                        <span className='text-gray-600'>
                          {recipe.ingredients.length} ingredients
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className='flex justify-center gap-3 mt-12 flex-wrap'>
          {[...Array(pages).keys()].map((x) => (
            <Button
              key={x + 1}
              variant={x + 1 === page ? 'primary' : 'outline'}
              onClick={() => setPage(x + 1)}
              className='min-w-[50px]'
            >
              {x + 1}
            </Button>
          ))}
        </div>
      )}
    </Layout>
  );
}

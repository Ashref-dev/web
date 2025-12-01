'use client';

import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
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
        `/recipes?pageNumber=${pageNumber}&keyword=${searchKeyword}`
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
      <div className='mb-16 text-center relative'>
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
            <Button className='text-lg px-8 py-4 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200'>+ Create Your Recipe</Button>
          </Link>
        ) : (
          <div className='flex gap-4 justify-center flex-wrap'>
            <Link href='/register'>
              <Button className='text-lg px-8 py-4 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200'>Join Now</Button>
            </Link>
            <Link href='/login'>
              <Button variant='outline' className='text-lg px-8 py-4 hover:-translate-y-1 hover:bg-gray-50 transition-all duration-200'>
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Search Section (centered, interactive) */}
      <div className='mb-12 w-full px-4'>
        <div className='max-w-3xl mx-auto'>
          <form onSubmit={handleSearch}>
            <div className='flex items-stretch bg-white border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <div className='flex items-center justify-center px-4 bg-primary border-r-4 border-black flex-shrink-0'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </div>
              <input
                type='text'
                placeholder='Search recipes... e.g., "Pasta Carbonara"'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='flex-1 px-4 py-4 text-lg font-medium placeholder:text-gray-400 focus:outline-none bg-transparent'
                aria-label='Search recipes'
              />
              <button
                type='submit'
                className='px-6 py-4 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150 flex-shrink-0'
              >
                Search
              </button>
            </div>
            <p className='text-center text-sm text-gray-600 font-medium mt-2'>
              Try searching by recipe name, ingredient, or chef
            </p>
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

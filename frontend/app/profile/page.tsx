'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Link from 'next/link';

interface Recipe {
  _id: string;
  title: string;
  photo: string;
}

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className='text-center'>
          <h1 className='text-4xl font-black uppercase mb-4'>Please Login</h1>
          <Link href='/login'>
            <Button>Go to Login</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='max-w-4xl mx-auto space-y-8'>
        <h1 className='text-4xl font-black uppercase'>My Profile</h1>

        <Card>
          <h2 className='text-2xl font-black uppercase mb-4 border-b-[3px] border-black pb-2'>
            Account Info
          </h2>
          <div className='space-y-2'>
            <p className='font-bold'>
              Username: <span className='font-medium'>{user.username}</span>
            </p>
            <p className='font-bold'>
              Email: <span className='font-medium'>{user.email}</span>
            </p>
          </div>
          <div className='mt-6'>
            <Button variant='secondary' onClick={logout}>
              Logout
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className='text-2xl font-black uppercase mb-4 border-b-[3px] border-black pb-2'>
            My Favorites
          </h2>
          {favorites.length === 0 ? (
            <p className='text-gray-500 italic'>
              No favorites yet. Start exploring recipes!
            </p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {favorites.map((recipe) => (
                <Link href={`/recipes/${recipe._id}`} key={recipe._id}>
                  <Card className='h-full hover:bg-yellow-50 transition-colors cursor-pointer'>
                    {recipe.photo ? (
                      <img
                        src={recipe.photo}
                        alt={recipe.title}
                        className='w-full h-32 object-cover border-[3px] border-black mb-2'
                      />
                    ) : (
                      <div className='w-full h-32 bg-gray-200 border-[3px] border-black flex items-center justify-center font-bold text-gray-400 uppercase mb-2'>
                        No Photo
                      </div>
                    )}
                    <h3 className='text-lg font-black uppercase truncate'>
                      {recipe.title}
                    </h3>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;

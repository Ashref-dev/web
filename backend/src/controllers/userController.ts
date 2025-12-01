import { Response } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';
import mongoose from 'mongoose';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        favorites: user.favorites,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add/Remove favorite
// @route   PUT /api/users/favorites/:id
// @access  Private
export const toggleFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = new mongoose.Types.ObjectId(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites || [];
    const isFavorited = user.favorites.some((id) => id.toString() === recipeId.toString());

    if (isFavorited) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== recipeId.toString()
      );
      await user.save();
      return res.json({
        message: 'Recipe removed from favorites',
        favorites: user.favorites,
      });
    } else {
      user.favorites.push(recipeId);
      await user.save();
      return res.json({
        message: 'Recipe added to favorites',
        favorites: user.favorites,
      });
    }
  } catch (error: any) {
    console.error('Error toggling favorite:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

import { Response } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

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
    const recipeId = req.params.id;

    if (user) {
      if (user.favorites.includes(recipeId as any)) {
        user.favorites = user.favorites.filter(
          (id) => id.toString() !== recipeId
        );
        await user.save();
        res.json({
          message: 'Recipe removed from favorites',
          favorites: user.favorites,
        });
      } else {
        user.favorites.push(recipeId as any);
        await user.save();
        res.json({
          message: 'Recipe added to favorites',
          favorites: user.favorites,
        });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

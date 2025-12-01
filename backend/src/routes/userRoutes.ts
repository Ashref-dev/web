import express from 'express';
import { getUserProfile, toggleFavorite } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/favorites/:id', protect, toggleFavorite);

export default router;

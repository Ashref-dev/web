import express from 'express';
import {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    createRecipeComment,
} from '../controllers/recipeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getRecipes).post(protect, createRecipe);
router
  .route('/:id')
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);
router.route('/:id/comments').post(protect, createRecipeComment);

export default router;

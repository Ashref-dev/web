import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
export const getRecipes = async (req: Request, res: Response) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword as string,
            $options: 'i',
          },
        }
      : {};

    const count = await Recipe.countDocuments({ ...keyword });
    const recipes = await Recipe.find({ ...keyword })
      .populate('user', 'username email')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      'user',
      'username email'
    );

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create new review
// @route   POST /api/recipes/:id/reviews
// @access  Private
export const createRecipeComment = async (req: AuthRequest, res: Response) => {
  const { text } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const comment = {
      user: req.user.id,
      username: req.user.username,
      text,
      createdAt: new Date(),
    };

    recipe.comments.push(comment);
    await recipe.save();
    
    res.status(201).json({ message: 'Comment added', comment });
  } catch (error: any) {
    console.error('Error creating comment:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private
export const createRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { title, ingredients, instructions, photo } = req.body;

    const recipe = new Recipe({
      user: req.user.id,
      title,
      ingredients,
      instructions,
      photo,
    });

    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private
export const updateRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { title, ingredients, instructions, photo } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      if (recipe.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      recipe.title = title || recipe.title;
      recipe.ingredients = ingredients || recipe.ingredients;
      recipe.instructions = instructions || recipe.instructions;
      recipe.photo = photo || recipe.photo;

      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      if (recipe.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await recipe.deleteOne();
      res.json({ message: 'Recipe removed' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

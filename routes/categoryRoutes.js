// categoryRoutes.js
import express from 'express';
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController.js';

const router = express.Router();

// Routes for categories
router.get('/', getCategories); // Get all categories
router.get('/:id', getCategory); // Get category by ID
router.post('/', createCategory); // Create new category
router.put('/:id', updateCategory); // Update category
router.delete('/:id', deleteCategory); // Delete category

export default router;

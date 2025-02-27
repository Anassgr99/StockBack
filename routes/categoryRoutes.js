// categoryRoutes.js
import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

// Routes for categories
router.get('/', categoryController.getCategories); // Get all categories
router.get('/:id', categoryController.getCategory); // Get category by ID
router.post('/', categoryController.createCategory); // Create new category
router.put('/:id', categoryController.updateCategory); // Update category
router.delete('/:id', categoryController.deleteCategory); // Delete category

export default router;

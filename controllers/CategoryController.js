// categoryController.js
import * as categoryModel from '../models/categoryModel.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get category by ID
export const getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryModel.getCategoryById(id); // This returns an object
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  const { name, slug, icon } = req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  try {
      const categoryId = await categoryModel.createCategory({ name, slug, icon, created_at: timestamp, updated_at: timestamp });
      res.status(201).json({ message: 'Category created', categoryId });
  } catch (error) {
      res.status(500).json({ error: 'Failed to create category' });
  }
};




// Update an existing category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, icon } = req.body;

  try {
    const result = await categoryModel.updateCategory(id, { name, slug, icon }); // No destructuring here
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ id, name, slug, icon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
};


// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await categoryModel.deleteCategory(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

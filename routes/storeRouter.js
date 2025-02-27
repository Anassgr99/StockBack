import express from 'express';
import { createNewStore, fetchAllStores, fetchStoreById, updateExistingStore, deleteExistingStore } from '../controllers/storeController.js';

const router = express.Router();

// Add a new store
router.post('/', createNewStore);

// Get all stores
router.get('/', fetchAllStores);

// Get a store by ID
router.get('/:id', fetchStoreById);

// Update a store by ID
router.put('/:id', updateExistingStore);

// Delete a store by ID
router.delete('/:id', deleteExistingStore);

export default router;

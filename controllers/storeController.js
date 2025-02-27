import { getAllStores, getStoreById, createStore, updateStore, deleteStore } from '../models/storeModel.js';

// Get all stores
export const fetchAllStores = async (req, res) => {
    try {
        const stores = await getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve stores' });
    }
};

// Get store by ID
export const fetchStoreById = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await getStoreById(id);
        if (!store) return res.status(404).json({ error: 'Store not found' });
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve store' });
    }
};

// Create a new store
export const createNewStore = async (req, res) => {
    const storeData = req.body;
    try {
        const storeId = await createStore(storeData);
        res.status(201).json({ message: 'Store created', storeId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create store' });
    }
};

// Update an existing store
export const updateExistingStore = async (req, res) => {
    const { id } = req.params;
    const storeData = req.body;
    try {
        const affectedRows = await updateStore(id, storeData);
        if (affectedRows === 0) return res.status(404).json({ error: 'Store not found' });
        res.status(200).json({ message: 'Store updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update store' });
    }
};

// Delete a store
export const deleteExistingStore = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteStore(id);
        if (affectedRows === 0) return res.status(404).json({ error: 'Store not found' });
        res.status(200).json({ message: 'Store deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete store' });
    }
};

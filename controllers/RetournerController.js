import { getAllRetourner, createRetourner } from '../models/retournerModel.js';

// Get all return entries
export const getAllReturnEntries = async (req, res) => {
  try {
    const returnData = await getAllRetourner();
    res.status(200).json({ data: returnData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch returns', message: error.message });
  }
};

// Create a new return entry
export const createRetournerEntries = async (req, res) => {
  try {
    const returnData = req.body; // Extract data from request body
    if (!returnData || !returnData.name_produit || !returnData.name_user) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await createRetourner(returnData); // Pass the data to the model function
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create return entry', message: error.message });
  }
};

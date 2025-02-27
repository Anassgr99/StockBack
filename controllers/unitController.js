// unitController.js
import { getAllUnit, getUnitById, createUnit, updateUnit, deleteUnit } from '../models/unitModel.js';

// Get all units
export const getAllUnits = async (req, res) => {
  try {
    const units = await getAllUnit();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: `Error fetching units: ${error.message}` });
  }
};

// Get unit by ID
export const getUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await getUnitById(id);
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: `Error fetching unit: ${error.message}` });
  }
};

// Create a new unit
export const createNewUnit = async (req, res) => {
  const { name, slug, short_code } = req.body;

  if (!name || !slug || !short_code) {
    return res.status(400).json({ message: 'Missing required fields: name, slug, and short_code' });
  }

  const unitData = { name, slug, short_code };

  try {
    const result = await createUnit(unitData);
    res.status(201).json({ message: 'Unit created successfully', result });
  } catch (error) {
    res.status(500).json({ message: `Error creating unit: ${error.message}` });
  }
};

// Update a unit
export const updateUnitInfo = async (req, res) => {
  const { id } = req.params;
  const { name, slug, short_code } = req.body;

  if (!name || !slug || !short_code) {
    return res.status(400).json({ message: 'Missing required fields: name, slug, and short_code' });
  }

  const unitData = { name, slug, short_code };

  try {
    const result = await updateUnit(id, unitData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.status(200).json({ message: 'Unit updated successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error updating unit: ${error.message}` });
  }
};

// Delete a unit
export const deleteUnitInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUnit(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.status(200).json({ message: 'Unit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting unit: ${error.message}` });
  }
};

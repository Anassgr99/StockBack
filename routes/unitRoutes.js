// unitRoutes.js
import express from 'express';
import { 
  getAllUnits, 
  getUnit, 
  createNewUnit, 
  updateUnitInfo, 
  deleteUnitInfo 
} from '../controllers/unitController.js';

const router = express.Router();

// Get all units
router.get('/unit', getAllUnits);

// Get a unit by ID
router.get('/unit/:id', getUnit);

// Create a new unit
router.post('/unit', createNewUnit);

// Update a unit by ID
router.put('/unit/:id', updateUnitInfo);

// Delete a unit by ID
router.delete('/unit/:id', deleteUnitInfo);

export default router;

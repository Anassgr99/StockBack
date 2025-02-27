import express from 'express';
import { createRetournerEntries, getAllReturnEntries } from '../controllers/RetournerController.js';

const router = express.Router();

router.post('/', createRetournerEntries);
router.get('/', getAllReturnEntries);

export default router;

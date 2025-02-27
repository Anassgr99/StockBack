import express from 'express';
import {
    fetchAllOrders,
    fetchOrderById,
    createNewOrder,
    updateExistingOrder,
    deleteExistingOrder,
    
} from '../controllers/orderController.js';

const router = express.Router();

// Get all orders
router.get('/', fetchAllOrders);

// Get order by ID
router.get('/:id', fetchOrderById);

// Create a new order
router.post('/', createNewOrder);

// Update an order
router.put('/:id', updateExistingOrder);

// Delete an order
router.delete('/:id', deleteExistingOrder)



export default router;

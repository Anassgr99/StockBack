import express from 'express';
import {
    fetchAllCustomers,
    fetchCustomerById,
    createNewCustomer,
    updateExistingCustomer,
    deleteExistingCustomer,
} from '../controllers/customerController.js';

const router = express.Router();

// Route to get all customers
router.get('/customers', fetchAllCustomers);

// Route to get a specific customer by ID
router.get('/customers/:id', fetchCustomerById);

// Route to create a new customer
router.post('/customers', createNewCustomer);

// Route to update an existing customer by ID
router.put('/customers/:id', updateExistingCustomer);

// Route to delete a customer by ID
router.delete('/customers/:id', deleteExistingCustomer);

export default router;

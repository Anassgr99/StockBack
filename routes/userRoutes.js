import express from 'express';
import { 
    fetchAllUsers, 
    fetchUserById, 
    createNewUser, 
    updateExistingUser, 
    deleteExistingUser,
    loginUser
} from '../controllers/userController.js';

const router = express.Router();

// Define user routes
router.get('/users', fetchAllUsers);
router.get('/users/:id', fetchUserById);
router.post('/users', createNewUser);
router.put('/users/:id', updateExistingUser);
router.delete('/users/:id', deleteExistingUser);
router.delete('/users/:id', deleteExistingUser);
router.post('/login', loginUser);

export default router;

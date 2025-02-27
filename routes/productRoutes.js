import express from 'express';
import { fetchAllProducts, fetchProductById, createNewProduct,fetchStockQuantitiesByid, updateExistingProduct, deleteExistingProduct, getUnitController, getProductsByCategory, fetchStockQuantities } from '../controllers/productController.js';


const router = express.Router();

// Define product routes
router.get('/products', fetchAllProducts);
router.get('/products/:id', fetchProductById);
router.post('/products', createNewProduct);
router.put('/products/:id', updateExistingProduct);
router.delete('/products/:id', deleteExistingProduct);
router.get('/units/:id', getUnitController);
router.get('/productsC/:categoryId', getProductsByCategory);
router.get('/getStockQuantities', fetchStockQuantities);
router.get('/getStockQuantitiesByid/:id', fetchStockQuantitiesByid);
export default router;

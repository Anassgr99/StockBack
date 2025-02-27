import express from 'express';
import {addProductToStore,getStoreProducts,getALLStoreProducts} from '../controllers/storeProductController.js';

const router = express.Router();

// إضافة منتج إلى متجر معين
router.post('/add', addProductToStore);

// جلب المنتجات في متجر معين
router.get('/', getALLStoreProducts);
router.get('/:storeId', getStoreProducts);

export default router;

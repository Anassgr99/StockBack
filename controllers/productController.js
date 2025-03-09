import { getAllProducts, getProductById, createProduct, updateProduct,getStockQuantities,getStockQuantitiesById, deleteProduct, getUnit,getProductsByCategoryId } from '../models/productModel.js';

// Get all products
export const fetchAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

// Get product by ID
export const fetchProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};

// Create a new product
export const createNewProduct = async (req, res) => {
    const productData = req.body;
    try {
        const productId = await createProduct(productData);
        res.status(201).json({ message: 'Product created', productId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Update an existing product
export const updateExistingProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    try {
        const affectedRows = await updateProduct(id, productData);
        if (affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a product
export const deleteExistingProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteProduct(id);
        if (affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

// Import the required service function

// Define the controller function
export const getUnitController = async (req, res) => {
    try {
        // Extract the `id` from the request parameters
        const { id } = req.params;

        // Validate the input
        if (!id) {
            return res.status(400).json({ error: 'Unit ID is required.' });
        }

        // Fetch unit details using the service function
        const unit = await getUnit(id);

        // Check if the unit exists
        if (!unit || unit.length === 0) {
            return res.status(404).json({ message: 'Unit not found.' });
        }

        // Return the unit data
        return res.status(200).json(unit);
    } catch (error) {
        console.error('Error in getUnitController:', error);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
};
export const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const products = await getProductsByCategoryId(categoryId);

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category.' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products by category:', error.message);
        res.status(500).json({ message: 'Error retrieving products by category.' });
    }
};


// Controller to handle fetching stock quantities
export const fetchStockQuantities = async (req, res) => {
    try {
        const stockQuantities = await getStockQuantities();

        // Send the formatted stock quantities as a response
        res.status(200).json(stockQuantities);
    } catch (error) {
        console.error("Error fetching stock quantities:", error.message);
        res.status(500).json({
            message: "Error fetching stock quantities",
            error: error.message,
        });
    }
};
export const fetchStockQuantitiesByid = async (req, res) => {
    try {
        // Extract store ID from route parameters
        const storeId = req.params.id;
        

        // Call the database function with the storeId
        const stockQuantities = await getStockQuantitiesById(storeId);

        // Send the formatted stock quantities as a response
        res.status(200).json(stockQuantities);
    } catch (error) {
        console.error("Error fetching stock quantities:", error.message);
        res.status(500).json({
            message: "Error fetching stock quantities",
            error: error.message,
        });
    }
};


// import db from "../config/db.js";

// /**
//  * Inserts a product into the database.
//  * @param {Object} productData - Object containing product data.
//  * @returns {Promise} - Resolves with the database result or rejects with an error.
//  */
// export const insertProduct = (productData) => {
//   return new Promise((resolve, reject) => {
//     const insertQuery = `
//       INSERT INTO products 
//       (name, slug, code, quantity, buying_price, selling_price, quantity_alert, tax, tax_type, notes, product_image, category_id, unit_id, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
//     `;

//     // Destructure the values from productData. Adjust keys as needed.
//     const {
//       name,
//       slug,
//       code,
//       quantity,
//       buying_price,
//       selling_price,
//       quantity_alert,
//       tax,
//       tax_type,
//       notes,
//       product_image,
//       category_id,
//       unit_id,
//     } = productData;

//     db.query(
//       insertQuery,
//       [
//         name,
//         slug,
//         code,
//         quantity,
//         buying_price,
//         selling_price,
//         quantity_alert,
//         tax,
//         tax_type,
//         notes,
//         product_image,
//         category_id,
//         unit_id,
//       ],
//       (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(result);
//       }
//     );
//   });
// };





// import db from "../config/db.js";

// /**
//  * Inserts a product into the database.
//  * @param {Object} productData - Object containing product data.
//  * @returns {Promise} - Resolves with the database result or rejects with an error.
//  */
// export const insertProduct = (productData) => {
//   return new Promise((resolve, reject) => {
//     const insertQuery = `
//       INSERT INTO products 
//       (name, slug, code, quantity, buying_price, selling_price, quantity_alert, tax, tax_type, notes, product_image, category_id, unit_id, created_at, updated_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
//     `;

//     // Extract the values coming from the Excel file
//     const {
//       name,
//       slug,
//       code,
//       quantity,
//       buying_price,
//       selling_price,
//       quantity_alert,
//       notes,
//       category_id,
//     } = productData;

//     // Default values for columns not provided by the Excel file
//     const tax = 0;
//     const tax_type = 0;
//     const product_image = "";
//     const unit_id = 2;

//     db.query(
//       insertQuery,
//       [
//         name,
//         slug,
//         code,
//         quantity,
//         buying_price,
//         selling_price,
//         quantity_alert,
//         tax,
//         tax_type,
//         notes,
//         product_image,
//         category_id,
//         unit_id,
//       ],
//       (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(result);
//       }
//     );
//   });
// };


import db from "../config/db.js";

/**
 * Creates a new product and inserts corresponding store_product records for all stores.
 * For the store with id = 1, uses the provided product quantity; for all other stores, sets quantity to 0.
 * @param {Object} productData - Object containing product data.
 * @returns {Promise} - Resolves with the product insertion result after store_product records are created.
 */
export const createProductWithStores = (productData) => {
  return new Promise((resolve, reject) => {
    // Insert product into the products table
    const insertQuery = `
      INSERT INTO products 
      (name, slug, code, quantity, buying_price, selling_price, quantity_alert, tax, tax_type, notes, product_image, category_id, unit_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    // Extract product values and provide defaults for unspecified fields
    const {
      name,
      slug,
      code,
      quantity,
      buying_price,
      selling_price,
      quantity_alert,
      notes,
      category_id,
    } = productData;
    const tax = 0;
    const tax_type = 0;
    const product_image = "";
    const unit_id = 2;
    
    db.query(
      insertQuery,
      [
        name,
        slug,
        code,
        quantity,
        buying_price,
        selling_price,
        quantity_alert,
        tax,
        tax_type,
        notes,
        product_image,
        category_id,
        unit_id,
      ],
      (err, result) => {
        if (err) return reject(err);
        const productId = result.insertId;
        
        // After the product is created, get all stores
        const getStoresQuery = `SELECT id FROM stores`;
        db.query(getStoresQuery, (err, stores) => {
          if (err) return reject(err);
          
          // For each store, create a store_product record.
          // For store with id=1, use the productData.quantity; for all others, set quantity to 0.
          const insertPromises = stores.map((store) => {
            const storeQuantity = (store.id === 1) ? quantity : 0;
            const insertStoreProductQuery = `
              INSERT INTO store_product (store_id, product_id, quantity)
              VALUES (?, ?, ?)
            `;
            return new Promise((resolve, reject) => {
              db.query(
                insertStoreProductQuery,
                [store.id, productId, storeQuantity],
                (err, res) => {
                  if (err) {
                    console.error(`Error inserting store_product for store ${store.id}:`, err);
                    return reject(err);
                  }
                  resolve(res);
                }
              );
            });
          });
          
          // Wait for all store_product records to be inserted
          Promise.all(insertPromises)
            .then(() => resolve(result))
            .catch((error) => reject(error));
        });
      }
    );
  });
};

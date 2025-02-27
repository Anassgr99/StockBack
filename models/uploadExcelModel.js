import db from "../config/db.js";

/**
 * Inserts a product into the database.
 * @param {Object} productData - Object containing product data.
 * @returns {Promise} - Resolves with the database result or rejects with an error.
 */
export const insertProduct = (productData) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO products 
      (name, slug, code, quantity, buying_price, selling_price, quantity_alert, tax, tax_type, notes, product_image, category_id, unit_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    // Destructure the values from productData. Adjust keys as needed.
    const {
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
    } = productData;

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
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

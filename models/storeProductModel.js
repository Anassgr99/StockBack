import db from "../config/db.js";

// Function to add a product to a store
export const addProductToStore = (storeId, productId, userQuantity) => {
  return new Promise((resolve, reject) => {
    const fetchQuery = `
      SELECT quantity FROM store_product 
      WHERE store_id = 1 AND product_id = ?;
    `;

    db.query(fetchQuery, [productId], (fetchErr, fetchResults) => {
      if (fetchErr) {
        return reject(fetchErr);
      }

      const store1Quantity = fetchResults[0]?.quantity || 0; // Quantity in store_id = 1

      if (storeId === 1) {
        // Case 1: If store_id = 1, check if the pair exists
        const checkPairQuery = `
          SELECT * FROM store_product 
          WHERE store_id = ? AND product_id = ?;
        `;

        db.query(
          checkPairQuery,
          [storeId, productId],
          (checkErr, checkResults) => {
            if (checkErr) {
              return reject(checkErr);
            }

            if (checkResults.length > 0) {
              // If the pair exists, update the quantity
              const updateQuery = `
              UPDATE store_product 
              SET quantity = quantity + ?
              WHERE store_id = ? AND product_id = ?;
            `;

              db.query(
                updateQuery,
                [userQuantity, storeId, productId],
                (updateErr, updateResults) => {
                  if (updateErr) reject(updateErr);
                  else resolve(updateResults);
                }
              );
            } else {
              // If the pair does not exist, insert a new record
              const insertQuery = `
              INSERT INTO store_product (store_id, product_id, quantity)
              VALUES (?, ?, ?);
            `;

              db.query(
                insertQuery,
                [storeId, productId, userQuantity],
                (insertErr, insertResults) => {
                  if (insertErr) reject(insertErr);
                  else resolve(insertResults);
                }
              );
            }
          }
        );
      } else {
        // Case 2: If store_id != 1, check the quantity condition

        if (userQuantity < store1Quantity) {
          // Check if the id_product and id_store pair exists
          const checkPairQuery = `
            SELECT * FROM store_product 
            WHERE store_id = ? AND product_id = ?;
          `;

          db.query(
            checkPairQuery,
            [storeId, productId],
            (checkErr, checkResults) => {
              if (checkErr) {
                return reject(checkErr);
              }

              if (checkResults.length > 0) {
                // If the pair exists, update the quantity
                const updateQuery = `
                  UPDATE store_product
                  SET quantity = CASE
                    WHEN store_id = 1 THEN quantity - ?
                    WHEN store_id = ? THEN quantity + ?
                  END
                  WHERE product_id = ? AND (store_id = 1 OR store_id = ?);
              `;

                db.query(
                  updateQuery,
                  [userQuantity, storeId, userQuantity, productId, storeId],
                  (updateErr, updateResults) => {
                    if (updateErr) reject(updateErr);
                    else resolve(updateResults);
                  }
                );
              } else {
                // If the pair does not exist, insert a new record
                const insertQuery = `
                INSERT INTO store_product (store_id, product_id, quantity)
                VALUES (?, ?, ?);
              `;

                db.query(
                  insertQuery,
                  [storeId, productId, userQuantity],
                  (insertErr, insertResults) => {
                    if (insertErr) reject(insertErr);
                    else resolve(insertResults);
                  }
                );
              }
            }
          );
        } else {
          // If user's quantity is not greater, reject the operation
          reject({
            response: {
              status: 400,
              data: {
                message: "Quantity from user must be greater than quantity in store_id = 1."
              }
            }
          });          
        }
      }
    });
  });
};

export const getStoreProducts = (storeId) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT p.name AS product_name, sp.quantity
        FROM store_product sp
        JOIN products p ON sp.product_id = p.id
        WHERE sp.product_id = ?;
      `;
    db.query(query, [storeId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
export const getAllStoreProductsModel = (storeId) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT 
        sp.id,
        sp.store_id,
        sp.product_id,
        sp.quantity,
        p.quantity_alert,
        sp.created_at,
        sp.updated_at,
        p.name AS product_name,
        s.store_name
      FROM store_product sp
      JOIN products p ON sp.product_id = p.id
      JOIN stores s ON sp.store_id = s.id;
      `;
    db.query(query, [storeId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

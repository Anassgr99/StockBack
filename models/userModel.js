import db from "../config/db.js";

// Get all users
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";

    db.query(query, (err, results) => {
      if (err) return reject(err);

      // Map the results and structure role as an object
      const parsedResults = results.map((user) => ({
        ...user,
        role: {
          id: user.role_id,
          name: user.role_name,
        },
      }));

      // Clean up the additional fields used for mapping
      parsedResults.forEach((user) => {
        delete user.role_id;
        delete user.role_name;
      });

      resolve(parsedResults);
    });
  });
};

// Get user by ID
export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
           SELECT * FROM users WHERE id = ?;
        `;
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]); // Resolve with the first user result
    });
  });
};

// Create a new user
export const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const query = `
           INSERT INTO users (name, username, email, password, email_verified_at, remember_token, photo)
VALUES (?, ?, ?, ?, ?, ?, ?);

        `;
    db.query(query, Object.values(userData), (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId); // Return the inserted user ID
    });
  });
};

// Update a user
export const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    const query = `
            UPDATE users 
            SET username = ?, email = ?, password = ?, role_id = ? 
            WHERE id = ?
        `;
    db.query(query, [...Object.values(userData), id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows); // Return affected rows
    });
  });
};

// Delete a user
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows); // Return affected rows
    });
  });
};
// Get user by email (only email and password)
export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT email, password, isAdmin, store,name
        FROM users
        WHERE email = ?;
      `;
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      if (results.length > 0) {
        resolve(results[0]); // Resolve with the user (email, password, isAdmin)
      } else {
        resolve(null); // Return null if no user is found
      }
    });
  });
};

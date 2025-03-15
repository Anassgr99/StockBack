import { getAllUsers, getUserById, createUser, updateUser, deleteUser,getUserByEmail } from '../models/userModel.js';
import { generateToken } from '../config/jwtUtils.js'; // Import generateToken function
import bcrypt from "bcrypt";

// Get all users
export const fetchAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

// Get user by ID
export const fetchUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

// Create a new user
export const createNewUser = async (req, res) => {
    const userData = req.body;
    try {
        const userId = await createUser(userData);
        res.status(201).json({ message: 'User created', userId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Update an existing user
export const updateExistingUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const affectedRows = await updateUser(id, userData);
        if (affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete a user
export const deleteExistingUser = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await deleteUser(id);
        if (affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required' });
//     }

//     try {
//         // Get user from the database by email
//         const user = await getUserByEmail(email);

//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Check if password matches using bcrypt
    

//         // Generate JWT token
//         const token = generateToken(user.id, user.isAdmin, user.store); // Generate the token

//         // Send response with the token
//         res.status(200).json({
//             message: 'Login successful',
//             token: token, // Include the token in the response
//             user: {
//                 email: user.email,
//                 isAdmin: user.isAdmin,
//                 store: user.store,
//                 name: user.name,
//             },
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
  


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = generateToken(user.id, user.isAdmin, user.store);

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                email: user.email,
                isAdmin: user.isAdmin,
                store: user.store,
                name: user.name,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import unitRoutes from "./routes/unitRoutes.js";
// import orderRouter from "./routes/orderRouter.js";
// import userRoutes from "./routes/userRoutes.js";
// import customerRoutes from "./routes/customerRoutes.js";
// import storeProductRoutes from "./routes/storeProductRoutes.js";
// import storesRoutes from "./routes/storeRouter.js";
// import ReturnsRoutes from "./routes/RetournerRoutes.js";
// import uploadExcelRoutes from "./routes/uploadExcelRoutes.js";

// dotenv.config(); // Load environment variables

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json()); // To parse JSON body

// // Add CORS middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from the frontend
//   })
// );
// // Use routes
// app.use("/api", productRoutes);
// app.use("/api", unitRoutes);
// app.use("/api/categorys", categoryRoutes);
// app.use("/api/orders", orderRouter);
// app.use("/api", userRoutes);
// app.use("/api", customerRoutes);
// app.use("/api/store-products", storeProductRoutes);
// app.use("/api/stores", storesRoutes);
// app.use("/api/returns", ReturnsRoutes);
// app.use("/api/", uploadExcelRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import userRoutes from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import storeProductRoutes from "./routes/storeProductRoutes.js";
import storesRoutes from "./routes/storeRouter.js";
import ReturnsRoutes from "./routes/RetournerRoutes.js";
import uploadExcelRoutes from "./routes/uploadExcelRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // To parse JSON body

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://:5173",
  })
);

// Serve static files from /front/public/images
app.use("/images", express.static(path.join(__dirname, "../../front/public/images")));

// Use routes
app.use("/api", productRoutes);
app.use("/api", unitRoutes);
app.use("/api/categorys", categoryRoutes);
app.use("/api/orders", orderRouter);
app.use("/api", userRoutes);
app.use("/api", customerRoutes);
app.use("/api/store-products", storeProductRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/returns", ReturnsRoutes);
app.use("/api/", uploadExcelRoutes);
app.use("/api", uploadRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



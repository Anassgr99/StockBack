import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit"; // Import du middleware de limitation de requêtes

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
import { verifyToken } from "./config/jwtUtils.js";

dotenv.config(); // Chargement des variables d'environnement

const app = express();
const PORT = process.env.PORT || 3000;

// Fix pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware de limitation de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 900, // 100 requêtes par IP pendant la période définie
  message: "Trop de requêtes effectuées depuis cette adresse IP, veuillez réessayer plus tard.",
});

app.use(express.json()); // Pour parser les corps JSON
app.use(limiter); // Appliquer la limitation de requêtes à toutes les routes

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Servir les fichiers statiques depuis /front/public/images
app.use("/images", express.static(path.join(__dirname, "../../front/public/images")));

// Définition des routes
// app.use("/", verifyToken);
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

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});

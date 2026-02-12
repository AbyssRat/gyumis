import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import fruitRoutes from "./routes/fruitRoutes.js";
import arrivalsRoutes from "./routes/arrivalsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fruit", fruitRoutes);
app.use("/api/arrivals", arrivalsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`); });

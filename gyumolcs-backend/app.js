import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import fruitRoutes from "./routes/fruitRoutes.js";
import arrivalsRoutes from "./routes/arrivalsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// GET /fruits – Az összes gyümölcs lekérdezése. 
// GET /fruits/:id – Egy adott gyümölcs lekérdezése ID alapján. 
// POST /fruits – Új gyümölcs hozzáadása. 
// PUT /fruits/:id – Egy meglévő gyümölcs adatainak frissítése. 
// DELETE /fruits/:id – Egy gyümölcs törlése. 

app.use("/fruits", fruitRoutes);
app.use("/arrivals", arrivalsRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`); });

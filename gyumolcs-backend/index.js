import express from "express";
import cors from "cors";
import { db } from "./db.js";

import gyumolcsRoutes from "./routes/gyumolcsRoutes.js";
import arrivalRoutes from "./routes/arrivalRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/gyumolcs", gyumolcsRoutes);
app.use("/erkezes", arrivalRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

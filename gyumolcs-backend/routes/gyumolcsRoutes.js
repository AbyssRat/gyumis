import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET all fruits
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM gyumolcs");
    res.json(rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

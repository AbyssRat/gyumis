import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.*, g.nev 
      FROM erkezes e
      JOIN gyumolcs g ON e.gyumolcsid = g.gyumolcsid
    `);
    res.json(rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

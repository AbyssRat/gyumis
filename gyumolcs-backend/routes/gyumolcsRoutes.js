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

// GET a single fruit by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM gyumolcs WHERE gyumolcsid = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST a new fruit
router.post("/", async (req, res) => {
  const { gyumolcsid, nev, megjegyzes, nev_eng, alt_szoveg, src } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO gyumolcs (gyumolcsid, nev, megjegyzes, nev_eng, alt_szoveg, src) VALUES (?, ?, ?, ?, ?, ?)",
      [gyumolcsid, nev, megjegyzes, nev_eng, alt_szoveg, src]
    );
    res.status(201).json({ message: "Fruit added", id: result.insertId });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update a fruit by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { nev, megjegyzes, nev_eng, alt_szoveg, src } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE gyumolcs SET nev = ?, megjegyzes = ?, nev_eng = ?, alt_szoveg = ?, src = ? WHERE gyumolcsid = ?",
      [nev, megjegyzes, nev_eng, alt_szoveg, src, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    res.json({ message: "Fruit updated" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a fruit by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query("DELETE FROM gyumolcs WHERE gyumolcsid = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    res.json({ message: "Fruit deleted" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;


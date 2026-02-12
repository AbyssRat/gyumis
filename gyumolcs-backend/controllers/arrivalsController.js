import { db } from "../config/db.js";
 
export const getErkezesek = async (req, res) => {
  const [rows] = await db.query(`
    SELECT e.*, g.nev
    FROM erkezes e
    JOIN gyumolcs g ON e.gyumolcsid = g.gyumolcsid
  `);
 
  res.json(rows);
};
 
export const createErkezes = async (req, res) => {
  const { gyumolcsid, mennyiseg, egysegar } = req.body;
 
  await db.query(
    `INSERT INTO erkezes (gyumolcsid, mennyiseg, egysegar)
     VALUES (?, ?, ?)`,
    [gyumolcsid, mennyiseg, egysegar]
  );
 
  res.status(201).json({ message: "Érkezés rögzítve" });
};
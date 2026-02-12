import { db } from "../config/db.js";
 
// export const getGyumolcsok = async (req, res) => {
//   const [rows] = await db.query("SELECT * FROM gyumolcs");
//   res.json(rows);
// };

export const getGyumolcsok = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM gyumolcs");
    res.json(rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
 
export const getGyumolcsById = async (req, res) => {
  const { id } = req.params;
 
  const [rows] = await db.query(
    "SELECT * FROM gyumolcs WHERE gyumolcsid = ?",
    [id]
  );
 
  res.json(rows[0]);
};
 
export const createGyumolcs = async (req, res) => {
  const { nev, megjegyzes, nev_eng, alt_szoveg, src } = req.body;
 
  await db.query(
    `INSERT INTO gyumolcs (nev, megjegyzes, nev_eng, alt_szoveg, src)
     VALUES (?, ?, ?, ?, ?)`,
    [nev, megjegyzes, nev_eng, alt_szoveg, src]
  );
 
  res.status(201).json({ message: "Gyümölcs létrehozva" });
};
 
export const updateGyumolcs = async (req, res) => {
  const { id } = req.params;
  const { nev, megjegyzes, nev_eng, alt_szoveg, src } = req.body;
 
  await db.query(
    `UPDATE gyumolcs
     SET nev=?, megjegyzes=?, nev_eng=?, alt_szoveg=?, src=?
     WHERE gyumolcsid=?`,
    [nev, megjegyzes, nev_eng, alt_szoveg, src, id]
  );
 
  res.json({ message: "Gyümölcs frissítve" });
};
 
export const deleteGyumolcs = async (req, res) => {
  const { id } = req.params;
 
  await db.query(
    "DELETE FROM gyumolcs WHERE gyumolcsid=?",
    [id]
  );
 
  res.json({ message: "Gyümölcs törölve" });
};
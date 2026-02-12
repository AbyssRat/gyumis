import React, { useState, useEffect } from "react";

export default function FruitForm({ onSubmit, initialData }) {
  const [nev, setNev] = useState("");
  const [megjegyzes, setMegjegyzes] = useState("");
  const [altSzoveg, setAltSzoveg] = useState("");
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (initialData) {
      setNev(initialData.nev);
      setMegjegyzes(initialData.megjegyzes || "");
      setAltSzoveg(initialData.alt_szoveg);
      setSrc(initialData.src);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nev, megjegyzes, alt_szoveg: altSzoveg, src, gyumolcsid: initialData?.gyumolcsid });
    setNev(""); setMegjegyzes(""); setAltSzoveg(""); setSrc("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input placeholder="Név" value={nev} onChange={e => setNev(e.target.value)} required />
      <input placeholder="Megjegyzés" value={megjegyzes} onChange={e => setMegjegyzes(e.target.value)} />
      <input placeholder="Alt szöveg" value={altSzoveg} onChange={e => setAltSzoveg(e.target.value)} required />
      <input placeholder="Forrás" value={src} onChange={e => setSrc(e.target.value)} required />
      <button type="submit">{initialData ? "Mentés" : "Hozzáadás"}</button>
    </form>
  );
}

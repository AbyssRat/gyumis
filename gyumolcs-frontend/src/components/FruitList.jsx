import React from "react";

export default function FruitList({ fruits, onEdit, onDelete }) {
  return (
    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Név</th>
          <th>Megjegyzés</th>
          <th>Alt szöveg</th>
          <th>Forrás</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {fruits.map(f => (
          <tr key={f.gyumolcsid}>
            <td>{f.nev}</td>
            <td>{f.megjegyzes}</td>
            <td>{f.alt_szoveg}</td>
            <td>{f.src}</td>
            <td>
              <button onClick={() => onEdit(f)}>Szerkesztés</button>
              <button onClick={() => onDelete(f.gyumolcsid)}>Törlés</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

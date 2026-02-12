import React, { useEffect, useState } from "react";
import { getFruits, createFruit, updateFruit, deleteFruit } from "./api/fruits";
import FruitList from "./components/FruitList";
import FruitForm from "./components/FruitForm";
import './App.css'



function App() {
  const [fruits, setFruits] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadFruits = async () => {
    const data = await getFruits();
    setFruits(data);
  };

  useEffect(() => {
    loadFruits();
  }, []);

  const handleAddOrEdit = async (fruit) => {
    if (fruit.gyumolcsid) {
      await updateFruit(fruit.gyumolcsid, fruit);
    } else {
      await createFruit(fruit);
    }
    setEditing(null);
    loadFruits();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Biztos törlöd?")) {
      await deleteFruit(id);
      loadFruits();
    }
  };

  const handleEdit = (fruit) => setEditing(fruit);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gyümölcs nyilvántartó</h1>
      <FruitForm onSubmit={handleAddOrEdit} initialData={editing} />
      <FruitList fruits={fruits} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;


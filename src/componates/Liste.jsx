import React, { useState } from 'react';
import "./liste.css"

function Liste(props) {
  const [fruits, setFruits] = useState([
    { id: 1, nom: "Blog1" },
    { id: 2, nom: "Blog2" },
    { id: 3, nom: "Blog3" },
  ]);
  const [nouveauFruit, setNouveauFruit] = useState("");
  const [editId, setEditId] = useState(null);

  const handleDelete = (id) => {
    const updatedFruits = fruits.filter((fruit) => fruit.id !== id);
    setFruits(updatedFruits);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editId !== null) {
      const updatedFruits = fruits.map((fruit) =>
        fruit.id === editId ? { ...fruit, nom: nouveauFruit } : fruit
      );
      setFruits(updatedFruits);
      setNouveauFruit("");
      setEditId(null);
    } else {
      const id = new Date().getTime();
      const nom = nouveauFruit;
      setFruits([...fruits, { id, nom }]);
      setNouveauFruit("");
    }
  };

  const handleEdit = (id) => {
    const fruitToEdit = fruits.find((fruit) => fruit.id === id);
    if (fruitToEdit) {
      setNouveauFruit(fruitToEdit.nom);
      setEditId(id);
    }
  };

  const handleChange = (event) => {
    setNouveauFruit(event.target.value);
  };

  return (
    <div className="principale">
      <h1 className='welcome'>Welcome to blogus</h1>
      <ul className='liste'>
        {fruits.map((fruit) => (
          <li className="liste" key={fruit.id}>
            {fruit.nom}
            <button className='effacer' onClick={() => handleDelete(fruit.id)} type="button">
              Supprimer
            </button>
            <button className='ajoute' onClick={() => handleEdit(fruit.id)} type="button">
              Modifier
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={nouveauFruit}
          type="text"
          name="fruitName"
          placeholder="Ajouter un blog"
          onChange={handleChange}
        />
        <input className='modifier' type="submit" value={editId !== null ? "Modifier" : "Ajouter"} />
      </form>
    </div>
  );
}

export default Liste;

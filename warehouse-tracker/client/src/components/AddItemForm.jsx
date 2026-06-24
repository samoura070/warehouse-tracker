/*
 * AddItemForm — a controlled form for adding a new stock item.
 *
 * "Controlled" means React state holds the input values (via useState), so the
 * component is always the single source of truth for what's typed in.
 */
import { useState } from 'react';

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page
    if (!name || quantity === '') return; // basic guard

    onAdd({
      name,
      location,
      quantity: Number(quantity),
      reorderLevel: Number(reorderLevel) || 10,
    });

    // clear the form
    setName('');
    setLocation('');
    setQuantity('');
    setReorderLevel('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add stock item</h2>
      <div className="add-form-row">
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Location (e.g. A1)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reorder at"
          value={reorderLevel}
          onChange={(e) => setReorderLevel(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

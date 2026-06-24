/*
 * App.jsx — the main component.
 *
 * It owns the application state (the list of items and the dashboard stats),
 * loads data from the API when the page first renders, and passes data + handler
 * functions down to the smaller presentational components.
 *
 * This "container holds state, children display it" pattern keeps the code
 * readable and easy to extend.
 */

import { useState, useEffect } from 'react';
import * as api from './api';
import StatsBar from './components/StatsBar';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';

export default function App() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Load (or reload) everything from the backend.
  async function refresh() {
    try {
      const [itemsData, statsData] = await Promise.all([
        api.getItems(),
        api.getStats(),
      ]);
      setItems(itemsData);
      setStats(statsData);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Run refresh() once when the component first mounts.
  useEffect(() => {
    refresh();
  }, []);

  // --- handlers passed down to children ---
  async function handleAdd(item) {
    await api.addItem(item);
    refresh();
  }

  async function handlePick(id, quantity) {
    try {
      await api.pickItem(id, quantity);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    await api.deleteItem(id);
    refresh();
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Warehouse Pick &amp; Stock Tracker</h1>
        <p className="subtitle">Track stock, spot low items, log picks.</p>
      </header>

      {error && <div className="banner error">{error}</div>}

      {stats && <StatsBar stats={stats} />}

      <AddItemForm onAdd={handleAdd} />

      {loading ? (
        <p>Loading…</p>
      ) : (
        <ItemList items={items} onPick={handlePick} onDelete={handleDelete} />
      )}

      <footer className="app-footer">
        Built by Samira Ouarssas · React + Express
      </footer>
    </div>
  );
}

/*
 * Warehouse Pick & Stock Tracker — API server
 * -------------------------------------------
 * A small Express server exposing a REST API for stock items and picks.
 *
 * Data is held IN MEMORY (a plain array) to keep things simple to start.
 * That means it resets every time the server restarts — the first item on the
 * roadmap is to replace this with a real database (e.g. SQLite).
 *
 * Endpoints:
 *   GET    /api/items          -> list all stock items
 *   POST   /api/items          -> add a new item
 *   PUT    /api/items/:id       -> update an item
 *   DELETE /api/items/:id       -> remove an item
 *   POST   /api/items/:id/pick  -> record a pick (decrements quantity)
 *   GET    /api/stats           -> dashboard summary numbers
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());          // allow the React dev server (different port) to call us
app.use(express.json());  // parse JSON request bodies

// ---- In-memory "database" ---------------------------------------------------
// Each item has a reorderLevel; if quantity <= reorderLevel it is "low stock".
let items = [
  { id: 1, name: 'Paracetamol 500mg (box)', location: 'A1', quantity: 120, reorderLevel: 40 },
  { id: 2, name: 'Ibuprofen 200mg (box)',   location: 'A2', quantity: 30,  reorderLevel: 40 },
  { id: 3, name: 'Vitamin C 1000mg (tub)',  location: 'B1', quantity: 8,   reorderLevel: 15 },
  { id: 4, name: 'Bandages (pack)',         location: 'C3', quantity: 60,  reorderLevel: 20 },
];

// A simple log of picks. In a real app this would be its own table.
let picks = []; // { id, itemId, itemName, quantity, timestamp }

let nextItemId = 5;
let nextPickId = 1;

// Helper: attach a computed "lowStock" flag so the frontend doesn't have to.
function withLowStockFlag(item) {
  return { ...item, lowStock: item.quantity <= item.reorderLevel };
}

// ---- Routes -----------------------------------------------------------------

// List all items
app.get('/api/items', (req, res) => {
  res.json(items.map(withLowStockFlag));
});

// Add a new item
app.post('/api/items', (req, res) => {
  const { name, location, quantity, reorderLevel } = req.body;

  // Very basic validation — the roadmap includes making this more robust.
  if (!name || quantity == null) {
    return res.status(400).json({ error: 'name and quantity are required' });
  }

  const item = {
    id: nextItemId++,
    name,
    location: location || '—',
    quantity: Number(quantity),
    reorderLevel: Number(reorderLevel) || 10,
  };
  items.push(item);
  res.status(201).json(withLowStockFlag(item));
});

// Update an existing item
app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: 'item not found' });

  // Only overwrite fields that were actually sent.
  const { name, location, quantity, reorderLevel } = req.body;
  if (name != null) item.name = name;
  if (location != null) item.location = location;
  if (quantity != null) item.quantity = Number(quantity);
  if (reorderLevel != null) item.reorderLevel = Number(reorderLevel);

  res.json(withLowStockFlag(item));
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter((i) => i.id !== id);
  if (items.length === before) return res.status(404).json({ error: 'item not found' });
  res.status(204).end();
});

// Record a pick: decrement stock and log it
app.post('/api/items/:id/pick', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: 'item not found' });

  const qty = Number(req.body.quantity) || 1;
  if (qty > item.quantity) {
    return res.status(400).json({ error: 'not enough stock to pick that many' });
  }

  item.quantity -= qty;
  const pick = {
    id: nextPickId++,
    itemId: item.id,
    itemName: item.name,
    quantity: qty,
    timestamp: new Date().toISOString(),
  };
  picks.push(pick);

  res.json({ item: withLowStockFlag(item), pick });
});

// Dashboard stats
app.get('/api/stats', (req, res) => {
  const today = new Date().toDateString();
  const picksToday = picks.filter(
    (p) => new Date(p.timestamp).toDateString() === today
  );
  const itemsPickedToday = picksToday.reduce((sum, p) => sum + p.quantity, 0);

  res.json({
    totalItems: items.length,
    lowStockCount: items.filter((i) => i.quantity <= i.reorderLevel).length,
    itemsPickedToday,
  });
});

app.listen(PORT, () => {
  console.log(`Warehouse API running on http://localhost:${PORT}`);
});

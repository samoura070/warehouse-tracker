/*
 * api.js — a single place for all calls to the backend.
 *
 * Keeping fetch calls here (instead of scattered through components) means the
 * components stay focused on UI, and if the API ever changes we only edit one
 * file. Each function returns parsed JSON or throws on error.
 */

const BASE = '/api';

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  // 204 = no content (e.g. after a delete)
  if (res.status === 204) return null;
  return res.json();
}

export function getItems() {
  return fetch(`${BASE}/items`).then(handle);
}

export function getStats() {
  return fetch(`${BASE}/stats`).then(handle);
}

export function addItem(item) {
  return fetch(`${BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  }).then(handle);
}

export function updateItem(id, changes) {
  return fetch(`${BASE}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  }).then(handle);
}

export function deleteItem(id) {
  return fetch(`${BASE}/items/${id}`, { method: 'DELETE' }).then(handle);
}

export function pickItem(id, quantity = 1) {
  return fetch(`${BASE}/items/${id}/pick`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  }).then(handle);
}

# Warehouse Pick & Stock Tracker

A full-stack web app for tracking warehouse inventory, low-stock alerts, and
daily pick activity. Built with **React (Vite)** on the front end and a
**Node / Express** REST API on the back end.

## Why I built this

I spent a year working in a pharmacy fulfilment warehouse. Stock levels and
pick targets were tracked in ways that were easy to lose track of, so I built
the kind of simple, focused tool I wished we'd had: a clear dashboard of what's
in stock, what's running low, and how many items have been picked.

## What it does

- View all stock items with their current quantity and location
- Add, edit and remove stock items (full CRUD)
- Automatic **low-stock alerts** when a quantity drops below its reorder level
- Record a "pick" against an item, which decrements stock and logs the activity
- A dashboard summarising total items, low-stock count, and picks today

## Tech stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React, Vite, plain CSS        |
| Backend  | Node.js, Express              |
| Data     | In-memory store (see roadmap) |
| Tooling  | Git, npm                      |

## Running it locally

You need Node.js (v18+).

**1. Start the backend** (terminal 1):
```bash
cd server
npm install
npm start
# API runs on http://localhost:4000
```

**2. Start the frontend** (terminal 2):
```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

## Project structure

```
warehouse-tracker/
├── server/           # Express REST API
│   ├── index.js      # API routes + in-memory data
│   └── package.json
└── client/           # React + Vite frontend
    ├── src/
    │   ├── api.js          # all calls to the backend live here
    │   ├── App.jsx         # main layout + state
    │   ├── components/     # UI pieces
    │   └── main.jsx
    └── package.json
```

## Roadmap — things I'm adding

These are the next features I'm working on (good ones to build yourself to
deepen the project and make it fully your own):

- [ ] Swap the in-memory store for a real database (SQLite is a simple start)
- [ ] Search and filter the stock list
- [ ] Sort by quantity / location / low-stock-first
- [ ] A proper pick history page with timestamps
- [ ] Form validation and error handling on the UI
- [ ] Basic tests for the API endpoints
- [ ] Deploy it (e.g. frontend on Netlify/Vercel, API on Render)

## What I'd improve

(Write your own honest reflections here as you go — interviewers love this
section. e.g. "the in-memory store resets on restart, so the next step is
persistence", "I'd add auth if multiple staff used it", etc.)

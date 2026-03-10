# ProcureWatch

Government Tender Intelligence Dashboard built for civic-tech transparency.

ProcureWatch collects tender data from India’s Central Public Procurement Portal (CPPP), stores it in SQLite, and exposes it through a FastAPI backend consumed by a React + TypeScript frontend.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Data Flow](#data-flow)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start (Local)](#quick-start-local)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Deployment on Render](#deployment-on-render)
- [Troubleshooting](#troubleshooting)
- [Development Notes](#development-notes)

---

## Overview

ProcureWatch solves a simple but high-impact problem: public procurement data is available, but hard to navigate and analyze quickly.

This project provides:
- A searchable tender explorer
- Deadline tracking for “closing soon” tenders
- Visual analytics (ministry/category/state/type/timeline)
- A lightweight setup with no heavy infra requirements

---

## Features

### Dashboard
- Total tenders, ministries, and categories
- Top ministry insight
- Charts by ministry, category, state, and tender type

### Tender Explorer
- Search by title/reference
- Filter by category and ministry
- Pagination for large datasets
- Row-level detail navigation

### Closing Soon
- Track tenders closing in 3/7/14/30 days
- Countdown display for urgency

### Resilience
- If scraping fails, app falls back to sample demo data

---

## Architecture

Three-tier architecture:

```text
React Frontend (Vite + TS)  <----HTTP/REST---->  FastAPI Backend  <---->  SQLite
```

### Responsibilities

- **Frontend (`frontend/`)**
  - Routing, UI, charts, and API calls
  - Uses Axios through `src/api.ts`

- **Backend (`backend/`)**
  - `main.py`: API endpoints + startup lifecycle
  - `scraper.py`: scrape + parse + normalize tender data
  - `database.py`: SQLite CRUD/query functions
  - `analytics.py`: aggregation queries for dashboard

- **Database (`tenders.db`)**
  - Local SQLite file generated automatically
  - Duplicate safety via unique `tender_ref_no`

---

## Data Flow

### Startup flow
1. FastAPI starts
2. Database table is created if missing
3. Background scraping task starts
4. Scraped tenders are inserted into SQLite
5. API endpoints serve frontend requests

### Runtime request flow
1. React page triggers API call (Axios)
2. FastAPI endpoint receives request
3. Endpoint delegates to database/analytics logic
4. JSON response returned to frontend
5. UI renders table/cards/charts

---

## Tech Stack

### Backend
- Python 3.9+
- FastAPI
- Uvicorn
- Requests + BeautifulSoup4
- SQLite

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Recharts
- Axios
- React Router

---

## Project Structure

```text
procurewatch/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── scraper.py
│   └── analytics.py
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── api.ts
│       ├── config.ts
│       ├── App.tsx
│       ├── components/
│       └── pages/
├── requirements.txt
├── start.bat
├── start.sh
└── README.md
```

---

## Quick Start (Local)

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm

### Option A: One-command startup (Windows)

From project root:

```bat
start.bat
```

If using Git Bash:

```bash
./start.bat
```

### Option B: Manual startup

#### Backend
```bash
pip install -r requirements.txt
cd backend
python main.py
```

#### Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### Access URLs
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`

---

## Configuration

Frontend API URL is set via:

```env
VITE_API_URL=http://localhost:8000
```

File locations:
- `frontend/.env` (local override)
- Hosting env vars for production

Fallback behavior in `frontend/src/config.ts` defaults to `http://localhost:8000` when not set.

---

## API Reference

### Tenders

- `GET /tenders`
  - Query params: `limit`, `offset`, `category`, `ministry`, `search`

- `GET /tenders/{id}`
  - Get tender by numeric ID

- `GET /tenders/closing-soon?days=7`
  - Returns upcoming tenders with `days_until_closing`

### Analytics

- `GET /analytics`
  - Combined dashboard payload

- `GET /analytics/ministry`
- `GET /analytics/category`
- `GET /analytics/state`

### Filter metadata

- `GET /distinct/ministries`
- `GET /distinct/categories`

---

## Deployment on Render

> Recommended for quick demos: deploy backend as a **Web Service** and frontend as a **Static Site**.

### 1) Push code to GitHub

```bash
git add .
git commit -m "Prepare deployment"
git push origin main
```

### 2) Deploy backend (Render Web Service)

Create **Web Service** with:

- **Root Directory**: `backend`
- **Build Command**: `pip install -r ../requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Copy backend URL after deploy, e.g.:
`https://procurewatch-api.onrender.com`

### 3) Deploy frontend (Render Static Site)

Create **Static Site** with:

- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment Variable**:
  - `VITE_API_URL=https://procurewatch-api.onrender.com`

### 4) Verify

- Frontend loads and shows data
- Backend docs available at `/docs`
- Network calls from frontend target your Render backend URL

### Render caveats (important)

- Free tier services sleep when idle (cold starts)
- SQLite file is ephemeral in many cloud setups
  - On restart/redeploy, DB may reset
  - App re-scrapes on startup, so demo remains functional

---

## Troubleshooting

### `start.bat: command not found` in Git Bash
Use:

```bash
./start.bat
```

### `pip` or `npm` not found
- Install Python/Node and ensure PATH is set

### Frontend cannot reach backend
- Ensure backend is running
- Check `VITE_API_URL` value
- Open browser devtools network tab for actual request URL

### Scraper fails
- CPPP structure/network might have changed
- App will auto-fallback to sample data for continuity

---

## Development Notes

- CORS is currently wide open (`allow_origins=["*"]`) for hackathon convenience
- `tenders.db` is ignored in Git (`.gitignore`)
- To add endpoints, extend `backend/main.py` and call DB/analytics helpers

---

Built for transparency in public procurement. Contributions welcome.

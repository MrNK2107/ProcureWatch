# ProcureWatch — Government Tender Intelligence Dashboard

![ProcureWatch](https://img.shields.io/badge/Civic%20Tech-Procurement%20Transparency-blue)
![Python](https://img.shields.io/badge/Python-3.9+-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-teal)

A civic-tech web application that transforms government tender data from the Central Public Procurement Portal into useful procurement intelligence. 

ProcureWatch enables users to browse tenders, track deadlines, search opportunities, and analyze procurement trends across Indian government ministries.

---

## 🎯 Features

### 📊 Dashboard
- **Real-time statistics**: Total tenders, ministries, categories
- **Visual analytics**: Charts showing tender distribution by ministry, category, state, and type
- **Trend analysis**: Timeline view of procurement activity

### 🔍 Tender Explorer
- **Advanced search**: Search by title or reference number
- **Powerful filters**: Filter by category and ministry
- **Pagination**: Browse through large datasets efficiently
- **Detailed view**: Click any tender for complete information

### ⏰ Closing Soon
- **Deadline tracking**: See tenders closing within 3, 7, 14, or 30 days
- **Visual alerts**: Color-coded urgency indicators
- **Days countdown**: Know exactly how much time remains

### 📈 Analytics
- Ministry-wise tender distribution
- Category breakdown (Works, Goods, Services, Consultancy)
- State-wise procurement activity
- Tender type analysis

---

## 🏗️ Architecture

**Simple 3-tier architecture:**

```
┌─────────────────┐
│  React Frontend │  (Vite + TypeScript + TailwindCSS)
└────────┬────────┘
         │ HTTP/REST
┌────────┴────────┐
│  FastAPI Backend│  (Python + FastAPI)
└────────┬────────┘
         │
┌────────┴────────┐
│  SQLite Database│  (No installation required)
└─────────────────┘
```

**No Docker, Kubernetes, or complex infrastructure** — just simple, hackathon-ready code.

---

## 🛠️ Technology Stack

### Backend
- **Language**: Python 3.9+
- **Framework**: FastAPI
- **Database**: SQLite
- **Web Scraping**: BeautifulSoup4, Requests
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Routing**: React Router

---

## 📂 Project Structure

```
procurewatch/
├── backend/
│   ├── main.py           # FastAPI application & API endpoints
│   ├── database.py       # SQLite database operations
│   ├── models.py         # Data models
│   ├── scraper.py        # Web scraping logic
│   └── analytics.py      # Analytics & statistics
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── TenderTable.tsx
│   │   ├── pages/        # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── TenderExplorer.tsx
│   │   │   ├── TenderDetail.tsx
│   │   │   └── ClosingSoon.tsx
│   │   ├── api.ts        # API client
│   │   ├── config.ts     # Configuration
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.9 or higher**
- **Node.js 16 or higher**
- **npm or yarn**

### Installation & Running

#### 1️⃣ Backend Setup

```bash
# Navigate to project root
cd procurewatch

# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
cd backend
python main.py
```

The backend will start at `http://localhost:8000`

**On startup, the backend automatically:**
- Creates the SQLite database (`tenders.db`)
- Scrapes tender data from the government portal
- Loads data into the database

#### 2️⃣ Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd procurewatch/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at `http://localhost:5173`

#### 3️⃣ Access the Application

Open your browser and visit: **http://localhost:5173**

---

## 📡 API Endpoints

### Tenders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tenders` | Get all tenders (with filters) |
| GET | `/tenders/{id}` | Get tender by ID |
| GET | `/tenders/closing-soon?days=7` | Get tenders closing soon |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics` | Get comprehensive analytics |
| GET | `/analytics/ministry` | Get ministry distribution |
| GET | `/analytics/category` | Get category distribution |
| GET | `/analytics/state` | Get state distribution |

### Utilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/distinct/ministries` | Get list of all ministries |
| GET | `/distinct/categories` | Get list of all categories |

**API Documentation**: Visit `http://localhost:8000/docs` for interactive Swagger UI

---

## 📊 Data Source

Tenders are scraped from the official **Central Public Procurement Portal**:

🔗 https://eprocure.gov.in/cppp/latestactivetendersnew/cpppdata

### Data Processing

1. **Scraping**: HTTP request to government portal
2. **Parsing**: Extract table data using BeautifulSoup
3. **Cleaning**: Parse organization chain, standardize dates
4. **Storage**: Insert into SQLite database (skip duplicates)

### Sample Data

If scraping fails (network issues, portal changes), the system **automatically generates sample data** for demonstration purposes.

Each tender includes:
- Tender Reference Number
- Title
- Ministry / Department / Sub-Department
- Category (Works, Goods, Services, Consultancy)
- Tender Type (Open Tender, Limited Tender)
- Location
- Published Date
- Closing Date
- Opening Date

---

## 🎨 UI Features

### Responsive Design
- **Desktop-optimized** for data-heavy tables and charts
- **Mobile-friendly** navigation and layouts

### Visual Components
- **Stat Cards**: Quick overview metrics
- **Interactive Charts**: Bar charts, pie charts for analytics
- **Data Tables**: Sortable, filterable tender listings
- **Color Coding**: Category badges, urgency indicators

### User Experience
- **Fast search**: Instant filtering and search
- **Smart pagination**: Navigate large datasets
- **Breadcrumb navigation**: Always know where you are
- **Loading states**: Clear feedback during data fetching

---

## 🎭 Demo Story

### The Problem

Government procurement in India involves **thousands of tenders** across numerous ministries and departments. However, this valuable data is presented in raw tabular form, making it:

- **Hard to discover** relevant opportunities
- **Difficult to track** deadlines and closing dates
- **Impossible to analyze** procurement trends and patterns

### The Solution

**ProcureWatch** transforms raw procurement data into **actionable intelligence**:

1. **Automated Data Collection**: Continuously scrapes latest tenders
2. **Smart Organization**: Categorizes by ministry, department, location
3. **Visual Analytics**: Charts and graphs reveal procurement patterns
4. **Deadline Tracking**: Never miss a tender closing date
5. **Easy Discovery**: Search and filter to find relevant opportunities

### Impact

- 📈 **Increased Transparency**: Public visibility into government spending
- 🎯 **Better Targeting**: Vendors find relevant tenders faster
- 📊 **Data-Driven Insights**: Understand procurement trends
- ⏰ **Timely Action**: Track deadlines and act quickly

---

## 🔧 Development

### Adding New Features

**Add a new API endpoint:**
```python
# backend/main.py
@app.get("/new-endpoint")
async def new_endpoint():
    return {"message": "Hello"}
```

**Add a new page:**
```typescript
// frontend/src/pages/NewPage.tsx
import Layout from '../components/Layout';

export default function NewPage() {
  return <Layout><h1>New Page</h1></Layout>;
}
```

### Database Schema

```sql
CREATE TABLE tenders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tender_ref_no TEXT UNIQUE,
    title TEXT,
    ministry TEXT,
    department TEXT,
    sub_department TEXT,
    category TEXT,
    tender_type TEXT,
    location TEXT,
    published_date TEXT,
    closing_date TEXT,
    opening_date TEXT,
    created_at TEXT
);
```

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```python
# Change port in backend/main.py
uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
```

**Database locked:**
```bash
# Delete and restart
rm tenders.db
python main.py
```

### Frontend Issues

**Port 5173 already in use:**
```bash
# Vite will automatically suggest next available port
# Or specify in vite.config.ts
```

**API connection refused:**
- Ensure backend is running on port 8000
- Check `.env` file: `VITE_API_URL=http://localhost:8000`

### Scraping Issues

If the government portal changes structure:
1. Update selectors in `scraper.py`
2. Or use sample data generator (automatic fallback)

---

## 📝 License

This is a hackathon project created for demonstration purposes.

---

## 🙏 Acknowledgments

- **Data Source**: Central Public Procurement Portal, Government of India
- **Built for**: Civic Tech & Transparency
- **Purpose**: Hackathon demonstration of procurement intelligence

---

## 📧 Contact

For questions or improvements, create an issue or submit a pull request.

---

**🎉 Happy Hacking! Build transparency into public procurement.**

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import uvicorn

# Import local modules
from database import (
    init_database,
    insert_tender,
    get_all_tenders,
    get_tender_by_id,
    get_closing_soon,
    get_tender_count
)
from scraper import scrape_tenders
from analytics import (
    get_ministry_analytics,
    get_category_analytics,
    get_state_analytics,
    get_tender_type_analytics,
    get_timeline_analytics,
    get_dashboard_stats
)

# Initialize FastAPI app
app = FastAPI(
    title="ProcureWatch API",
    description="Government Tender Intelligence API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import asyncio

@app.on_event("startup")
async def startup_event():
    """Initialize database and start scraping task"""
    print("Starting ProcureWatch API...")
    
    # Initialize database
    init_database()
    
    # Background scraping so API starts immediately
    asyncio.create_task(background_scrape())

async def background_scrape():
    # Scrape and load tender data
    print("Loading tender data in background...")
    
    # Run synchronous scraping in executor
    loop = asyncio.get_event_loop()
    tenders = await loop.run_in_executor(None, scrape_tenders)
    
    new_count = 0
    for tender in tenders:
        if insert_tender(tender):
            new_count += 1
            
    print(f"Loaded {new_count} new tenders into database")
    total = get_tender_count()
    print(f"Total tenders in database: {total}")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to ProcureWatch API",
        "version": "1.0.0",
        "endpoints": {
            "tenders": "/tenders",
            "tender_detail": "/tenders/{id}",
            "closing_soon": "/tenders/closing-soon",
            "analytics": "/analytics"
        }
    }

@app.get("/tenders")
async def get_tenders(
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    category: Optional[str] = None,
    ministry: Optional[str] = None,
    search: Optional[str] = None
):
    """
    Get list of tenders with optional filters
    
    - **limit**: Maximum number of results (default: 100)
    - **offset**: Number of results to skip (default: 0)
    - **category**: Filter by category
    - **ministry**: Filter by ministry
    - **search**: Search in title and reference number
    """
    tenders = get_all_tenders(
        limit=limit,
        offset=offset,
        category=category,
        ministry=ministry,
        search=search
    )
    
    total = get_tender_count()
    
    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "results": tenders
    }

@app.get("/tenders/closing-soon")
async def get_tenders_closing_soon(days: int = Query(7, ge=1, le=30)):
    """
    Get tenders closing within specified days
    
    - **days**: Number of days to look ahead (default: 7)
    """
    tenders = get_closing_soon(days=days)
    
    return {
        "days": days,
        "count": len(tenders),
        "tenders": tenders
    }

@app.get("/tenders/{tender_id}")
async def get_tender(tender_id: int):
    """
    Get detailed information about a specific tender
    
    - **tender_id**: Unique tender ID
    """
    tender = get_tender_by_id(tender_id)
    
    if not tender:
        raise HTTPException(status_code=404, detail="Tender not found")
        
    return tender

@app.get("/analytics")
async def get_analytics():
    """
    Get comprehensive analytics overview
    """
    return {
        "dashboard": get_dashboard_stats(),
        "ministry": get_ministry_analytics()[:10],  # Top 10
        "category": get_category_analytics(),
        "state": get_state_analytics()[:10],  # Top 10
        "tender_type": get_tender_type_analytics(),
        "timeline": get_timeline_analytics()
    }

@app.get("/analytics/ministry")
async def get_ministry_stats():
    """
    Get tender distribution by ministry
    """
    return {
        "data": get_ministry_analytics()
    }

@app.get("/analytics/category")
async def get_category_stats():
    """
    Get tender distribution by category
    """
    return {
        "data": get_category_analytics()
    }

@app.get("/analytics/state")
async def get_state_stats():
    """
    Get tender distribution by state/location
    """
    return {
        "data": get_state_analytics()
    }

@app.get("/distinct/ministries")
async def get_distinct_ministries():
    """Get list of all distinct ministries"""
    from database import get_connection
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT ministry FROM tenders WHERE ministry != '' ORDER BY ministry")
    rows = cursor.fetchall()
    conn.close()
    return {"ministries": [row['ministry'] for row in rows]}

@app.get("/distinct/categories")
async def get_distinct_categories():
    """Get list of all distinct categories"""
    from database import get_connection
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT category FROM tenders WHERE category != '' ORDER BY category")
    rows = cursor.fetchall()
    conn.close()
    return {"categories": [row['category'] for row in rows]}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

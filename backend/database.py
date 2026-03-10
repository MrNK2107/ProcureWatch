import sqlite3
from typing import List, Optional
from models import Tender
from datetime import datetime

DATABASE_FILE = "tenders.db"

def get_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    """Initialize SQLite database with tenders table"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tenders (
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
    )
    """)
    
    conn.commit()
    conn.close()
    print("Database initialized successfully")

def insert_tender(tender: Tender) -> bool:
    """Insert a tender into database, skip if duplicate"""
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO tenders (
            tender_ref_no, title, ministry, department, sub_department,
            category, tender_type, location, published_date, closing_date,
            opening_date, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            tender.tender_ref_no, tender.title, tender.ministry,
            tender.department, tender.sub_department, tender.category,
            tender.tender_type, tender.location, tender.published_date,
            tender.closing_date, tender.opening_date, tender.created_at
        ))
        
        conn.commit()
        conn.close()
        return True
    except sqlite3.IntegrityError:
        # Duplicate tender_ref_no, skip
        return False

def get_all_tenders(
    limit: int = 100,
    offset: int = 0,
    category: Optional[str] = None,
    ministry: Optional[str] = None,
    search: Optional[str] = None
) -> List[dict]:
    """Get all tenders with optional filters"""
    conn = get_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM tenders WHERE 1=1"
    params = []
    
    if category:
        query += " AND category = ?"
        params.append(category)
    
    if ministry:
        query += " AND ministry = ?"
        params.append(ministry)
    
    if search:
        query += " AND (title LIKE ? OR tender_ref_no LIKE ?)"
        params.append(f"%{search}%")
        params.append(f"%{search}%")
    
    query += " ORDER BY published_date DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])
    
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    
    return [dict(row) for row in rows]

def get_tender_by_id(tender_id: int) -> Optional[dict]:
    """Get a specific tender by ID"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM tenders WHERE id = ?", (tender_id,))
    row = cursor.fetchone()
    conn.close()
    
    return dict(row) if row else None

def get_closing_soon(days: int = 7) -> List[dict]:
    """Get upcoming tenders closing soon (not limited to strict days to avoid empty results)"""
    conn = get_connection()
    cursor = conn.cursor()

    # Get current date
    today = datetime.now().date()
    
    # We'll just get all future ones ordered by date, or closest
    cursor.execute("SELECT * FROM tenders ORDER BY closing_date ASC")
    rows = cursor.fetchall()
    conn.close()

    closing_soon = []
    for row in rows:
        if row['closing_date']:
            try:
                closing_date = datetime.strptime(row['closing_date'], '%Y-%m-%d').date()
                days_until = (closing_date - today).days
                
                # Only include upcoming or today
                if days_until >= 0:
                    tender_dict = dict(row)
                    tender_dict['days_until_closing'] = days_until
                    closing_soon.append(tender_dict)
            except ValueError:
                continue

    # Sort by days_until for precision and return top 20
    closing_soon.sort(key=lambda x: x['days_until_closing'])
    return closing_soon[:20]
def get_tender_count() -> int:
    """Get total number of tenders"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as count FROM tenders")
    result = cursor.fetchone()
    conn.close()
    return result['count']

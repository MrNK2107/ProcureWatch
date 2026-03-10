from typing import Dict, List
from database import get_connection

def get_ministry_analytics() -> List[Dict]:
    """
    Get tender count per ministry
    Returns sorted list of ministries with tender counts
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    SELECT ministry, COUNT(*) as count
    FROM tenders
    WHERE ministry != ''
    GROUP BY ministry
    ORDER BY count DESC
    """)
    
    rows = cursor.fetchall()
    conn.close()
    
    return [{"ministry": row['ministry'], "count": row['count']} for row in rows]

def get_category_analytics() -> List[Dict]:
    """
    Get tender count per category
    Returns distribution of tenders across categories
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    SELECT category, COUNT(*) as count
    FROM tenders
    WHERE category != ''
    GROUP BY category
    ORDER BY count DESC
    """)
    
    rows = cursor.fetchall()
    conn.close()
    
    return [{"category": row['category'], "count": row['count']} for row in rows]

def get_state_analytics() -> List[Dict]:
    """
    Get tender count per state/location
    Returns distribution of tenders across locations
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    SELECT location, COUNT(*) as count
    FROM tenders
    WHERE location != ''
    GROUP BY location
    ORDER BY count DESC
    """)
    
    rows = cursor.fetchall()
    conn.close()
    
    return [{"state": row['location'], "count": row['count']} for row in rows]

def get_tender_type_analytics() -> List[Dict]:
    """
    Get tender count per type
    Returns distribution of tender types
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    SELECT tender_type, COUNT(*) as count
    FROM tenders
    WHERE tender_type != ''
    GROUP BY tender_type
    ORDER BY count DESC
    """)
    
    rows = cursor.fetchall()
    conn.close()
    
    return [{"type": row['tender_type'], "count": row['count']} for row in rows]

def get_timeline_analytics() -> List[Dict]:
    """
    Get tenders grouped by published date
    Returns timeline of tender publications
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    SELECT published_date, COUNT(*) as count
    FROM tenders
    WHERE published_date != ''
    GROUP BY published_date
    ORDER BY published_date DESC
    LIMIT 30
    """)
    
    rows = cursor.fetchall()
    conn.close()
    
    return [{"date": row['published_date'], "count": row['count']} for row in rows]

def get_dashboard_stats() -> Dict:
    """
    Get key statistics for dashboard
    Returns summary statistics
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # Total tenders
    cursor.execute("SELECT COUNT(*) as total FROM tenders")
    total = cursor.fetchone()['total']
    
    # Total ministries
    cursor.execute("SELECT COUNT(DISTINCT ministry) as count FROM tenders WHERE ministry != ''")
    ministries = cursor.fetchone()['count']
    
    # Total categories
    cursor.execute("SELECT COUNT(DISTINCT category) as count FROM tenders WHERE category != ''")
    categories = cursor.fetchone()['count']
    
    # Top ministry
    cursor.execute("""
    SELECT ministry, COUNT(*) as count
    FROM tenders
    WHERE ministry != ''
    GROUP BY ministry
    ORDER BY count DESC
    LIMIT 1
    """)
    top_ministry_row = cursor.fetchone()
    top_ministry = top_ministry_row['ministry'] if top_ministry_row else "N/A"
    
    conn.close()
    
    return {
        "total_tenders": total,
        "total_ministries": ministries,
        "total_categories": categories,
        "top_ministry": top_ministry
    }

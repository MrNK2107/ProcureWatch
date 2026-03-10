import requests
from bs4 import BeautifulSoup
from typing import List, Dict
from datetime import datetime
from models import Tender

# Government tender data source
DATA_URL = "https://eprocure.gov.in/cppp/latestactivetendersnew/cpppdata"

def parse_organisation(org_chain: str) -> Dict[str, str]:
    """
    Parse organisation chain into ministry, department, and sub_department
    
    Example: "Ministry of Railways | Northern Railway | Construction"
    Returns: {
        "ministry": "Ministry of Railways",
        "department": "Northern Railway",
        "sub_department": "Construction"
    }
    """
    parts = [part.strip() for part in org_chain.split('|')]
    
    return {
        "ministry": parts[0] if len(parts) > 0 else "",
        "department": parts[1] if len(parts) > 1 else "",
        "sub_department": parts[2] if len(parts) > 2 else ""
    }

def parse_date(date_str: str) -> str:
    """
    Parse date string to standardized format (YYYY-MM-DD)
    Handles multiple date formats including 10-Mar-2026 02:51 PM
    """
    if not date_str or date_str.strip() == "":
        return ""
    
    date_str = date_str.strip()
    
    # Common date formats in Indian government portals
    formats = [
        '%d-%b-%Y %I:%M %p', # 10-Mar-2026 02:51 PM
        '%d-%b-%Y %H:%M',    # 10-Mar-2026 14:51
        '%d-%m-%Y',          # 09-03-2026
        '%d/%m/%Y',          # 09/03/2026
        '%Y-%m-%d',          # 2026-03-09
        '%d-%b-%Y',          # 09-Mar-2026
        '%d/%b/%Y',          # 09/Mar/2026
    ]
    
    for fmt in formats:
        try:
            parsed_date = datetime.strptime(date_str, fmt)
            return parsed_date.strftime('%Y-%m-%d')
        except ValueError:
            continue
    
    # If no format works, return original
    return date_str

def extract_category(title: str) -> str:
    """Infer category from title keywords"""
    title_lower = title.lower()
    if any(word in title_lower for word in ['construct', 'build', 'repair', 'civil', 'road']):
        return 'Works'
    if any(word in title_lower for word in ['supply', 'procure', 'purchase', 'equipment', 'computer']):
        return 'Goods'
    if any(word in title_lower for word in ['consult', 'audit', 'advis']):
        return 'Consultancy'
    if any(word in title_lower for word in ['maintain', 'service', 'ups', 'amc', 'cleaning']):
        return 'Services'
    return 'Works'  # default

def scrape_tenders() -> List[Tender]:
    """
    Scrape government tender data from the portal
    Returns list of Tender objects across multiple pages
    """
    tenders = []
    
    # Set headers to mimic browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        # Loop through pages 1 to 10
        for page in range(1, 11):
            url = f"{DATA_URL}?page={page}" if page > 1 else DATA_URL
            print(f"Fetching data from {url}...")
            
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find the main tender table
            table = soup.find('table', {'id': 'table'}) or soup.find('table', class_='list_table')
            
            if not table:
                print(f"No table found on page {page}, stopping pagination.")
                break
                
            rows = table.find_all('tr')[1:]  # Skip header row
            if not rows:
                break
                
            print(f"Found {len(rows)} tender rows on page {page}")
            
            for row in rows:
                cols = row.find_all('td')
                
                # Based on actual table format:
                # 0: Sl.No, 1: e-Published Date, 2: Bid Submission Date, 3: Opening Date
                # 4: Title/Ref.No, 5: Organisation, 6: Corrigendum
                if len(cols) < 6:  
                    continue
                
                published_date = cols[1].get_text(strip=True)
                closing_date = cols[2].get_text(strip=True)
                opening_date = cols[3].get_text(strip=True)
                
                # For title and ref no
                title_col = cols[4]
                a_tag = title_col.find('a')
                title = a_tag.get_text(strip=True) if a_tag else title_col.get_text(strip=True)
                
                # Use the full text as reference no if a_tag is present, or a subset
                tender_ref_no = title_col.get_text(strip=True).replace(title, "").replace("/", "", 1).strip()
                if not tender_ref_no:
                    tender_ref_no = title[:20] # fallback

                organisation = cols[5].get_text(strip=True)
                org_data = parse_organisation(organisation)
                
                category = extract_category(title)
                tender_type = "Open Tender" # Defaulting for now
                location = "India" # Default since it's not provided in the 7-col format
                
                tender = Tender(
                    tender_ref_no=tender_ref_no,
                    title=title,
                    ministry=org_data['ministry'],
                    department=org_data['department'],
                    sub_department=org_data['sub_department'],
                    category=category,
                    tender_type=tender_type,
                    location=location,
                    published_date=parse_date(published_date),
                    closing_date=parse_date(closing_date),
                    opening_date=parse_date(opening_date)
                )
                
                # Simple deduplication by reference no in our list
                if not any(t.tender_ref_no == tender.tender_ref_no for t in tenders):
                    tenders.append(tender)

            pagination = soup.find('a', class_='paginate_button', string=str(page+1))
            if not pagination and page > 1:
                pass # Continue loop anyway, portal might use JS or different structure
                
        print(f"Successfully scraped {len(tenders)} total tenders from multiple pages")
        
    except Exception as e:
        print(f"Error scraping data: {e}")
        if len(tenders) == 0:
            print("Generating sample data for demo...")
            return generate_sample_tenders()
    
    return tenders if tenders else generate_sample_tenders()

def generate_sample_tenders() -> List[Tender]:
    """
    Generate sample tender data for demonstration
    Used when scraping fails or for testing
    """
    print("Generating sample tender data...")
    
    sample_data = [
        {
            "tender_ref_no": "CPWD/2026/1234",
            "title": "Construction of staff quarters at Lodhi Road",
            "ministry": "Ministry of Housing and Urban Affairs",
            "department": "CPWD",
            "sub_department": "Civil Division",
            "category": "Works",
            "tender_type": "Open Tender",
            "location": "Delhi",
            "published_date": "2026-03-08",
            "closing_date": "2026-03-25",
            "opening_date": "2026-03-27"
        },
        {
            "tender_ref_no": "RAIL/NR/2026/5678",
            "title": "Supply of railway sleepers and fasteners",
            "ministry": "Ministry of Railways",
            "department": "Northern Railway",
            "sub_department": "Procurement",
            "category": "Goods",
            "tender_type": "Limited Tender",
            "location": "New Delhi",
            "published_date": "2026-03-07",
            "closing_date": "2026-03-20",
            "opening_date": "2026-03-22"
        },
        {
            "tender_ref_no": "DEF/IAF/2026/9012",
            "title": "Maintenance of aircraft engines",
            "ministry": "Ministry of Defence",
            "department": "Indian Air Force",
            "sub_department": "Maintenance Wing",
            "category": "Services",
            "tender_type": "Open Tender",
            "location": "Bangalore",
            "published_date": "2026-03-06",
            "closing_date": "2026-03-15",
            "opening_date": "2026-03-18"
        },
        {
            "tender_ref_no": "HEALTH/AIIMS/2026/3456",
            "title": "Procurement of medical equipment for ICU",
            "ministry": "Ministry of Health and Family Welfare",
            "department": "AIIMS",
            "sub_department": "Medical Equipment",
            "category": "Goods",
            "tender_type": "Open Tender",
            "location": "Delhi",
            "published_date": "2026-03-09",
            "closing_date": "2026-03-30",
            "opening_date": "2026-04-02"
        },
        {
            "tender_ref_no": "ROAD/NHAI/2026/7890",
            "title": "Construction of highway stretch Delhi-Jaipur",
            "ministry": "Ministry of Road Transport and Highways",
            "department": "NHAI",
            "sub_department": "Construction",
            "category": "Works",
            "tender_type": "Open Tender",
            "location": "Haryana",
            "published_date": "2026-03-05",
            "closing_date": "2026-03-28",
            "opening_date": "2026-03-31"
        },
        {
            "tender_ref_no": "EDU/UGC/2026/2345",
            "title": "Consultancy for education quality assessment",
            "ministry": "Ministry of Education",
            "department": "UGC",
            "sub_department": "Quality Assurance",
            "category": "Consultancy",
            "tender_type": "Limited Tender",
            "location": "Delhi",
            "published_date": "2026-03-04",
            "closing_date": "2026-03-22",
            "opening_date": "2026-03-25"
        },
        {
            "tender_ref_no": "RAIL/SR/2026/6789",
            "title": "Supply of electrical components for metro",
            "ministry": "Ministry of Railways",
            "department": "Southern Railway",
            "sub_department": "Metro Division",
            "category": "Goods",
            "tender_type": "Open Tender",
            "location": "Chennai",
            "published_date": "2026-03-03",
            "closing_date": "2026-03-18",
            "opening_date": "2026-03-21"
        },
        {
            "tender_ref_no": "DEF/ARMY/2026/4567",
            "title": "Construction of barracks and facilities",
            "ministry": "Ministry of Defence",
            "department": "Indian Army",
            "sub_department": "Engineering Corps",
            "category": "Works",
            "tender_type": "Open Tender",
            "location": "Ladakh",
            "published_date": "2026-03-02",
            "closing_date": "2026-03-19",
            "opening_date": "2026-03-23"
        },
        {
            "tender_ref_no": "POWER/NTPC/2026/8901",
            "title": "Maintenance and upkeep of thermal power plant",
            "ministry": "Ministry of Power",
            "department": "NTPC",
            "sub_department": "Operations",
            "category": "Services",
            "tender_type": "Limited Tender",
            "location": "Uttar Pradesh",
            "published_date": "2026-03-01",
            "closing_date": "2026-03-16",
            "opening_date": "2026-03-19"
        },
        {
            "tender_ref_no": "HOME/CRPF/2026/1122",
            "title": "Supply of uniforms and equipment",
            "ministry": "Ministry of Home Affairs",
            "department": "CRPF",
            "sub_department": "Logistics",
            "category": "Goods",
            "tender_type": "Open Tender",
            "location": "Delhi",
            "published_date": "2026-02-28",
            "closing_date": "2026-03-14",
            "opening_date": "2026-03-17"
        }
    ]
    
    tenders = []
    for data in sample_data:
        tender = Tender(**data)
        tenders.append(tender)
    
    return tenders

from typing import Optional
from datetime import datetime

class Tender:
    """Data model for government tender"""
    
    def __init__(
        self,
        id: Optional[int] = None,
        tender_ref_no: str = "",
        title: str = "",
        ministry: str = "",
        department: str = "",
        sub_department: str = "",
        category: str = "",
        tender_type: str = "",
        location: str = "",
        work_description: str = "",
        published_date: str = "",
        closing_date: str = "",
        opening_date: str = "",
        created_at: Optional[str] = None
    ):
        self.id = id
        self.tender_ref_no = tender_ref_no
        self.title = title
        self.ministry = ministry
        self.department = department
        self.sub_department = sub_department
        self.category = category
        self.tender_type = tender_type
        self.location = location
        self.work_description = work_description
        self.published_date = published_date
        self.closing_date = closing_date
        self.opening_date = opening_date
        self.created_at = created_at or datetime.now().isoformat()
    
    def to_dict(self):
        """Convert tender to dictionary"""
        return {
            "id": self.id,
            "tender_ref_no": self.tender_ref_no,
            "title": self.title,
            "ministry": self.ministry,
            "department": self.department,
            "sub_department": self.sub_department,
            "category": self.category,
            "tender_type": self.tender_type,
            "location": self.location,
            "published_date": self.published_date,
            "closing_date": self.closing_date,
            "opening_date": self.opening_date,
            "work_description": self.work_description,
            "created_at": self.created_at
        }

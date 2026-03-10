from scraper import scrape_tenders; tenders = scrape_tenders(); print(tenders[0].to_dict() if tenders else 'none')

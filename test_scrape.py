from backend.scraper import scrape_tenders
tenders = scrape_tenders()
for t in tenders[:3]:
    print(t.to_dict())

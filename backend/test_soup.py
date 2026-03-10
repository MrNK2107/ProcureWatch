import requests
from bs4 import BeautifulSoup
req = requests.get('https://eprocure.gov.in/cppp/latestactivetendersnew/cpppdata')
soup = BeautifulSoup(req.content, 'html.parser')
table = soup.find('table', {'id': 'table'})
print(table.find_all('tr')[1].find_all('td')[4].prettify())

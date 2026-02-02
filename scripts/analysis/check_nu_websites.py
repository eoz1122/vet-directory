
import csv
import requests
from concurrent.futures import ThreadPoolExecutor

csv_path = r"C:\Users\emreo\Documents\Vet Directory\Nuremberg.csv"

def check_website(name, url):
    if not url or not url.startswith('http'):
        return None
    
    try:
        # Check if the URL stays same or if /en exists
        # We just do a quick head request to see if it's alive
        # A more complex check would be searching for "English" in the HTML
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            text = response.text.lower()
            if "english" in text or "language" in text or "en.svg" in r.text or "gb.svg" in r.text:
                return (name, url, "Found 'English' on site")
    except:
        pass
    return None

vets_to_check = []
with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        if len(row) > 6:
            vets_to_check.append((row[1], row[6]))

print(f"Checking {len(vets_to_check)} websites...")
with ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(lambda x: check_website(*x), vets_to_check))

found = [r for r in results if r]
print(f"--- Sites with likely English support ({len(found)}) ---")
for f in found:
    print(f"{f[0]}: {f[1]} ({f[2]})")

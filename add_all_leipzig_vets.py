
import csv
import re
import os
from datetime import datetime

# Files
source_csv = r"C:\Users\emreo\Documents\Vet Directory\Leipzig.csv"
target_csv = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
today = datetime.now().strftime("%Y-%m-%d")

# 1. Load existing DB to check for duplicates
existing_names = set()
last_id_num = 0
with open(target_csv, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        existing_names.add(row['Practice Name'].strip())
        if row['ID'].startswith('Leipzig-'):
            try:
                num = int(row['ID'].split('-')[1])
                if num > last_id_num: last_id_num = num
            except: pass

print(f"Found {len(existing_names)} existing vets. Last Leipzig ID: {last_id_num}")

# 2. Extract coordinates helper
def extract_coords(url):
    lat_match = re.search(r'!3d(-?\d+\.\d+)', url)
    lng_match = re.search(r'!4d(-?\d+\.\d+)', url)
    if lat_match and lng_match:
        return float(lat_match.group(1)), float(lng_match.group(1))
    return "", ""

# 3. Detect Emergency/Mobile
def detect_services(row_str):
    services = []
    lower_str = row_str.lower()
    if "notdienst" in lower_str or "notfall" in lower_str or "24/7" in lower_str or "emergency" in lower_str:
        services.append("Emergency Service")
    if "mobil" in lower_str or "mobile" in lower_str or "hausbesuch" in lower_str:
        services.append("Mobile Service")
    return "; ".join(services)

# 4. Prepare new entries
new_vets = []
current_id = last_id_num + 1

with open(source_csv, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        if i < 3: continue 
        if not row or len(row) < 2: continue
        
        url = row[0]
        name = row[1].strip()
        
        # Skip if name empty or duplicate
        if not name or name in existing_names:
            continue
            
        # Basic field mapping (heuristics based on col index from previous analysis)
        # Col 1: Name, Col 2: Category, Col 4: Address, Col 6: Phone, Col 7: Website (approx)
        category = row[2] if len(row) > 2 else ""
        address = row[4] if len(row) > 4 else ""
        phone = row[6] if len(row) > 6 else ""
        website = row[7] if len(row) > 7 else ""
        
        # Basic cleanup
        if website and not website.startswith("http"): website = "" 
        
        # Coords
        lat, lng = extract_coords(url)
        
        # Services
        row_full_str = " ".join(row)
        services = detect_services(row_full_str)
        
        vet_entry = {
            "ID": f"Leipzig-{current_id}",
            "Practice Name": name,
            "City": "Leipzig",
            "District": "Leipzig", # Default, hard to extract accurately without geocoder
            "Address": address,
            "Latitude": lat,
            "Longitude": lng,
            "Phone": phone,
            "Website": website,
            "Verification Status": "Unverified",
            "Last Verified": today,
            "English Signals": "",
            "Emergency Services": services
        }
        
        new_vets.append(vet_entry)
        current_id += 1

# 5. Append to CSV
if new_vets:
    with open(target_csv, 'a', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            "ID", "Practice Name", "City", "District", "Address", "Latitude", "Longitude",
            "Phone", "Website", "Verification Status", "Last Verified", "English Signals", "Emergency Services"
        ])
        for vet in new_vets:
            writer.writerow(vet)
    print(f"Added {len(new_vets)} new Unverified Leipzig vets to {target_csv}")
else:
    print("No new vets found to add.")

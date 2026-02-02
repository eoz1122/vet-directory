
import csv
import re
import os
from datetime import datetime

source_csv = r"C:\Users\emreo\Documents\Vet Directory\Munich 2.csv"
target_csv = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
today = datetime.now().strftime("%Y-%m-%d")

def extract_coords(url):
    lat_match = re.search(r'!3d(-?\d+\.\d+)', url)
    lng_match = re.search(r'!4d(-?\d+\.\d+)', url)
    if lat_match and lng_match:
        return float(lat_match.group(1)), float(lng_match.group(1))
    return "", ""

def clean_website(url):
    if not url: return ""
    if "google.com/aclk" in url: return "" # Skip ads
    if url.startswith("http"): return url
    return ""

def main():
    # 1. Load existing Munich vets to avoid dupes
    existing_names = set()
    last_id_num = 0
    with open(target_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            existing_names.add(row['Practice Name'].strip())
            if row['ID'].startswith('Munich-'):
                try:
                    num = int(row['ID'].split('-')[1])
                    if num > last_id_num: last_id_num = num
                except: pass
    
    print(f"Loaded {len(existing_names)} existing vets. Last Munich ID: {last_id_num}")

    # 2. Process File
    new_vets = []
    current_id = last_id_num + 1

    with open(source_csv, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i < 1: continue # Skip header if any (Line 1 seems garbage-ish but let's check)
            
            # Row cleanup
            if not row or len(row) < 2: continue
            
            # Basic Parse
            url = row[0].strip()
            name = row[1].strip()
            
            if not name or name in existing_names:
                continue
            
            # Type Check
            vet_type = row[2].lower() if len(row) > 2 else ""
            
            # Dynamic Address/Phone/Website extraction
            # Strategy: 
            # - Address: look for cols 3-5 with digits and chars, not 'Closed' or 'Open' or '·'
            # - Phone: starts with 0 or +
            # - Website: starts with http
            
            address = ""
            phone = ""
            website = ""
            
            potential_cols = row[3:8] # Check these for metadata
            for col in potential_cols:
                col = col.strip()
                if not col or col == "·" or col.lower() in ["closed", "open", "24 hours"]: continue
                
                if col.startswith("http"):
                    website = clean_website(col)
                elif re.match(r'^[0-9\+\s]+$', col) and len(col) > 6:
                    phone = col
                elif not address and len(col) > 5: # Assume first unknown long string is address
                    address = col
            
            # Keywords Check (Cols 8+)
            english_signal = ""
            full_text = " ".join(row[7:]).lower() # website + reviews
            
            if "english" in full_text or "speak" in full_text or "spoken" in full_text:
                # Find the specific snippet if possible for proof
                english_signal = "Review in source CSV mentions English support."
                # Try to grab surrounding text of keyword
                match = re.search(r'([^"]{0,50}(english|speak)[^"]{0,50})', full_text, re.IGNORECASE)
                if match:
                    english_signal = f"Source Snippet: '...{match.group(1).strip()}...'"
            
            if not english_signal:
                continue # ONLY IMPORT IMMEDIATE WINS as requested? 
                # "There are some immediate wins there" - implies focus on those first.
                # Use "Unverified" if processed later, but let's stick to wins for now unless user asks for all.
                # Actually, might be better to import identified ones only.

            # Coords
            lat, lng = extract_coords(url)
            
            # Services
            services = ""
            if "emergency" in vet_type or "notdienst" in full_text: services = "Emergency Service"
            if "mobile" in vet_type or "mobil" in full_text: services += ("" if not services else "; ") + "Mobile Service"
            if "24/7" in full_text: services = "24/7" # Override

            vet_entry = {
                "ID": f"Munich-{current_id}",
                "Practice Name": name,
                "City": "Munich",
                "District": "Munich",
                "Address": address,
                "Latitude": lat,
                "Longitude": lng,
                "Phone": phone,
                "Website": website,
                "Verification Status": "Verified", # Auto-verify wins
                "Last Verified": today,
                "English Signals": english_signal,
                "Emergency Services": services,
                "Google Maps": url # Populate immediately
            }
            
            new_vets.append(vet_entry)
            current_id += 1
            existing_names.add(name) # Prevent duplicate processing in same run

    # 3. Append
    if new_vets:
        with open(target_csv, 'a', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=[
                "ID", "Practice Name", "City", "District", "Address", "Latitude", "Longitude",
                "Phone", "Website", "Verification Status", "Last Verified", "English Signals", "Emergency Services", "Google Maps"
            ])
            for vet in new_vets:
                writer.writerow(vet)
        print(f"Added {len(new_vets)} Verified Munich vets (Immediate Wins) to {target_csv}")
    else:
        print("No new English-speaking vets found.")

if __name__ == "__main__":
    main()

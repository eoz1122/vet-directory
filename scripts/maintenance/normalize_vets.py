import csv
import json
import re
import sqlite3
from datetime import datetime

def extract_coords(url):
    match = re.search(r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', url)
    if match:
        return float(match.group(1)), float(match.group(2))
    return None, None

def is_phone(s):
    return re.match(r'^(\+?\d{1,4}[\s\-/]?)?(\d{2,5}[\s\-/]?)?[\d\s\-/]{5,15}$', s.strip())

def is_address(s):
    keywords = ["Str.", "Straße", "Straßen", "Platz", "Allee", "Weg", "Damm", "Ring", "Ufer", "Gasse", "Promenade", "Steig", "Kai", "Hauptstraße"]
    return any(k.lower() in s.lower() for k in keywords) and any(d.isdigit() for d in s)

def is_real_website(s):
    if not s.startswith('http'): return False
    exclude = ["gstatic.com", "google.com/aclk", "google.com/maps"]
    return not any(e in s for e in exclude)

def get_district(address):
    # Very simple heuristic for Berlin districts
    districts = ["Mitte", "Friedrichshain", "Kreuzberg", "Pankow", "Prenzlauer Berg", "Charlottenburg", "Wilmersdorf", "Spandau", "Steglitz", "Zehlendorf", "Tempelhof", "Schöneberg", "Neukölln", "Treptow", "Köpenick", "Marzah", "Hellersdorf", "Lichtenberg", "Reinickendorf"]
    for d in districts:
        if d.lower() in address.lower():
            return d
    return "Berlin"

def process_csv(filepath):
    vets = []
    with open(filepath, mode='r', encoding='utf-8') as f:
        reader = csv.reader(f)
        try:
            next(reader)
        except StopIteration:
            return []
            
        for row in reader:
            if not row or len(row) < 2:
                continue
            
            url = row[0]
            name = row[1]
            if not name:
                continue
                
            lat, lng = extract_coords(url)
            
            address = ""
            phone = ""
            website = ""
            
            for cell in row:
                cell = cell.strip()
                if not cell: continue
                
                if is_real_website(cell) and not website:
                    website = cell
                elif is_phone(cell) and not phone:
                    phone = cell
                elif is_address(cell) and not address:
                    address = cell
            
            if address and "Berlin" not in address:
                address += ", Berlin"

            if address or phone:
                vets.append({
                    "practice_name": name,
                    "address": address,
                    "lat": lat,
                    "lng": lng,
                    "phone": phone,
                    "website": website,
                    "google_maps": url
                })
    return vets

def main():
    files = ["google.csv", "google (1).csv"]
    all_vets = []
    for f in files:
        all_vets.extend(process_csv(f))
    
    unique_vets = {}
    for v in all_vets:
        key = (v['practice_name'].lower(), (v['address'] or v['phone']).lower())
        if key not in unique_vets:
            unique_vets[key] = v
            
    final_list = []
    count = 1
    today = datetime.now().strftime("%Y-%m-%d")

    # SQLite Setup (Local DB)
    conn = sqlite3.connect('vets_berlin_potential.db')
    cursor = conn.cursor()
    cursor.execute('DROP TABLE IF EXISTS vets')
    cursor.execute('''
        CREATE TABLE vets (
            id TEXT PRIMARY KEY,
            practice_name TEXT,
            address TEXT,
            district TEXT,
            city TEXT,
            lat REAL,
            lng REAL,
            phone TEXT,
            website TEXT,
            google_maps TEXT,
            community_status TEXT,
            source_date TEXT
        )
    ''')

    for v in unique_vets.values():
        v_id = f"Berlin-Pot-{count:03d}"
        district = get_district(v['address'])
        
        cursor.execute('''
            INSERT INTO vets (id, practice_name, address, district, city, lat, lng, phone, website, google_maps, community_status, source_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (v_id, v['practice_name'], v['address'], district, "Berlin", v['lat'], v['lng'], v['phone'], v['website'], v['google_maps'], "Unverified", today))
        
        # Format for JSON output (aligned with vets.json structure)
        formatted_v = {
            "id": v_id,
            "practice_name": v['practice_name'],
            "city": "Berlin",
            "district": district,
            "address": v['address'],
            "coordinates": {
                "lat": v['lat'],
                "lng": v['lng']
            },
            "contact": {
                "phone": v['phone'] or None,
                "website": v['website'] or None,
                "google_maps": v['google_maps']
            },
            "verification": {
                "ai_score": 0,
                "last_scanned": today,
                "english_signals": [],
                "status": "Unverified (Not confirmed English yet)"
            },
            "community_status": "Unverified"
        }
        final_list.append(formatted_v)
        count += 1
        
    conn.commit()
    conn.close()
        
    with open('processed_berlin_potential.json', 'w', encoding='utf-8') as f:
        json.dump(final_list, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Processed {len(final_list)} potential Berlin vets.")
    print(f"📦 Local database: vets_berlin_potential.db")
    print(f"📄 Local JSON: processed_berlin_potential.json")

if __name__ == "__main__":
    main()

import csv
import json
import re
import os
from datetime import datetime

def normalize_string(s):
    if not s: return ""
    return "".join(filter(str.isalnum, s.lower()))

def normalize_city(city):
    if not city or city.lower() == "unknown":
        return "Unknown"
    city = city.strip().title()
    if "Frankfurt" in city:
        return "Frankfurt"
    return city

def extract_city(address, filename_city=None):
    if not address: return filename_city if filename_city else "Unknown"
    address_lower = address.lower()
    
    if "berlin" in address_lower: return "Berlin"
    if "hamburg" in address_lower: return "Hamburg"
    if "frankfurt" in address_lower: return "Frankfurt"
    if "stuttgart" in address_lower: return "Stuttgart"
    if "munich" in address_lower or "münchen" in address_lower: return "Munich"
    
    match = re.search(r'\d{5}\s+([a-zA-ZäöüÄÖÜß-]+)', address)
    if match:
        return normalize_city(match.group(1))
        
    return filename_city if filename_city else "Unknown"

def process_csv(filename, vets, next_id_num, today):
    new_count = 0
    updated_count = 0
    
    # Try to guess city from filename
    filename_city = None
    known_cities = ['hamburg', 'frankfurt', 'stuttgart', 'munich', 'berlin']
    for c in known_cities:
        if c in filename.lower():
            filename_city = c.title()
            break

    try:
        with open(filename, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            rows = list(reader)
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return next_id_num, 0, 0

    for row in rows:
        if len(row) < 5: continue
        row_str = " ".join(row).lower()
        
        if "english" in row_str or "spoke" in row_str or "fluent" in row_str:
            name = row[1]
            if not name or name == "qBF1Pd" or len(name) < 3: continue
            
            address = ""
            phone = None
            website = None
            
            for i in [7, 8, 9, 6]:
                if i < len(row) and len(row[i]) > 8 and any(char.isdigit() for char in row[i]):
                    address = row[i]
                    break
            
            for i in range(len(row)):
                is_phone = re.search(r'\+?\d{8,}', row[i].replace(" ", ""))
                if is_phone:
                    phone = row[i]
                    break
            
            for i in range(len(row)):
                if row[i].startswith('http') and ".google.com" not in row[i]:
                    website = row[i]
                    break
            
            review_text = ""
            for i in range(len(row)-1, 15, -1):
                if len(row[i]) > 3:
                    review_text = row[i].replace('"', '').strip()
                    if i > 19 and len(row[i-1]) > 3:
                        review_text = row[i-1] + " " + review_text
                    break
            
            if not review_text and len(row) > 19:
                review_text = row[19].replace('"', '').strip()

            signal = f"Confirmed via Google Review: \"{review_text[:120]}...\"" if len(review_text) > 120 else f"Confirmed via Google Review: \"{review_text}\""

            city = extract_city(address, filename_city)
            city = normalize_city(city)

            norm_name = normalize_string(name)
            existing = None
            for v in vets:
                if normalize_string(v['practice_name']) == norm_name:
                    existing = v
                    break
            
            if existing:
                if signal not in existing['verification']['english_signals']:
                    existing['verification']['english_signals'].append(signal)
                    existing['verification']['last_scanned'] = today
                    existing['community_status'] = "Verified"
                    updated_count += 1
            else:
                new_vet = {
                    "id": f"{city}-{next_id_num}",
                    "practice_name": name,
                    "city": city,
                    "district": "Unknown",
                    "address": address,
                    "coordinates": {"lat": 0, "lng": 0},
                    "contact": {"phone": phone, "website": website},
                    "verification": {
                        "ai_score": 90,
                        "last_scanned": today,
                        "english_signals": [signal]
                    },
                    "community_status": "Verified"
                }
                vets.append(new_vet)
                next_id_num += 1
                new_count += 1

    return next_id_num, new_count, updated_count

def main():
    vets_file = 'web-app/src/data/vets.json'
    if not os.path.exists(vets_file):
        print("vets.json not found")
        return

    with open(vets_file, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    all_nums = []
    for v in vets:
        parts = v['id'].split('-')
        if parts[-1].isdigit(): all_nums.append(int(parts[-1]))
    next_id_num = max(all_nums) + 1 if all_nums else 1
    
    today = datetime.now().strftime("%Y-%m-%d")
    
    files_to_process = [f for f in os.listdir('.') if f.endswith('.csv') and any(c in f.lower() for c in ['hamburg', 'frankfurt', 'stuttgart', 'munich'])]
    
    total_new = 0
    total_updated = 0
    
    for filename in files_to_process:
        print(f"Processing {filename}...")
        next_id_num, n, u = process_csv(filename, vets, next_id_num, today)
        total_new += n
        total_updated += u
        print(f"  -> Added {n}, Updated {u}")

    if total_new + total_updated > 0:
        with open(vets_file, 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print(f"\nDone! Total New: {total_new}, Total Updated: {total_updated}")
    else:
        print("\nNo changes made.")

if __name__ == "__main__":
    main()

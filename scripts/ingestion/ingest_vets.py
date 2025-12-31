import csv
import json
import re
import os
import glob
from datetime import datetime

# Configuration
INPUT_DIR = os.path.join('data', 'input')
VETS_FILE = os.path.join('web-app', 'src', 'data', 'vets.json')

def normalize_string(s):
    if not s: return ""
    return "".join(filter(str.isalnum, s.lower()))

def normalize_city(city):
    if not city or city.lower() == "unknown":
        return "Unknown"
    city = city.strip().title()
    # Manual fixes
    if "Frankfurt" in city: return "Frankfurt"
    if "Munich" in city or "München" in city: return "Munich"
    if "Nuremberg" in city or "Nürnberg" in city: return "Nuremberg"
    return city

def extract_city(address, city_hint=None):
    if not address: return city_hint if city_hint else "Unknown"
    address_lower = address.lower()
    
    if "berlin" in address_lower: return "Berlin"
    if "hamburg" in address_lower: return "Hamburg"
    if "frankfurt" in address_lower: return "Frankfurt"
    if "stuttgart" in address_lower: return "Stuttgart"
    if "munich" in address_lower or "münchen" in address_lower: return "Munich"
    if "nuremberg" in address_lower or "nürnberg" in address_lower: return "Nuremberg"
    if "leipzig" in address_lower: return "Leipzig"
    if "dresden" in address_lower: return "Dresden"
    if "cologne" in address_lower or "köln" in address_lower: return "Cologne"
    if "hannover" in address_lower: return "Hannover"
    
    match = re.search(r'\d{5}\s+([a-zA-ZäöüÄÖÜß-]+)', address)
    if match:
        return normalize_city(match.group(1))
        
    return city_hint if city_hint else "Unknown"

def process_csv(filename, vets, next_id_num, today):
    new_count = 0
    updated_count = 0
    
    print(f"Reading {filename}...")
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return next_id_num, 0, 0

    for row in rows:
        name = row.get('name', '').strip()
        if not name: continue
        
        address = row.get('address', '').strip()
        city_hint = row.get('city_hint', '').strip()
        phone = row.get('phone', '').strip()
        website = row.get('website', '').strip()
        google_maps = row.get('google_maps', '').strip()
        reviews = row.get('reviews', '').strip()
        
        # Check for English signals in reviews
        review_text = reviews.lower()
        signal = ""
        if "english" in review_text or "speak" in review_text or "fluent" in review_text:
             signal = f"Confirmed via Google Review: \"{reviews[:100]}...\"" if len(reviews) > 100 else f"Confirmed via Google Review: \"{reviews}\""
        
        # If no signal found in consolidated csv reviews column, skip unless explicitly marked (which we assume consolidated csv candidates are interesting)
        # Actually, let's keep all from consolidated if they have a name, as consolidation step already did some filtering? 
        # No, consolidation just merged. We should still apply filter if we want high confidence.
        # But user asked to tidy up and compile.
        
        # Let's assume if it is in potential_vets_consolidated.csv it is a candidate.
        if not signal:
             # Basic signal
             signal = "Potential English-speaking vet (from consolidated list)"

        city = extract_city(address, normalize_city(city_hint))
        city = normalize_city(city)

        norm_name = normalize_string(name)
        
        existing = None
        for v in vets:
            if normalize_string(v.get('practice_name', '')) == norm_name:
                existing = v
                break
            # Check by google maps link if available
            contact = v.get('contact', {}) or {}
            existing_map = contact.get('google_maps', '')
            if existing_map and google_maps and existing_map.split('?')[0] == google_maps.split('?')[0]:
                existing = v
                break
        
        if existing:
            # Update logic
            changed = False
            
            # Update address if missing or better
            old_addr = existing.get('address', '')
            if address and len(address) > len(old_addr):
                existing['address'] = address
                changed = True
            
            # Update contacts
            if phone and not existing.get('contact', {}).get('phone'):
                existing.setdefault('contact', {})['phone'] = phone
                changed = True
            if website and not existing.get('contact', {}).get('website'):
                existing.setdefault('contact', {})['website'] = website
                changed = True
            if google_maps and not existing.get('contact', {}).get('google_maps'):
                existing.setdefault('contact', {})['google_maps'] = google_maps
                changed = True
                
            # Add signal
            current_signals = existing.get('verification', {}).get('english_signals', [])
            if signal and signal not in current_signals:
                existing.setdefault('verification', {})
                if 'english_signals' not in existing['verification']:
                    existing['verification']['english_signals'] = []
                existing['verification']['english_signals'].append(signal)
                existing['verification']['last_scanned'] = today
                changed = True
            
            if changed:
                updated_count += 1
                # print(f"Updated {name}")
                
        else:
            # Add new
            # print(f"Adding New: {name}")
            new_vet = {
                "id": f"{city}-{next_id_num}",
                "practice_name": name,
                "city": city,
                "district": "Unknown",
                "address": address,
                "coordinates": {"lat": 0, "lng": 0},
                "contact": {
                    "phone": phone, 
                    "website": website,
                    "google_maps": google_maps
                },
                "verification": {
                    "ai_score": 50, # Default for bulk ingest
                    "last_scanned": today,
                    "english_signals": [signal]
                },
                "community_status": "Pending" 
            }
            vets.append(new_vet)
            next_id_num += 1
            new_count += 1

    return next_id_num, new_count, updated_count

def main():
    if not os.path.exists(VETS_FILE):
        print(f"Error: {VETS_FILE} not found. Run from project root.")
        return

    print(f"Loading {VETS_FILE}...")
    with open(VETS_FILE, 'r', encoding='utf-8') as f:
        try:
            vets = json.load(f)
        except json.JSONDecodeError:
            print("Error decoding vets.json")
            return

    # Determine next ID
    all_nums = []
    for v in vets:
        parts = v.get('id', '').split('-')
        if len(parts) > 1 and parts[-1].isdigit():
            all_nums.append(int(parts[-1]))
    next_id_num = max(all_nums) + 1 if all_nums else 1
    
    today = datetime.now().strftime("%Y-%m-%d")
    
    # Process consolidated input
    input_files = glob.glob(os.path.join(INPUT_DIR, '*.csv'))
    
    if not input_files:
        print(f"No CSV files found in {INPUT_DIR}")
        return
        
    total_new = 0
    total_updated = 0
    
    for filename in input_files:
        next_id_num, n, u = process_csv(filename, vets, next_id_num, today)
        total_new += n
        total_updated += u
    
    if total_new + total_updated > 0:
        print(f"Saving {total_new} new and {total_updated} updated records to {VETS_FILE}...")
        with open(VETS_FILE, 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print("Done.")
    else:
        print("No changes found.")

if __name__ == "__main__":
    main()

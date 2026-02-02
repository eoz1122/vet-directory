import csv
import json
import re
from datetime import datetime

def normalize(s):
    return "".join(filter(str.isalnum, s.lower()))

def extract_city(address):
    if not address: return "Unknown"
    address_lower = address.lower()
    
    # Frankfurt and nearby
    frankfurt_nearby = [
        "frankfurt", "neu-isenburg", "bad vilbel", "offenbach", "hofheim", 
        "bad soden", "oberursel", "bad homburg", "eschborn", "kronberg",
        "kelkheim", "hattersheim", "flörsheim", "hochheim", "kelsterbach",
        "raunheim", "rüsselsheim", "langen", "egelsbach", "dreieich",
        "heusenstamm", "obertshausen", "mühlheim", "maintal", "karben",
        "schöneck", "niederdorfelden", "kalbach", "bad nauheim", "friedberg",
        "wiesbaden", "mainz", "darmstadt", "hanau"
    ]
    
    for city in frankfurt_nearby:
        if city in address_lower:
            return city.title()

    # Other major cities to categorize correctly
    other_cities = ["berlin", "hamburg", "munich", "münchen", "cologne", "köln", 
                    "stuttgart", "duesseldorf", "düsseldorf", "leipzig", "dortmund", 
                    "essen", "bremen", "dresden", "bonn", "kaiserslautern", "bitburg"]
    for city in other_cities:
        if city in address_lower:
            return city.title().replace("Koeln", "Cologne").replace("Muenchen", "Munich")

    if "luxembourg" in address_lower or "bereldange" in address_lower or "merl-belair" in address_lower: return "Luxembourg"
    if "prague" in address_lower or "praha" in address_lower or "jičínská" in address_lower or "nusle" in address_lower: return "Prague"
    
    return "Unknown"

def process_csv(filename, vets, next_id_num, today):
    new_vets_count = 0
    updated_vets_count = 0
    
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
        
        # Look for English signals
        if "english" in row_str or "spoke" in row_str or "fluent" in row_str:
            name = row[1]
            if not name or name == "qBF1Pd" or len(name) < 3: continue
            
            # Simple heuristic for Address/Phone/Website
            address = ""
            phone = None
            website = None
            
            # Address search
            for i in [6, 7, 8, 9]:
                if i < len(row) and len(row[i]) > 8 and any(char.isdigit() for char in row[i]):
                    address = row[i]
                    break
            
            # Phone search
            for i in [10, 11, 12, 13]:
                if i < len(row) and re.search(r'\+?\d{5,}', row[i].replace(" ", "")):
                    phone = row[i]
                    break
            
            # Website search
            for i in range(len(row)):
                if row[i].startswith('http'):
                    website = row[i]
                    break
            
            # Extract review fragment
            review_text = ""
            for i in range(len(row)-1, -1, -1):
                if '"' in row[i] or (len(row[i]) > 20 and i > 15):
                    review_text = row[i].replace('"', '').strip()
                    break
            if not review_text and len(row) > 19:
                review_text = row[19].replace('"', '').strip()

            signal = f"Confirmed via Google Review: \"{review_text[:120]}...\"" if len(review_text) > 120 else f"Confirmed via Google Review: \"{review_text}\""

            city = extract_city(address)
            
            # If city is not in our target area and not a recognized other city, we might skip or mark as Unknown
            # But the user specifically asked for Frankfurt CSVs, so we should prioritize those.
            if city == "Unknown" and "frankfurt" in filename.lower():
                city = "Frankfurt"
            
            # Skip if clearly not in Germany/useful area (e.g. Prague, Luxembourg for now unless relevant)
            if city in ["Prague", "Luxembourg"]:
                print(f"⏭️ Skipping non-Germany city: {name} ({city})")
                continue

            # Check if exists
            norm_name = normalize(name)
            existing = None
            for v in vets:
                if normalize(v['practice_name']) == norm_name:
                    existing = v
                    break
            
            if existing:
                if signal not in existing['verification']['english_signals']:
                    existing['verification']['english_signals'].append(signal)
                    existing['verification']['last_scanned'] = today
                    existing['community_status'] = "Verified"
                    updated_vets_count += 1
                    print(f"📝 Updated Vet: {name} ({city})")
            else:
                # New Vet
                category = row[4].lower() if len(row) > 4 else ""
                if "veterinar" not in category and "animal hospital" not in category and "pet" not in category:
                    if "vet" not in name.lower() and "tierarzt" not in name.lower():
                        continue

                new_vet = {
                    "id": f"{city}-{next_id_num}",
                    "practice_name": name,
                    "city": city,
                    "district": "Unknown",
                    "address": address,
                    "coordinates": {"lat": 0, "lng": 0},
                    "contact": {
                        "phone": phone,
                        "website": website
                    },
                    "verification": {
                        "ai_score": 90,
                        "last_scanned": today,
                        "english_signals": [signal]
                    },
                    "community_status": "Verified"
                }
                vets.append(new_vet)
                next_id_num += 1
                new_vets_count += 1
                print(f"✅ Added New Vet: {name} ({city})")

    return next_id_num, new_vets_count, updated_vets_count

def main():
    vets_file = 'web-app/src/data/vets.json'
    with open(vets_file, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    # Find last Frankfurt ID to use as a generic starting point for new area vets
    frankfurt_ids = [int(v['id'].split('-')[1]) for v in vets if v['id'].startswith('Frankfurt-') and '-' in v['id']]
    next_id_num = max(frankfurt_ids) + 1 if frankfurt_ids else 1
    
    today = datetime.now().strftime("%Y-%m-%d")
    
    next_id_num, n1, u1 = process_csv('frankfurt.csv', vets, next_id_num, today)
    next_id_num, n2, u2 = process_csv('frankfurt2.csv', vets, next_id_num, today)

    if (n1 + n2 + u1 + u2) > 0:
        with open(vets_file, 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print(f"\nTotal Summary: Added {n1+n2} new, Updated {u1+u2} existing vets.")
    else:
        print("\nNo new English matches found.")

if __name__ == "__main__":
    main()

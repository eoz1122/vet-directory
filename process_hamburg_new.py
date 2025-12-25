import csv
import json
import re
from datetime import datetime

def normalize(s):
    return "".join(filter(str.isalnum, s.lower()))

def extract_city(address):
    if not address: return "Unknown"
    address_lower = address.lower()
    if "hamburg" in address_lower: return "Hamburg"
    if "norderstedt" in address_lower: return "Norderstedt"
    if "pinneberg" in address_lower: return "Pinneberg"
    if "ahrensburg" in address_lower: return "Ahrensburg"
    if "wedel" in address_lower: return "Wedel"
    if "reinbek" in address_lower: return "Reinbek"
    if "lüneburg" in address_lower: return "Lüneburg"
    if "quickborn" in address_lower: return "Quickborn"
    if "uetersen" in address_lower: return "Uetersen"
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
            
            # Address search (usually index 7 or 8 in this export)
            for i in [7, 8, 9, 6]:
                if i < len(row) and len(row[i]) > 8 and any(char.isdigit() for char in row[i]):
                    address = row[i]
                    break
            
            # Phone search
            for i in range(len(row)):
                if re.search(r'\+?\d{8,}', row[i].replace(" ", "")) or (len(row[i]) > 7 and row[i].startswith('040')):
                    phone = row[i]
                    break
            
            # Website search
            for i in range(len(row)):
                if row[i].startswith('http') and ".google.com" not in row[i]:
                    website = row[i]
                    break
            
            # Extract review fragment
            review_text = ""
            for i in range(len(row)-1, 15, -1):
                if len(row[i]) > 3:
                    review_text = row[i].replace('"', '').strip()
                    # If multiple parts, try to combine
                    if i > 19 and len(row[i-1]) > 3:
                        review_text = row[i-1] + " " + review_text
                    break
            
            if not review_text and len(row) > 19:
                review_text = row[19].replace('"', '').strip()

            signal = f"Confirmed via Google Review: \"{review_text[:120]}...\"" if len(review_text) > 120 else f"Confirmed via Google Review: \"{review_text}\""

            city = extract_city(address)
            if city == "Unknown" and "hamburg" in filename.lower():
                city = "Hamburg"

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
                    print(f"📝 Updated Hamburg Vet: {name} ({city})")
            else:
                # New Vet
                category = row[4].lower() if len(row) > 4 else ""
                if "veterinar" not in category and "animal hospital" not in category:
                    if "vet" not in name.lower() and "tierarzt" not in name.lower():
                        print(f"⏭️ Skipping non-vet: {name} ({category})")
                        continue

                new_vet = {
                    "id": f"{city}-{next_id_num}" if city != "Unknown" else f"Hamburg-{next_id_num}",
                    "practice_name": name,
                    "city": city if city != "Unknown" else "Hamburg",
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
                print(f"✅ Added New Hamburg Vet: {name} ({city})")

    return next_id_num, new_vets_count, updated_vets_count

def main():
    vets_file = 'web-app/src/data/vets.json'
    with open(vets_file, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    # Find last Hamburg ID
    hamburg_ids = [int(v['id'].split('-')[1]) for v in vets if v['id'].startswith('Hamburg-') and '-' in v['id']]
    next_id_num = max(hamburg_ids) + 1 if hamburg_ids else 1
    
    today = datetime.now().strftime("%Y-%m-%d")
    
    next_id_num, n1, u1 = process_csv('hamburg.csv', vets, next_id_num, today)

    if (n1 + u1) > 0:
        with open(vets_file, 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print(f"\nTotal Summary: Added {n1} new, Updated {u1} existing Hamburg vets.")
    else:
        print("\nNo new English matches found in Hamburg CSV.")

if __name__ == "__main__":
    main()

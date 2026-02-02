import csv
import json
import re
from datetime import datetime

def process_hamburg():
    csv_file = 'hamburg english speaking.csv'
    vets_file = 'web-app/src/data/vets.json'
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            rows = list(reader)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    with open(vets_file, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    # Find last Hamburg ID
    hamburg_ids = [int(v['id'].split('-')[1]) for v in vets if v['id'].startswith('Hamburg-') and '-' in v['id']]
    next_id_num = max(hamburg_ids) + 1 if hamburg_ids else 1
    
    today = datetime.now().strftime("%Y-%m-%d")
    new_vets_count = 0
    updated_vets_count = 0

    def normalize(s):
        return "".join(filter(str.isalnum, s.lower()))

    for row in rows:
        if len(row) < 5: continue
        row_str = " ".join(row).lower()
        
        if "english" in row_str:
            name = row[1]
            if not name or name == "qBF1Pd": continue
            
            # Simple heuristic for Address/Phone/Website based on observations
            address = ""
            phone = None
            website = None
            
            # Address is usually in index 6 or 7
            if len(row) > 7 and len(row[7]) > 5: address = row[7]
            elif len(row) > 6 and len(row[6]) > 5: address = row[6]
            
            # Website usually starts with http at 11 or 12
            for i in [11, 12, 13]:
                if i < len(row) and row[i].startswith('http'):
                    website = row[i]
                    break
            
            # Phone is usually index 10
            if len(row) > 10 and re.search(r'\d{3,}', row[10]):
                phone = row[10]
            
            # Extract review fragment
            review_parts = [r for r in row[15:] if len(r.strip()) > 3]
            review_text = " ".join(review_parts).replace('"', '').strip()
            signal = f"Confirmed via Google Review: \"{review_text[:120]}...\"" if len(review_text) > 120 else f"Confirmed via Google Review: \"{review_text}\""

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
                    print(f"📝 Updated Hamburg Vet: {name}")
            else:
                # New Vet
                new_vet = {
                    "id": f"Hamburg-{next_id_num}",
                    "practice_name": name,
                    "city": "Hamburg",
                    "district": "Unknown", # We'll need to fix this later or infer
                    "address": f"{address}, Hamburg" if address and "hamburg" not in address.lower() else address,
                    "coordinates": {"lat": 0, "lng": 0}, # Needs geocoding/manual fix
                    "contact": {
                        "phone": phone,
                        "website": website
                    },
                    "verification": {
                        "ai_score": 95,
                        "last_scanned": today,
                        "english_signals": [signal]
                    },
                    "community_status": "Verified"
                }
                vets.append(new_vet)
                next_id_num += 1
                new_vets_count += 1
                print(f"✅ Added New Hamburg Vet: {name}")

    if new_vets_count > 0 or updated_vets_count > 0:
        with open(vets_file, 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print(f"\nSummary: Added {new_vets_count} new, Updated {updated_vets_count} existing Hamburg vets.")
    else:
        print("\nNo new English matches found in Hamburg CSV.")

if __name__ == "__main__":
    process_hamburg()

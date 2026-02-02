import csv
import json
import re
from datetime import datetime

def parse_new_csv():
    filepath = 'english speaking search.csv'
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            rows = list(reader)
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    # We need to find the "Comments" which seem to be spread across multiple columns
    # In row 6, practice is "Tierarztpraxis Rödiger"
    # Columns are roughly: URL, Name, Rating, Reviews, Category, ..., Website, ..., Review Fragment
    
    confirmed_from_csv = []
    
    for row in rows:
        if len(row) < 5: continue
        name = row[1]
        url = row[0]
        
        # Look for English cues in the whole row
        row_str = " ".join(row).lower()
        if "english" in row_str or "speak" in row_str:
            # Extract the review fragment for the verification signal
            # It seems reviews start around index 18-22
            review_parts = [r for r in row[15:] if len(r.strip()) > 5]
            review_text = " ".join(review_parts).replace('"', '').strip()
            
            if "english" in review_text.lower() or "speak" in review_text.lower():
                confirmed_from_csv.append({
                    "name": name,
                    "url": url,
                    "signal": f"Confirmed via Google Review: \"{review_text[:100]}...\"" if len(review_text) > 100 else f"Confirmed via Google Review: \"{review_text}\""
                })

    print(f"Found {len(confirmed_from_csv)} candidates in CSV.")
    
    # Load vets.json
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    # Load potential vets
    with open('processed_berlin_potential.json', 'r', encoding='utf-8') as f:
        potential_vets = json.load(f)

    today = datetime.now().strftime("%Y-%m-%d")
    berlin_ids = [int(v['id'].split('-')[1]) for v in vets if v['id'].startswith('Berlin-') and v['id'].split('-')[1].isdigit()]
    next_id_num = max(berlin_ids) + 1 if berlin_ids else 1
    
    def normalize(s):
        return "".join(filter(str.isalnum, s.lower()))

    moved = 0
    updated_existing = 0
    remaining_potentials = []
    
    # Process potential list first
    for v in potential_vets:
        v_norm = normalize(v['practice_name'])
        match = None
        for c in confirmed_from_csv:
            if normalize(c['name']) == v_norm or v_norm in normalize(c['name']) or normalize(c['name']) in v_norm:
                match = c
                break
        
        if match:
            v['id'] = f"Berlin-{next_id_num}"
            next_id_num += 1
            v['verification'] = {
                "ai_score": 95,
                "last_scanned": today,
                "english_signals": [match['signal']]
            }
            v['community_status'] = "Verified"
            if 'status' in v['verification']: del v['verification']['status']
            vets.append(v)
            moved += 1
            print(f"✅ Moved from potential: {v['practice_name']}")
        else:
            remaining_potentials.append(v)

    # Now check existing vets to see if we can add the review signal to them
    for v in vets:
        v_norm = normalize(v['practice_name'])
        for c in confirmed_from_csv:
            if normalize(c['name']) == v_norm:
                if c['signal'] not in v['verification'].get('english_signals', []):
                    v['verification'].setdefault('english_signals', []).append(c['signal'])
                    v['verification']['last_scanned'] = today
                    updated_existing += 1
                    print(f"📝 Added review signal to: {v['practice_name']}")

    if moved > 0 or updated_existing > 0:
        with open('web-app/src/data/vets.json', 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        with open('processed_berlin_potential.json', 'w', encoding='utf-8') as f:
            json.dump(remaining_potentials, f, indent=2, ensure_ascii=False)
        print(f"\nFinished: Moved {moved}, Updated {updated_existing}")
    else:
        print("\nNo new matches found between CSV and lists.")

if __name__ == "__main__":
    parse_new_csv()

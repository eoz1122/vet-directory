import json
import csv
import os
import re

# File paths
VETS_JSON = r'C:\Users\emreo\Documents\Vet Directory\web-app\src\data\vets.json'
INTERNAL_CSV = r'C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv'
OTHER_CSVS = [
    r'C:\Users\emreo\Documents\Vet Directory\frankfurt.csv',
    r'C:\Users\emreo\Documents\Vet Directory\frankfurt2.csv',
    r'C:\Users\emreo\Documents\Vet Directory\google.csv',
    r'C:\Users\emreo\Documents\Vet Directory\google (1).csv',
]

def normalize_name(name):
    if not name: return ""
    return re.sub(r'[^a-zA-Z0-9]', '', name.lower())

def audit():
    # 1. Load enrichment data to get URLs
    urls = {} # normalized name -> maps_url, website
    for path in OTHER_CSVS:
        if not os.path.exists(path): continue
        try:
            with open(path, mode='r', encoding='utf-8') as f:
                reader = csv.reader(f)
                header = next(reader, None)
                if not header: continue
                name_idx, web_idx, maps_idx = -1, -1, -1
                for i, col in enumerate(header):
                    col = col.lower()
                    if 'qbf1pd' in col: name_idx = i
                    if 'lcr4fd' in col or 'website' in col: web_idx = i
                    if 'hfpxzc href' in col or i == 0: maps_idx = i
                
                if name_idx == -1: continue
                for row in reader:
                    if len(row) <= name_idx: continue
                    name = row[name_idx]
                    norm = normalize_name(name)
                    if not norm: continue
                    if norm not in urls: urls[norm] = {"maps": None, "website": None}
                    if maps_idx != -1 and len(row) > maps_idx: urls[norm]["maps"] = row[maps_idx]
                    if web_idx != -1 and len(row) > web_idx: urls[norm]["website"] = row[web_idx]
        except: pass

    # 2. Extract Frankfurt entries from Internal CSV
    audit_data = []
    with open(INTERNAL_CSV, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get('City') == 'Frankfurt':
                name = row.get('Practice Name')
                norm = normalize_name(name)
                
                # Get URL from enrichment or internal
                maps_url = urls.get(norm, {}).get("maps") or row.get('Website') if 'google.com/maps' in (row.get('Website') or '') else None
                website_url = urls.get(norm, {}).get("website") or (row.get('Website') if 'google.com' not in (row.get('Website') or '') else None)
                
                audit_data.append({
                    "practice_name": name,
                    "id": row.get('ID'),
                    "address": row.get('Address'),
                    "phone": row.get('Phone'),
                    "google_maps_url": maps_url,
                    "website": website_url,
                    "verification_signals": row.get('English Signals', '').split(';'),
                    "current_status": "In vets.json" # Default
                })

    # 3. Cross check with vets.json to see who was relocated/removed
    with open(VETS_JSON, 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    current_ffm_names = {normalize_name(v['practice_name']) for v in vets if v['city'] == 'Frankfurt'}
    current_all_names = {normalize_name(v['practice_name']) for v in vets}

    for item in audit_data:
        norm = normalize_name(item['practice_name'])
        if norm in current_ffm_names:
            item['current_status'] = "Active in Frankfurt"
        elif norm in current_all_names:
            # Find which city it moved to
            moved_vet = next((v for v in vets if normalize_name(v['practice_name']) == norm), None)
            item['current_status'] = f"Relocated to {moved_vet['city']}" if moved_vet else "Relocated"
        else:
            item['current_status'] = "Removed (Duplicate or Not Frankfurt/Vet)"

    with open(r'C:\Users\emreo\Documents\Vet Directory\web-app\src\data\frankfurt_vet_audit.json', 'w', encoding='utf-8') as f:
        json.dump(audit_data, f, indent=2, ensure_ascii=False)
    
    print(f"Audit complete. Logged {len(audit_data)} entries.")

if __name__ == "__main__":
    audit()

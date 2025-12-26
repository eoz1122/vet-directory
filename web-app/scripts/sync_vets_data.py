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
    r'C:\Users\emreo\Documents\Vet Directory\hamburg.csv',
    r'C:\Users\emreo\Documents\Vet Directory\hamburg english speaking.csv',
    r'C:\Users\emreo\Documents\Vet Directory\munich.csv',
    r'C:\Users\emreo\Documents\Vet Directory\stuttgart.csv',
]

CITY_CODES = {
    '06371': 'Landstuhl',
    '06561': 'Bitburg',
    '06562': 'Speicher',
    '06301': 'Kaiserslautern',
    '0631': 'Kaiserslautern',
    '06221': 'Heidelberg',
    '02654': 'Polch',
    '06867': 'Perl',
    '06542': 'Zell',
    '06101': 'Bad Vilbel',
    '06172': 'Bad Homburg',
    '06171': 'Oberursel',
    '06173': 'Kronberg',
    '06174': 'Königstein',
    '06192': 'Hofheim',
    '06196': 'Bad Soden',
    '06142': 'Rüsselsheim',
    '06102': 'Neu-Isenburg',
    '06103': 'Langen',
    '06105': 'Mörfelden-Walldorf'
}

def normalize_name(name):
    if not name: return ""
    return re.sub(r'[^a-zA-Z0-9]', '', name.lower())

def extract_coords(url):
    if not url: return None, None
    match = re.search(r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', url)
    if match:
        return float(match.group(1)), float(match.group(2))
    match_at = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+)', url)
    if match_at:
        return float(match_at.group(1)), float(match_at.group(2))
    return None, None

def is_maps(url):
    if not url: return False
    return 'google.com/maps' in url or 'goo.gl/maps' in url

def load_enrichment_data():
    enrichment = {} # name -> data
    for path in OTHER_CSVS:
        if not os.path.exists(path): continue
        try:
            with open(path, mode='r', encoding='utf-8') as f:
                reader = csv.reader(f)
                header = next(reader, None)
                if not header: continue
                
                name_idx, phone_idx, web_idx, maps_idx = -1, -1, -1, -1
                addr_cols = []
                for i, col in enumerate(header):
                    col = col.lower()
                    if 'qbf1pd' in col: name_idx = i
                    if 'usdlk' in col: phone_idx = i
                    if 'lcr4fd' in col or ('website' in col and web_idx == -1): web_idx = i
                    if 'hfpxzc href' in col or i == 0: maps_idx = i
                    if 'w4efsd' in col: addr_cols.append(i)
                
                if name_idx == -1: continue
                for row in reader:
                    if len(row) <= name_idx: continue
                    name = row[name_idx]
                    norm = normalize_name(name)
                    if not norm: continue
                    if norm not in enrichment: enrichment[norm] = {}
                    
                    if phone_idx != -1 and len(row) > phone_idx and row[phone_idx]:
                        enrichment[norm]['phone'] = row[phone_idx].strip()
                    if web_idx != -1 and len(row) > web_idx and row[web_idx]:
                        enrichment[norm]['website'] = row[web_idx].strip()
                    if maps_idx != -1 and len(row) > maps_idx and row[maps_idx]:
                        enrichment[norm]['maps_link'] = row[maps_idx].strip()
                    
                    # Try to find address in addr_cols
                    best_addr = ""
                    for idx in addr_cols:
                        if len(row) > idx:
                            val = row[idx].strip()
                            # Addresses usually have lengths and spaces, and no weird icons or hours
                            is_noise = any(noise in val for noise in ["·", "", "", "Open", "Closed", "Opens", "Closes"])
                            if len(val) > len(best_addr) and not is_noise and len(val) < 100:
                                best_addr = val
                    if best_addr:
                        enrichment[norm]['address'] = best_addr
        except Exception as e: print(f"Error reading {path}: {e}")
    return enrichment

def sync():
    enrichment = load_enrichment_data()
    vets = []
    
    with open(INTERNAL_CSV, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            vet = {
                "id": row.get('ID'),
                "practice_name": row.get('Practice Name'),
                "city": row.get('City'),
                "district": row.get('District', 'Unknown'),
                "address": row.get('Address'),
                "coordinates": {
                    "lat": float(row['Latitude']) if row.get('Latitude') and row['Latitude']!='0' else None,
                    "lng": float(row['Longitude']) if row.get('Longitude') and row['Longitude']!='0' else None
                },
                "contact": {
                    "phone": row.get('Phone'),
                    "website": row.get('Website'),
                    "google_maps": None
                },
                "verification": {
                    "ai_score": 95,
                    "last_scanned": row.get('Last Verified', '2025-12-25'),
                    "english_signals": [s.strip() for s in row.get('English Signals', '').split(';')] if row.get('English Signals') else []
                },
                "community_status": row.get('Verification Status', 'Verified')
            }
            vets.append(vet)

    final_vets = []
    seen = set()
    blacklist = ["kleintierpraxismoseltaltierarzt"]

    for vet in vets:
        norm = normalize_name(vet['practice_name'])
        if norm in blacklist: continue
        
        # 1. Relocation check (Phone based)
        phone = (vet['contact'].get('phone') or "").replace(' ', '').replace('-', '').replace('+', '00')
        for code, target_city in CITY_CODES.items():
            if phone.startswith(code) or phone.startswith('0049' + code[1:]):
                if vet['city'] == 'Frankfurt':
                    print(f"Relocating {vet['practice_name']} to {target_city}")
                    vet['city'] = target_city
        
        # 2. Enrichment from other CSVs
        if norm in enrichment:
            e = enrichment[norm]
            # Website upgrade
            if is_maps(vet['contact']['website']):
                vet['contact']['google_maps'] = vet['contact']['website']
                vet['contact']['website'] = None
            
            if not vet['contact'].get('website') and e.get('website') and not is_maps(e['website']):
                vet['contact']['website'] = e['website']
            if not vet['contact'].get('phone') and e.get('phone'):
                vet['contact']['phone'] = e['phone']
            
            # Address upgrade
            current_addr = (vet['address'] or "").strip()
            new_addr = e.get('address', '').strip()
            if (len(current_addr) < 15 or 'Frankfurt am Main' in current_addr) and len(new_addr) > 5:
                if vet['city'].lower() not in new_addr.lower() and len(new_addr) < 50:
                    vet['address'] = f"{new_addr}, {vet['city']}"
                else:
                    vet['address'] = new_addr

            # Coordinate upgrade
            lat_e, lng_e = extract_coords(e.get('maps_link'))
            if not lat_e: lat_e, lng_e = extract_coords(e.get('website'))
            
            cur_lat = vet['coordinates'].get('lat')
            # If coordinates are missing, 0, or in Frankfurt but city isn't
            is_ffm_coord = cur_lat and 50.10 <= cur_lat <= 50.15
            if not cur_lat or cur_lat == 0 or (is_ffm_coord and vet['city'] != 'Frankfurt'):
                if lat_e:
                    vet['coordinates']['lat'] = lat_e
                    vet['coordinates']['lng'] = lng_e

        # Final address clean
        if 'Frankfurt am Main' in vet['address'] and vet['city'] != 'Frankfurt':
            vet['address'] = vet['address'].replace('Frankfurt am Main', vet['city'])

        # Deduplication
        key = (norm, (vet['address'] or '')[:10].lower())
        if key in seen: continue
        seen.add(key)

        # Signals
        signals = sorted(list(set(vet['verification']['english_signals'])), key=len, reverse=True)
        unique_signals = []
        for s in signals:
            if not any(s in existing for existing in unique_signals):
                unique_signals.append(s)
        vet['verification']['english_signals'] = unique_signals
        
        final_vets.append(vet)

    final_vets.sort(key=lambda x: (x['city'].lower(), x['practice_name'].lower()))
    with open(VETS_JSON, 'w', encoding='utf-8') as f:
        json.dump(final_vets, f, indent=2, ensure_ascii=False)
    print(f"Done. Produced {len(final_vets)} entries.")

if __name__ == "__main__":
    sync()

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
    r'C:\Users\emreo\Documents\Vet Directory\english speaking search.csv',
]

def normalize_name(name):
    if not name: return ""
    return re.sub(r'[^a-zA-Z0-9]', '', name.lower())

def audit_urls_and_addresses():
    # 1. Load enrichment data
    enrichment = {} # norm_name -> list of records found
    for path in OTHER_CSVS:
        if not os.path.exists(path): continue
        try:
            with open(path, mode='r', encoding='utf-8') as f:
                reader = csv.reader(f)
                header = next(reader, None)
                if not header: continue
                
                name_idx, web_idx, maps_idx, addr_cols = -1, -1, -1, []
                for i, col in enumerate(header):
                    col = col.lower()
                    if 'qbf1pd' in col: name_idx = i
                    if 'lcr4fd' in col or ('website' in col and web_idx == -1): web_idx = i
                    if 'hfpxzc href' in col or i == 0: maps_idx = i
                    if 'w4efsd' in col: addr_cols.append(i)
                
                if name_idx == -1: continue
                for row in reader:
                    if len(row) <= name_idx: continue
                    name = row[name_idx]
                    norm = normalize_name(name)
                    if not norm: continue
                    
                    if norm not in enrichment: enrichment[norm] = []
                    
                    best_addr = ""
                    for idx in addr_cols:
                        if len(row) > idx:
                            val = row[idx].strip()
                            is_noise = any(noise in val for noise in ["·", "", "", "Open", "Closed", "Opens", "Closes"])
                            if len(val) > len(best_addr) and not is_noise and len(val) < 100:
                                best_addr = val
                    
                    enrichment[norm].append({
                        "name": name,
                        "website": row[web_idx].strip() if web_idx != -1 and len(row) > web_idx else None,
                        "maps": row[maps_idx].strip() if maps_idx != -1 and len(row) > maps_idx else None,
                        "address": best_addr,
                        "source": os.path.basename(path)
                    })
        except: pass

    # 2. Load current vets.json
    with open(VETS_JSON, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    audit_results = []

    for vet in vets:
        norm = normalize_name(vet['practice_name'])
        missing_maps = not vet['contact'].get('google_maps')
        missing_web = not vet['contact'].get('website')
        
        found_records = enrichment.get(norm, [])
        
        issue = None
        found_maps = None
        found_web = None
        address_mismatch = False
        mismatch_details = ""

        # Check for better data
        for rec in found_records:
            if missing_maps and rec['maps'] and 'google.com/maps' in rec['maps']:
                found_maps = rec['maps']
            if missing_web and rec['website'] and 'google.com' not in rec['website']:
                found_web = rec['website']
            
            # Address Mismatch Detection
            # Simple check: if significant street/number words differ
            if rec['address'] and vet['address']:
                words_rec = set(re.findall(r'\w+', rec['address'].lower()))
                words_vet = set(re.findall(r'\w+', vet['address'].lower()))
                # Ignore common city names
                ignored = {"frankfurt", "am", "main", "berlin", "hamburg", "munich", "münchen", "stuttgart"}
                words_rec -= ignored
                words_vet -= ignored
                
                # If they have non-overlapping street names/numbers
                overlap = words_rec.intersection(words_vet)
                if len(words_rec) > 2 and len(words_vet) > 2 and len(overlap) < 1:
                    address_mismatch = True
                    mismatch_details = f"CSV: {rec['address']} vs JSON: {vet['address']}"

        if missing_maps or missing_web or address_mismatch:
            audit_results.append({
                "practice_name": vet['practice_name'],
                "city": vet['city'],
                "current_address": vet['address'],
                "found_maps_url": found_maps,
                "found_website": found_web,
                "address_flag": "MISMATCH" if address_mismatch else "OK",
                "mismatch_details": mismatch_details,
                "status": "Found New Info" if (found_maps or found_web) else ("Mismatched Only" if address_mismatch else "No Info Found In CSVs")
            })

    # 3. Save to audit file
    output_path = r'C:\Users\emreo\Documents\Vet Directory\web-app\src\data\missing_urls_audit.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(audit_results, f, indent=2, ensure_ascii=False)
    
    # Also log a summary
    mismatches = [a for a in audit_results if a['address_flag'] == "MISMATCH"]
    new_info = [a for a in audit_results if a['found_maps_url'] or a['found_website']]
    
    print(f"Audit complete.")
    print(f"Total entries audited: {len(vets)}")
    print(f"Potential info found for: {len(new_info)} vets")
    print(f"Address mismatches flagged: {len(mismatches)}")
    print(f"Results saved to: {output_path}")

if __name__ == "__main__":
    audit_urls_and_addresses()

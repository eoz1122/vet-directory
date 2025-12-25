import json

def normalize_compare_string(s):
    if not s: return ""
    # Remove common words, punctuation and lowercase everything for fuzzy comparison
    s = s.lower()
    s = "".join(filter(str.isalnum, s))
    return s

def deduplicate():
    # Load existing vets
    try:
        with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
            existing_vets = json.load(f)
    except Exception as e:
        print(f"Error loading vets.json: {e}")
        return

    # Load potential vets
    try:
        with open('processed_berlin_potential.json', 'r', encoding='utf-8') as f:
            potential_vets = json.load(f)
    except Exception as e:
        print(f"Error loading processed_berlin_potential.json: {e}")
        return

    # Create maps for comparison
    existing_normalized_names = {normalize_compare_string(v.get('practice_name', '')) for v in existing_vets}
    existing_addresses = {normalize_compare_string(v.get('address', '')) for v in existing_vets if v.get('address')}
    
    # Also compare by website if available
    existing_websites = {v.get('contact', {}).get('website', '').lower() for v in existing_vets if v.get('contact', {}).get('website')}
    existing_websites = {w.replace('https://', '').replace('http://', '').replace('www.', '').rstrip('/') for w in existing_websites if w}

    initial_count = len(potential_vets)
    new_vets = []
    duplicates_found = 0

    for v in potential_vets:
        name_norm = normalize_compare_string(v['practice_name'])
        addr_norm = normalize_compare_string(v['address'])
        
        # Website comparison
        web = v.get('contact', {}).get('website', '')
        web_norm = ""
        if web:
            web_norm = web.lower().replace('https://', '').replace('http://', '').replace('www.', '').rstrip('/')

        # Check for duplicates
        is_duplicate = False
        if name_norm in existing_normalized_names:
            is_duplicate = True
        elif addr_norm and addr_norm in existing_addresses:
            is_duplicate = True
        elif web_norm and web_norm in existing_websites:
            is_duplicate = True
        
        if is_duplicate:
            duplicates_found += 1
        else:
            new_vets.append(v)

    # Save the updated potential list
    with open('processed_berlin_potential.json', 'w', encoding='utf-8') as f:
        json.dump(new_vets, f, indent=2, ensure_ascii=False)

    print(f"--- Deduplication Report ---")
    print(f"Total entries processed: {initial_count}")
    print(f"Existing in system (removed): {duplicates_found}")
    print(f"New potential entries remaining: {len(new_vets)}")

if __name__ == "__main__":
    deduplicate()

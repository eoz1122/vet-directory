import json
import os

# Load the data
file_path = 'web-app/src/data/vets.json'
with open(file_path, 'r', encoding='utf-8') as f:
    vets = json.load(f)

original_count = len(vets)

# Helper to identify if an entry is definitely not in Frankfurt despite the label
def is_wrong_frankfurt(vet):
    if vet.get('city') != 'Frankfurt':
        return False
        
    name = vet.get('practice_name', '').lower()
    address = vet.get('address', '').lower()
    contact = vet.get('contact', {}) or {}
    phone = contact.get('phone', '') or ''
    website = contact.get('website', '') or ''
    gmaps = contact.get('google_maps', '') or ''
    
    # Check phone area codes (Frankfurt is 069)
    # Non-Frankfurt area codes often present in "hall of shame" list:
    # 06371 (Landstuhl), 06561 (Bitburg), 06301 (Kaiserslautern), 06221 (Heidelberg)
    # 02654 (Polch), 06867 (Perl), 06101 (Bad Vilbel - close but not FFM)
    wrong_codes = ['06371', '06561', '06562', '06301', '06221', '02654', '06867', '06542']
    if any(phone.startswith(code) for code in wrong_codes):
        return True

    # 1. Check for obviously wrong cities in address or name
    wrong_cities = [
        'heidelberg', 'perl', 'polch', 'speicher', 'bitburg', 'wiesbaden', 
        'hofheim', 'bad homburg', 'königstein', 'oberursel', 'kelkheim', 
        'landstuhl', 'kaiserslautern', 'ramstein', 'spangdahlem', 'bad vilbel',
        'quickborn', 'obertshausen'
    ]
    
    # If the address contains one of these, and DOES NOT contain a Frankfurt zip (60xxx, 65xxx is too broad) or "Frankfurt am Main"
    for city in wrong_cities:
        if city in address or city in name:
            # Exception: if it clearly says it's in Frankfurt in the address too
            if 'frankfurt' not in address.lower():
                return True
            # Special case for "Bitburg" clinic mapped to Bockenheim address
            if 'bitburg' in name and '06561' in phone:
                return True
            
    # 3. Specific names that are known to be wrong in the list
    wrong_names = [
        'veterinary medical center europe',
        'tierarztpraxis andres de lima',
        'animova veterinarian',
        'vet. med. praxis bitburg',
        'armin drexler',
        'kleintierpraxis moseltal',
        'kleintierpraxis maifeld',
        'flynn family medicine',
        'tierhotel rhein-main',
        'pferdeosteopathie', # Usually not a city vet
        'osteopathie'
    ]
    for wn in wrong_names:
        if wn in name:
            return True
            
    # 4. If address is just "Frankfurt am Main" without street, and it has a weird phone/website
    if address.strip().lower() == 'frankfurt am main':
        if any(code in phone for code in ['06371', '06561', '06301']):
            return True

    return False

# 1. Filter out wrong entries
cleaned_vets = [v for v in vets if not is_wrong_frankfurt(v)]

# 2. Deduplicate
# Use a combination of practice name and address as key
seen = {}
deduped = []
for vet in cleaned_vets:
    # Clean up fields while we are at it
    if 'contact' in vet and vet['contact']:
        # If website is a google maps link, move it
        website = vet['contact'].get('website')
        if website and 'google.com/maps' in website:
            vet['contact']['google_maps'] = website
            vet['contact']['website'] = None
            
    # Normalize name and address for deduplication
    norm_name = vet.get('practice_name', '').lower().strip()
    norm_address = vet.get('address', '').lower().strip()
    key = (norm_name, norm_address[:20]) # First 20 chars of address to catch variations
    
    if key in seen:
        # Merge if necessary? For now just keep the one with a better ID
        # (Usually the one with more data)
        old_vet = seen[key]
        if not old_vet.get('contact', {}).get('phone') and vet.get('contact', {}).get('phone'):
            seen[key] = vet
        continue
    else:
        seen[key] = vet
        deduped.append(vet)

# 3. Final polish for specific entries
for vet in deduped:
    # Fix truncated snippets
    if 'verification' in vet and 'english_signals' in vet['verification']:
        signals = vet['verification']['english_signals']
        if len(signals) >= 2:
            # If the last signal contains the first signal, it's probably a duplicate/fragmented import
            if signals[0] in signals[1]:
                vet['verification']['english_signals'] = [signals[1]]
            elif signals[1] in signals[0]:
                vet['verification']['english_signals'] = [signals[0]]

# Sort by city and then name
deduped.sort(key=lambda x: (x.get('city', ''), x.get('practice_name', '')))

# Save
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(deduped, f, indent=2, ensure_ascii=False)

print(f"Original: {original_count}")
print(f"Final: {len(deduped)}")
print(f"Removed: {original_count - len(deduped)}")

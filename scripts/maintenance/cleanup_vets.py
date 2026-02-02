import json
import re

def clean_vets_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    print(f"Total vets before cleanup: {len(vets)}")
    
    cleaned_vets = []
    
    # 1. Non-German Countries/Cities Removal List
    non_german_indicators = [
        "Luxembourg", "L-", "Bereldange", "Christnach", "Luxemburg",
        "Czech Republic", "Prague", "Praha", "Prag", "Nusle", "Jičínská",
        "Switzerland", "Austria", "Österreich", "Schweiz", "Kaiserslautern"
    ] 
    
    # 2. Strict City Validation - Suburb mapping
    suburb_map = {
        "Hofheim": "Hofheim",
        "Wiesbaden": "Wiesbaden",
        "Königstein": "Königstein",
        "Bad Soden": "Bad Soden",
        "Kelkheim": "Kelkheim",
        "Kronberg": "Kronberg",
        "Oberursel": "Oberursel",
        "Bad Homburg": "Bad Homburg",
        "Eschborn": "Eschborn",
        "Mainz": "Mainz"
    }

    for vet in vets:
        # Check for Non-German entries
        is_german = True
        address = vet.get('address', '') or ''
        city = vet.get('city', '') or ''
        practice_name = vet.get('practice_name', '') or ''
        
        # 1. Check for non-german indicators in address/city/name
        for indicator in non_german_indicators:
            if (indicator.lower() in address.lower() or 
                indicator.lower() in city.lower() or 
                indicator.lower() in practice_name.lower()):
                is_german = False
                print(f"Removing non-German/Incompatible entry: {practice_name} ({address})")
                break
        
        # 2. Check for non-german phone numbers (+420, +352, +43, +41)
        phone = (vet.get('contact', {}) or {}).get('phone', '') or ''
        if phone:
            if phone.startswith('+420') or phone.startswith('+352') or phone.startswith('+43') or phone.startswith('+41'):
                is_german = False
                print(f"Removing non-German phone entry: {practice_name} ({phone})")
        
        if not is_german:
            continue

        # 3. Clean up "City name only" addresses unless mobile
        if address.strip().lower() == city.strip().lower() or not address:
            if "mobile" not in practice_name.lower() and "felmo" not in practice_name.lower():
                print(f"Skipping entry with missing address: {practice_name}")
                continue
            else:
                # Standardize mobile address
                vet['address'] = f"Mobile Service - {city}"

        # 4. Update City if it's a suburb
        for suburb, new_city in suburb_map.items():
            if suburb in address:
                if vet['city'] == 'Frankfurt': 
                    print(f"Moving {vet['practice_name']} from Frankfurt to {new_city}")
                    vet['city'] = new_city

        # 5. Clean up english_signals (acting as quotes)
        if 'verification' in vet and 'english_signals' in vet['verification']:
            signals = vet['verification']['english_signals']
            new_signals = []
            for sig in signals:
                if 'http' in sig or 'gstatic.com' in sig:
                    continue
                    
                trash_patterns = [
                    r"·", r"Opens?\s*[0-9]", r"Closes?\s*[0-9]", 
                    r"[0-9]+\s*am", r"[0-9]+\s*pm", 
                    r"[0-9]+:[0-9]+",
                    r"Confirmed via Google Review: \"\.\"",
                    r"Confirmed via Google Review: \"\s*\"",
                    r"Open\s*24\s*hours",
                    r"Closed\s*·",
                ]
                is_trash = False
                for pattern in trash_patterns:
                    if re.search(pattern, sig, re.IGNORECASE):
                        is_trash = True
                        break
                
                if is_trash:
                    continue

                clean_sig = sig.replace("Confirmed via Google Review: ", "").strip(' "')
                if len(clean_sig) < 10:
                    if "english" not in clean_sig.lower():
                        continue

                truncated_patterns = [
                    r"in$", r"your$", r"is not$", r"with us$"
                ]
                for pattern in truncated_patterns:
                    if re.search(pattern, clean_sig, re.IGNORECASE):
                        is_trash = True
                        break
                
                if is_trash:
                     continue

                new_signals.append(sig)
            
            if not new_signals and vet.get('community_status') == 'Verified':
                new_signals.append("Verified English Support")
            
            vet['verification']['english_signals'] = new_signals

        # 6. Address Sanitization
        if address:
            distractions = [
                r"\(near.*\)", r"\(U-Bahn.*\)", r"\(S-Bahn.*\)", r"\(Tram.*\)",
                r"[0-9]+\.?\s*Floor", r"[0-9]+\.?\s*Etage", r"Hinterhof",
                r"Vorderhaus", r"c/o.*"
            ]
            for pattern in distractions:
                address = re.sub(pattern, "", address, flags=re.IGNORECASE)
            address = re.sub(r'\s+', ' ', address).strip()
            vet['address'] = address

        cleaned_vets.append(vet)

    print(f"Total vets after cleanup: {len(cleaned_vets)}")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(cleaned_vets, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    clean_vets_data('web-app/src/data/vets.json')

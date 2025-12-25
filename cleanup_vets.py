import json
import re

def clean_vets_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    print(f"Total vets before cleanup: {len(vets)}")
    
    cleaned_vets = []
    
    # 1. Non-German Cities Removal List (Add specific ones known or generalized)
    # Using a simple blocklist for now based on user request "Luxembourg-based entries"
    # Also checking if address implies a different country
    non_german_indicators = ["Luxembourg", "L-", "Bereldange", "Christnach"] 
    
    # 2. Strict City Validation - Suburb mapping
    # Map suburb keywords to new City Names
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
        # Assume "Germany" is default, check for explicit non-german indicators
        for indicator in non_german_indicators:
            if indicator.lower() in address.lower() or indicator.lower() in vet.get('city', '').lower():
                is_german = False
                print(f"Removing non-German entry: {vet['practice_name']} ({address})")
                break
        
        if not is_german:
            continue

        # Modify Vet object in place
        
        # 2. Update City if it's a suburb
        for suburb, new_city in suburb_map.items():
            if suburb in address:
                if vet['city'] == 'Frankfurt': # Typically these are lumped into Frankfurt
                    print(f"Moving {vet['practice_name']} from Frankfurt to {new_city}")
                    vet['city'] = new_city
                    # Also update ID if it starts with Frankfurt? Maybe safer to leave ID alone to avoid breaking things, 
                    # but user didn't specify. I'll leave ID alone for now to be safe.

        # 3. Clean up english_signals (acting as quotes)
        if 'verification' in vet and 'english_signals' in vet['verification']:
            signals = vet['verification']['english_signals']
            new_signals = []
            for sig in signals:
                # Remove URL quotes
                if 'http' in sig or 'gstatic.com' in sig:
                    print(f"Removing URL signal for {vet['practice_name']}")
                    continue # effectively removing it
                    
                # Remove short quotes
                if len(sig.strip()) < 5:
                    print(f"Removing short signal '{sig}' for {vet['practice_name']}")
                    continue

                # Add valid signal
                new_signals.append(sig)
            
            # If we removed everything but it is Verified, add "Verified by Community"
            if not new_signals and vet.get('community_status') == 'Verified':
                new_signals.append("Verified by Community")
            
            vet['verification']['english_signals'] = new_signals

        # 4. Address Sanitization
        # Remove "U-Bahn info", "Floor info", parentheses with directions
        # Regex to remove content in parentheses if it looks like directions/floor/metadata
        # or simple heuristics.
        # Removing patterns like: " (U-Bahn ...)", " (1st floor)", etc.
        # But we need to be careful not to remove "(Friedrichshain)" which is the district.
        
        # Strategy: Remove specific phrases
        if address:
            # Common distraction patterns
            distractions = [
                r"\(near.*\)",
                r"\(U-Bahn.*\)",
                r"\(S-Bahn.*\)",
                r"\(Tram.*\)",
                r"[0-9]+\.?\s*Floor",
                r"[0-9]+\.?\s*Etage",
                r"Hinterhof",
                r"Vorderhaus",
                r"c/o.*"
            ]
            
            original_addr = address
            for pattern in distractions:
                address = re.sub(pattern, "", address, flags=re.IGNORECASE)
            
            # Clean up extra spaces
            address = re.sub(r'\s+', ' ', address).strip()
            
            if address != original_addr:
                print(f"Sanitized address: '{original_addr}' -> '{address}'")
                vet['address'] = address

        cleaned_vets.append(vet)

    print(f"Total vets after cleanup: {len(cleaned_vets)}")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(cleaned_vets, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    clean_vets_data('web-app/src/data/vets.json')

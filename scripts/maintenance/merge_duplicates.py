import json
from collections import defaultdict
import os

def normalize(text):
    if not text:
        return ""
    return "".join(c for c in text.lower() if c.isalnum())

def merge_vets(file_path):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    # Group by normalized address
    by_address = defaultdict(list)
    for vet in vets:
        addr = normalize(vet.get('address', ''))
        if addr:
            by_address[addr].append(vet)
        else:
            # If no address, treat as unique unless we want to group by name
            by_address[f"no_addr_{id(vet)}"].append(vet)

    merged_vets = []
    
    for addr, group in by_address.items():
        if len(group) == 1:
            merged_vets.append(group[0])
            continue
        
        print(f"\nMerging {len(group)} entries for address: {group[0].get('address')}")
        
        # Sort group: prioritize non-numeric IDs, then count of signals
        def sort_key(v):
            vid = v.get('id', '')
            is_custom = not any(char.isdigit() for char in vid.split('-')[-1]) if '-' in vid else True
            signal_count = len(v.get('verification', {}).get('english_signals', []))
            return (is_custom, signal_count)

        group.sort(key=sort_key, reverse=True)
        
        base_vet = group[0]
        base_signals = set(base_vet.get('verification', {}).get('english_signals', []))
        
        for other_vet in group[1:]:
            print(f"  Combining: {other_vet.get('practice_name')} ({other_vet.get('id')}) into {base_vet.get('practice_name')} ({base_vet.get('id')})")
            
            # Merge signals
            other_signals = other_vet.get('verification', {}).get('english_signals', [])
            for s in other_signals:
                if s not in base_signals:
                    base_signals.add(s)
                    base_vet.setdefault('verification', {}).setdefault('english_signals', []).append(s)
            
            # Update coordinate if base is 0
            if base_vet.get('coordinates', {}).get('lat') == 0 and other_vet.get('coordinates', {}).get('lat') != 0:
                base_vet['coordinates'] = other_vet['coordinates']
            
            # Update contact info if base is missing
            for field in ['phone', 'website', 'google_maps']:
                if not base_vet.get('contact', {}).get(field) and other_vet.get('contact', {}).get(field):
                    base_vet.setdefault('contact', {})[field] = other_vet['contact'][field]

            # Update status if better
            if base_vet.get('community_status') != 'Verified' and other_vet.get('community_status') == 'Verified':
                base_vet['community_status'] = 'Verified'

        merged_vets.append(base_vet)

    # One more pass for Name duplicates with different normalized addresses
    # (e.g. Seumestraße 3 vs Seumestrasse 3 - normalization handles this though)
    
    print(f"\nTotal vets before: {len(vets)}, after merging: {len(merged_vets)}")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(merged_vets, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    merge_vets('web-app/src/data/vets.json')

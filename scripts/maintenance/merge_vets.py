import json
import os

def merge_vets():
    main_file = 'web-app/src/data/vets.json'
    new_files = [
        'web-app/src/data/high_confidence_vets.json',
        'web-app/src/data/high_confidence_vets_expanded.json',
        'web-app/src/data/high_confidence_vets_batch_3.json'
    ]
    
    # Load main database
    try:
        with open(main_file, 'r', encoding='utf-8') as f:
            main_vets = json.load(f)
            print(f"Loaded {len(main_vets)} existing vets.")
    except FileNotFoundError:
        print("Main file not found!")
        return

    existing_ids = {v['id'] for v in main_vets}
    existing_locations = {(v['address'].lower().replace(" ", ""), v['practice_name'].lower().replace(" ", "")) for v in main_vets}
    
    total_added = 0
    
    for nf in new_files:
        if not os.path.exists(nf):
            print(f"Skipping {nf} (not found)")
            continue
            
        with open(nf, 'r', encoding='utf-8') as f:
            new_vets = json.load(f)
            
        for vet in new_vets:
            # Check for ID collision or semantic duplicate (same name + address)
            clean_addr = vet['address'].lower().replace(" ", "")
            clean_name = vet['practice_name'].lower().replace(" ", "")
            
            if vet['id'] not in existing_ids and (clean_addr, clean_name) not in existing_locations:
                main_vets.append(vet)
                existing_ids.add(vet['id'])
                existing_locations.add((clean_addr, clean_name))
                total_added += 1
                print(f"Added: {vet['practice_name']} ({vet['city']})")
            else:
                print(f"Skipping duplicate: {vet['practice_name']}")

    # Write back to main file
    with open(main_file, 'w', encoding='utf-8') as f:
        json.dump(main_vets, f, indent=2, ensure_ascii=False)
    
    print(f"\nSuccessfully added {total_added} new high-confidence vets to {main_file}")

if __name__ == "__main__":
    merge_vets()

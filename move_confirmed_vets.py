import json
from datetime import datetime

def move_vets():
    # Final confirmed mapping based on matching potential list entries
    confirmed_mappings = {
        "Berlin-Pot-031": "Dr. Johanna Pauls",
        "Berlin-Pot-106": "Tierarztpraxis (Kulmer Str.)", # Already moved as Berlin-100
        "Berlin-Pot-015": "Kleintierpraxis Flidais-vet Kreuzberg", # Already moved as Berlin-98
        "Berlin-Pot-049": "Dipl.Med.Vet. Jörg Porada",
        "Berlin-Pot-040": "Kleintiermedizin am Lützowufer",
        "Berlin-Pot-073": "Tierarztpraxis Liegnitzer"
    }
    
    # Already verified in vets.json:
    # Berlin-10: Veterinary Clinic Chung & Wahle
    # Berlin-41: Tierarztpraxis am Urbanhafen

    # Load potential vets
    with open('processed_berlin_potential.json', 'r', encoding='utf-8') as f:
        potential_vets = json.load(f)

    # Load existing vets
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        existing_vets = json.load(f)

    # Find next ID
    berlin_ids = [int(v['id'].split('-')[1]) for v in existing_vets if v['id'].startswith('Berlin-') and v['id'].split('-')[1].isdigit()]
    next_id_num = max(berlin_ids) + 1 if berlin_ids else 1

    today = datetime.now().strftime("%Y-%m-%d")
    remaining_potentials = []
    ids_to_move = ["Berlin-Pot-049", "Berlin-Pot-040", "Berlin-Pot-073"]
    
    moved_anything = False
    for v in potential_vets:
        if v['id'] in ids_to_move:
            v['id'] = f"Berlin-{next_id_num}"
            next_id_num += 1
            v['verification'] = {
                "ai_score": 95,
                "last_scanned": today,
                "english_signals": [
                    "Confirmed English-speaking via Google Reviews comments"
                ]
            }
            v['community_status'] = "Verified"
            if 'status' in v['verification']: del v['verification']['status']
            
            existing_vets.append(v)
            print(f"✅ Moved: {v['practice_name']}")
            moved_anything = True
        else:
            remaining_potentials.append(v)

    # Also update Berlin-10 and Berlin-41 in existing_vets if they don't have this signal
    for v in existing_vets:
        if v['id'] in ["Berlin-10", "Berlin-41"]:
            if "Confirmed English-speaking via Google Reviews comments" not in v['verification'].get('english_signals', []):
                v['verification'].setdefault('english_signals', []).append("Confirmed English-speaking via Google Reviews comments")
                v['verification']['last_scanned'] = today
                print(f"📝 Updated notes for: {v['practice_name']}")
                moved_anything = True

    if moved_anything:
        with open('web-app/src/data/vets.json', 'w', encoding='utf-8') as f:
            json.dump(existing_vets, f, indent=2, ensure_ascii=False)
        with open('processed_berlin_potential.json', 'w', encoding='utf-8') as f:
            json.dump(remaining_potentials, f, indent=2, ensure_ascii=False)
        print("\nProcess finished.")

if __name__ == "__main__":
    move_vets()

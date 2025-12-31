import json
from datetime import datetime

def move_pet_station():
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
    
    moved = False
    for v in potential_vets:
        if v['practice_name'] == "Pet-Station":
            v['id'] = f"Berlin-{next_id_num}"
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
            print(f"✅ Moved: {v['practice_name']} to Berlin-{next_id_num}")
            moved = True
        else:
            remaining_potentials.append(v)

    if moved:
        with open('web-app/src/data/vets.json', 'w', encoding='utf-8') as f:
            json.dump(existing_vets, f, indent=2, ensure_ascii=False)
        with open('processed_berlin_potential.json', 'w', encoding='utf-8') as f:
            json.dump(remaining_potentials, f, indent=2, ensure_ascii=False)
        print("Success.")

if __name__ == "__main__":
    move_pet_station()

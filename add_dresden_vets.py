"""
Helper script to add Dresden vets to the database.
Fill in the vet information below and run this script to add them to vets.json
"""

import json
from datetime import datetime

# Template for Dresden vets - fill this in as you research
DRESDEN_VETS = [
    # Example entry - replace with actual data
    # {
    #     "practice_name": "Example Vet Practice",
    #     "district": "Neustadt",  # or other Dresden district
    #     "address": "Street Name 123, 01099 Dresden",
    #     "coordinates": {
    #         "lat": 51.0504,  # Dresden latitude
    #         "lng": 13.7373   # Dresden longitude
    #     },
    #     "contact": {
    #         "phone": "+49 351 XXXXXXX",
    #         "website": "https://example-vet.de",
    #         "google_maps": "https://maps.google.com/?cid=XXXXX"
    #     },
    #     "verification": {
    #         "english_confirmed": True,  # Set to True only if 100% confirmed
    #         "last_scanned": datetime.now().strftime("%Y-%m-%d"),
    #         "sources": ["website", "phone_call", "google_reviews"],
    #         "emergency_services": ""
    #     },
    #     "community_status": "Verified"
    # }
]

def add_dresden_vets():
    """Add Dresden vets to the database"""
    
    # Load existing vets
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    # Find the highest Dresden ID number
    dresden_ids = [v['id'] for v in vets if v['id'].startswith('Dresden-')]
    if dresden_ids:
        max_id = max([int(id.split('-')[1]) for id in dresden_ids])
    else:
        max_id = 0
    
    # Add new Dresden vets with sequential IDs
    for i, vet in enumerate(DRESDEN_VETS, start=1):
        vet['id'] = f"Dresden-{max_id + i}"
        vet['city'] = "Dresden"
        vets.append(vet)
    
    # Save back to file
    with open('web-app/src/data/vets.json', 'w', encoding='utf-8') as f:
        json.dump(vets, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Added {len(DRESDEN_VETS)} Dresden vets to the database")
    print(f"Total vets in database: {len(vets)}")

if __name__ == "__main__":
    if not DRESDEN_VETS:
        print("⚠️  No Dresden vets defined yet!")
        print("Please add vet data to the DRESDEN_VETS list and run again.")
    else:
        add_dresden_vets()

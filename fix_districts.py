import json

def fix_districts():
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        vets = json.load(f)

    mappings = {
        "Filu Vet Nordend": "Nordend",
        "Rex Tierarzt Frankfurt Ostend": "Ostend",
        "Tierklinik Lademannbogen": "Hummelsbüttel",
        "Dr. med. vet. Klaus-Henning von Kuenheim": "Bramfeld",
        "Medivet Berlin-Pankow": "Pankow",
        "Kleintierklinik Frankfurt Bockenheim": "Bockenheim",
        "Tierarztpraxis Dr. med. vet. Moormann": "Königstein",
        "VetZentrum Hafencity": "Hafencity",
        "Medivet Tierarztpraxis Hamburg-Stellingen": "Stellingen",
        "Dr. med. vet. Eva Tutlies": "Billstedt",
        "Veterinarian Dr. Eva Tutlies": "Billstedt",
        "Dr. med. vet. Nicolai Mannstaedt": "Neugraben",
        "Die Hamburger Tierärzte": "Hohenfelde",
        "Kleintierzentrum Kotzian": "Alsterdorf",
        "Tierklinik Fuhlsbüttel": "Fuhlsbüttel",
        "AniCura Hamburg Niendorf": "Niendorf",
        "Dr.med.vet. Bergit Grünau": "Winterhude"
    }

    updated = 0
    for v in vets:
        if v.get('district') == "Unknown":
            name = v.get('practice_name', '')
            address = v.get('address', '')
            
            # Check by name substring
            found_mapping = False
            for key, dist in mappings.items():
                if key.lower() in name.lower():
                    v['district'] = dist
                    updated += 1
                    found_mapping = True
                    break
            if found_mapping: continue
            
            # Try to infer from name or address keywords
            found = False
            keywords = ["Nordend", "Ostend", "Bramfeld", "Hummelsbüttel", "Pankow", "Bockenheim", 
                        "Stellingen", "Billstedt", "Hafencity", "Neugraben", "Eppendorf", 
                        "Winterhude", "Altona", "Eimsbüttel", "Niendorf", "Alsterdorf", "Fuhlsbüttel"]
            for key in keywords:
                if key.lower() in name.lower() or key.lower() in address.lower():
                    v['district'] = key
                    updated += 1
                    found = True
                    break
            
            if found: continue

    if updated > 0:
        with open('web-app/src/data/vets.json', 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print(f"Updated {updated} districts set to 'Unknown'.")
    else:
        print("No districts updated.")

if __name__ == "__main__":
    fix_districts()

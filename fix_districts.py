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
        "Dr.med.vet. Bergit Grünau": "Winterhude",
        "AniCura Tierklinik Frankfurt": "Bockenheim",
        "Katzenklinik Frankfurt": "Bockenheim",
        "Tierklinik Kalbach": "Kalbach",
        "Tierarztpraxis Maja Firlé": "Westend",
        "Kleintierpraxis Frankfurt": "Westend",
        "Tierarztpraxis Frankfurt - Dr. Kirschbaum": "Ostend",
        "Rex Tierarztpraxis Frankfurt-Ostend": "Ostend",
        "Tierarztpraxis Melanie Berger": "Sachsenhausen",
        "Kleintierpraxis Sachsenhausen": "Sachsenhausen",
        "Tierarzt Höch Frankfurt Eckenheim": "Eckenheim",
        "Tierarztpraxis Vet Puls Frankfurt": "Eschersheim",
        "Schubert Walter": "Nordend",
        "Dr. med. vet. Otto Doermer": "Sachsenhausen",
        "Dr. Gabriele Schoenert-Wißfeld": "Nordend",
        "Tierärztliche Klinik Für Kleintiere": "Bockenheim",
        "Deutsche Gesellschaft für Mauersegler": "Fechenheim",
        "Tierärztliches Orthopädie Team Frankfurt": "Niederrad",
        "Dr. Alexandra Keller": "Niederrad",
        "Elena Panova": "Bonames",
        "Vetmobil Dr. Lizcano": "Eckenheim",
        "Mobil Tierpraxis Duran": "Nieder-eschbach",
        "Tierarztpraxis Schwanheim": "Schwanheim"
    }

    updated = 0
    for v in vets:
        if v.get('district') == "Unknown":
            name = v.get('practice_name', '')
            address = v.get('address', '')
            city = v.get('city', '')
            
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
                        "Winterhude", "Altona", "Eimsbüttel", "Niendorf", "Alsterdorf", "Fuhlsbüttel",
                        "Sachsenhausen", "Westend", "Bornheim", "Gallus", "Kalbach", "Bockenheim",
                        "Eckenheim", "Eschersheim", "Bergen-Enkheim", "Preungesheim", "Dornbusch",
                        "Ginnheim", "Heddernheim", "Praunheim", "Hausen", "Rödelheim", "Griesheim",
                        "Nied", "Höchst", "Sindlingen", "Zeilsheim", "Unterliederbach", "Sossenheim",
                        "Goldstein", "Schwanheim", "Niederrad", "Oberrad", "Fechenheim", "Riederwald",
                        "Seckbach", "Bonames", "Harheim", "Nieder-Erlenbach", "Nieder-Eschbach"]
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

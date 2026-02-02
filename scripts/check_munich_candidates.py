import json

def check_candidates():
    candidates = [
        "Rex", 
        "Hohenzollernstr", 
        "Thumm", 
        "Götzke",
        "Filu", 
        "LMU", 
        "Heiss", 
        "Draschka", 
        "Maul", 
        "Herget", 
        "Szober", 
        "Gollierplatz"
    ]

    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    found = {k: [] for k in candidates}
    
    for vet in vets:
        # focus on Munich to avoid noise
        if vet.get('city') not in ['Munich', 'München']:
            continue

        raw = str(vet).lower()
        for c in candidates:
            if c.lower() in raw:
                found[c].append(vet['practice_name'])

    print("--- SEARCH RESULTS ---")
    for k, v in found.items():
        if v:
            print(f"[FOUND] {k}: {v}")
        else:
            print(f"[MISSING] {k}")

if __name__ == "__main__":
    check_candidates()

import json

try:
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for i, vet in enumerate(data):
        s = json.dumps(vet)
        if "Jens" in s or "Vöster" in s or "Hohenzollerndamm" in s:
            print(f"Index: {i}")
            print(f"ID: {vet.get('id')}")
            print(f"Name: {vet.get('practice_name')}")
            print(f"Signals: {vet.get('verification', {}).get('english_signals')}")
            print("-" * 20)

except Exception as e:
    print(f"Error: {e}")

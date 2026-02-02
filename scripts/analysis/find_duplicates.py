import json
from collections import defaultdict

def find_duplicates(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    # Dictionary to store vets by normalized address
    by_address = defaultdict(list)
    # Dictionary to store vets by normalized name
    by_name = defaultdict(list)

    def normalize(text):
        if not text:
            return ""
        # Remove common separators and spaces, lowercase
        return "".join(c for c in text.lower() if c.isalnum())

    for i, vet in enumerate(vets):
        addr = normalize(vet.get('address', ''))
        name = normalize(vet.get('practice_name', ''))
        
        if addr:
            by_address[addr].append((i, vet))
        if name:
            by_name[name].append((i, vet))

    print("--- DUPLICATES BY ADDRESS ---")
    for addr, entries in by_address.items():
        if len(entries) > 1:
            print(f"\nAddress key: {addr}")
            for idx, vet in entries:
                print(f"  Index: {idx}, ID: {vet['id']}, Name: {vet['practice_name']}, Address: {vet['address']}")

    print("\n--- DUPLICATES BY NAME ---")
    for name, entries in by_name.items():
        if len(entries) > 1:
            # Only print if address is different (already caught address dups)
            addresses = set(normalize(v.get('address', '')) for idx, v in entries)
            if len(addresses) > 1:
                print(f"\nName key: {name}")
                for idx, vet in entries:
                    print(f"  Index: {idx}, ID: {vet['id']}, Name: {vet['practice_name']}, Address: {vet['address']}")

if __name__ == "__main__":
    find_duplicates('web-app/src/data/vets.json')

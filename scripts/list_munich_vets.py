import json

def list_munich_vets():
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    munich_vets = []
    for vet in vets:
        if vet.get('city') in ['Munich', 'München']:
            munich_vets.append(vet.get('practice_name'))
            
    print(f"Total Munich Vets Found: {len(munich_vets)}")
    print("-" * 30)
    for name in sorted(munich_vets):
        print(name)

if __name__ == "__main__":
    list_munich_vets()

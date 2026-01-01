import json

def find_munich_emergency_vets():
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    munich_emergency = []
    for vet in vets:
        # Check for Munich city variations
        if vet.get('city') in ['Munich', 'München']:
            # Check for emergency services
            emergency = vet.get('verification', {}).get('emergency_services', '').lower()
            if emergency and ('24' in emergency or 'emergency' in emergency or 'notdienst' in emergency):
                munich_emergency.append(vet)
    
    print(json.dumps(munich_emergency, indent=2))

if __name__ == "__main__":
    find_munich_emergency_vets()

import json

def list_munich_vets():
    with open('web-app/src/data/vets.json', 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    munich_vets = []
    for vet in vets:
        if vet.get('city') in ['Munich', 'München']:
            munich_vets.append(vet.get('practice_name'))
            
    print(f"Total Munich Vets Found: {len(munich_vets)}")
    print(f"Missing Data Candidates:")
    print("-" * 30)
    for vet in vets:
        if vet.get('city') in ['Munich', 'München']:
            contact = vet.get('contact', {})
            # Check for missing phone or website (empty string or None)
            missing_phone = not contact.get('phone')
            missing_website = not contact.get('website')
            
            if missing_phone or missing_website:
                missing = []
                if missing_phone: missing.append("Phone")
                if missing_website: missing.append("Website")
                print(f"- {vet.get('practice_name')}: Missing {', '.join(missing)}")

if __name__ == "__main__":
    list_munich_vets()

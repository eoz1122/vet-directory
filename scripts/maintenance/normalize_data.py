import json
import os

def normalize_city(city):
    if not city:
        return "Unknown"
    # Basic normalization
    city = city.strip().title()
    # Handle specific mapping if needed (e.g., Frankfurt am Main -> Frankfurt)
    if "Frankfurt" in city:
        return "Frankfurt"
    return city

def main():
    json_path = os.path.join('web-app', 'src', 'data', 'vets.json')
    if not os.path.exists(json_path):
        print(f"File {json_path} not found.")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        vets = json.load(f)

    updated_count = 0
    for vet in vets:
        original_city = vet.get('city')
        new_city = normalize_city(original_city)
        if original_city != new_city:
            vet['city'] = new_city
            updated_count += 1
            
        # Also normalize district if it exists
        original_district = vet.get('district')
        if original_district:
            new_district = original_district.strip()
            if original_district != new_district:
                vet['district'] = new_district
                updated_count += 1

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(vets, f, indent=2, ensure_ascii=False)

    print(f"Normalized {updated_count} fields in vets.json")

if __name__ == "__main__":
    main()

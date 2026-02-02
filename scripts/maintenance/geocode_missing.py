import json
import requests
import time
import sys

def geocode_address(address, api_key):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": api_key,
        "region": "de"
    }
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        if data['status'] == 'OK':
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
        else:
            print(f"Error geocoding {address}: {data['status']}")
            return None, None
    except Exception as e:
        print(f"Exception: {e}")
        return None, None

def main():
    if len(sys.argv) < 2:
        print("Usage: python geocode_missing.py <GOOGLE_MAPS_API_KEY>")
        return

    api_key = sys.argv[1]
    vets_file = 'web-app/src/data/vets.json'
    
    with open(vets_file, 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    updated_count = 0
    
    print(f"Scanning {len(vets)} vets for missing coordinates...")
    
    for vet in vets:
        if vet['coordinates']['lat'] == 0 and vet['coordinates']['lng'] == 0:
            full_address = f"{vet['practice_name']}, {vet['address']}, {vet['city']}, Germany"
            print(f"Geocoding: {full_address}...")
            
            lat, lng = geocode_address(full_address, api_key)
            if lat and lng:
                vet['coordinates']['lat'] = lat
                vet['coordinates']['lng'] = lng
                updated_count += 1
                print(f"  -> Found: {lat}, {lng}")
                # Respect API rate limits
                time.sleep(0.1)
            else:
                print("  -> Failed to find coordinates.")
    
    if updated_count > 0:
        with open(vets_file, 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print(f"\nSuccessfully updated {updated_count} vets.")
    else:
        print("\nNo updates made.")

if __name__ == "__main__":
    main()

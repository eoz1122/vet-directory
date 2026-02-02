import json
import requests
import time
import sys
import re
import os

def geocode_full_info(query, api_key):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": query,
        "key": api_key,
        "region": "de",
        "language": "de"
    }
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        if data['status'] == 'OK':
            result = data['results'][0]
            formatted = result['formatted_address']
            location = result['geometry']['location']
            # Clean up formatted address - remove Germany if present
            formatted = formatted.replace(", Germany", "").replace(", Deutschland", "")
            return {
                "address": formatted,
                "lat": location['lat'],
                "lng": location['lng']
            }
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def main():
    api_key = "AIzaSyC4EN0MA51sNv7a5hNrDrgNMwV_Moz2CsY"
    vets_file = 'web-app/src/data/vets.json'
    
    if not os.path.exists(vets_file):
        print("vets.json not found")
        return

    with open(vets_file, 'r', encoding='utf-8') as f:
        vets = json.load(f)
    
    updated_count = 0
    total = len(vets)
    
    print(f"Scanning {total} vets for incomplete addresses...")
    
    for i, vet in enumerate(vets):
        # Heuristic for incomplete address: 
        # 1. No 5-digit zip code
        # 2. Very short (less than 12 chars)
        # 3. Just the city name
        # 4. Contains a URL
        address = vet.get('address', '') or ''
        city = vet.get('city', '') or ''
        has_zip = re.search(r'\d{5}', address)
        is_too_short = len(address) < 15
        is_just_city = address.strip().lower() == city.strip().lower()
        is_url = 'http' in address
        
        if not has_zip or is_too_short or is_just_city or is_url:
            query = f"{vet['practice_name']}, {address}, {vet['city']}, Germany"
            print(f"[{i+1}/{total}] Fixing: {vet['practice_name']} ({address})")
            
            info = geocode_full_info(query, api_key)
            if info:
                # Update address
                original = vet['address']
                vet['address'] = info['address']
                
                # Update coordinates if they were 0 or very different
                if vet['coordinates']['lat'] == 0:
                    vet['coordinates']['lat'] = info['lat']
                    vet['coordinates']['lng'] = info['lng']
                
                updated_count += 1
                print(f"  -> Fixed: {vet['address']}")
                time.sleep(0.05) # Small throttle
            else:
                print("  -> Could not fix.")

    if updated_count > 0:
        with open(vets_file, 'w', encoding='utf-8') as f:
            json.dump(vets, f, indent=2, ensure_ascii=False)
        print(f"\nSuccessfully updated {updated_count} addresses.")
    else:
        print("\nNo incomplete addresses found or fixed.")

if __name__ == "__main__":
    main()

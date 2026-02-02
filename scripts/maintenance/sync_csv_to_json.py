
import csv
import json
import os

csv_file = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
json_file = r"C:\Users\emreo\Documents\Vet Directory\web-app\src\data\vets.json"

def main():
    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} not found.")
        return

    # Load existing JSON to preserve fields not in CSV if any (though CSV should be master)
    existing_vets = {}
    if os.path.exists(json_file):
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for v in data:
                existing_vets[v['id']] = v
    
    print(f"Loaded {len(existing_vets)} existing vets from JSON.")

    new_count = 0
    update_count = 0

    first_line = True
    with open(csv_file, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            vet_id = row['ID']
            if not vet_id: continue

            # Extract Lat/Lng
            try:
                lat = float(row['Latitude']) if row['Latitude'] else 0.0
                lng = float(row['Longitude']) if row['Longitude'] else 0.0
            except ValueError:
                lat, lng = 0.0, 0.0

            # Map CSV fields to JSON structure
            vet_data = {
                "id": vet_id,
                "practice_name": row['Practice Name'],
                "city": row['City'],
                "district": row['District'],
                "address": row['Address'],
                "coordinates": {
                    "lat": lat,
                    "lng": lng
                },
                "contact": {
                    "phone": row['Phone'],
                    "website": row['Website'],
                    "google_maps": row.get('Google Maps', '') 
                },
                "verification": {
                    "status": row['Verification Status'],
                    "last_scanned": row['Last Verified'],
                    "english_signals": [row['English Signals']] if row['English Signals'] else [],
                    "emergency_services": row.get('Emergency Services', 'No')
                },
                "community_status": "Verified" if row['Verification Status'] == "Verified" else "Unverified"
            }

            if vet_id in existing_vets:
                # Update existing (merge logic could be more complex, but overwriting with CSV master is safer for data consistency)
                # Preserve google_maps if we don't have it in CSV
                if not vet_data['contact']['google_maps'] and 'google_maps' in existing_vets[vet_id]['contact']:
                    vet_data['contact']['google_maps'] = existing_vets[vet_id]['contact']['google_maps']
                
                # Check for lat/lng updates: if CSV is empty (0) but JSON has data, keep JSON data
                if lat == 0 and lng == 0 and existing_vets[vet_id]['coordinates']['lat'] != 0:
                    vet_data['coordinates'] = existing_vets[vet_id]['coordinates']

                existing_vets[vet_id] = vet_data
                update_count += 1
            else:
                existing_vets[vet_id] = vet_data
                new_count += 1

    # Convert back to list
    final_list = list(existing_vets.values())
    
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(final_list, f, indent=2, ensure_ascii=False)

    print(f"Sync Complete. Total Vets: {len(final_list)}")
    print(f"New: {new_count}, Updated: {update_count}")

if __name__ == "__main__":
    main()

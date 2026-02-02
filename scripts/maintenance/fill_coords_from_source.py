
import csv
import re
import os

source_csv = r"C:\Users\emreo\Documents\Vet Directory\Leipzig.csv"
target_csv = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"

def extract_coords(url):
    # Pattern for !3d...!4d...
    lat_match = re.search(r'!3d(-?\d+\.\d+)', url)
    lng_match = re.search(r'!4d(-?\d+\.\d+)', url)
    
    if lat_match and lng_match:
        return float(lat_match.group(1)), float(lng_match.group(1))
    return None, None

def main():
    # 1. Read source CSV to build a Name -> (Lat, Lng) map
    name_to_coords = {}
    with open(source_csv, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i < 3: continue
            if not row or len(row) < 2: continue
            
            url = row[0]
            name = row[1].strip()
            
            if name:
                lat, lng = extract_coords(url)
                if lat and lng:
                    name_to_coords[name] = (lat, lng)

    print(f"Loaded {len(name_to_coords)} coordinates from source CSV.")

    # 2. Update target CSV
    updated_count = 0
    rows = []
    headers = []
    
    with open(target_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        headers = reader.fieldnames
        for row in reader:
            if not row['Latitude'] or not row['Longitude']:
                name = row['Practice Name']
                # Try exact match first
                if name in name_to_coords:
                    row['Latitude'], row['Longitude'] = name_to_coords[name]
                    updated_count += 1
                else:
                    # Try partial match if needed (skipping for safety unless simple)
                    pass
            rows.append(row)

    if updated_count > 0:
        with open(target_csv, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(rows)
        print(f"Successfully updated coordinates for {updated_count} vets.")
    else:
        print("No matches found for missing coordinates.")

if __name__ == "__main__":
    main()

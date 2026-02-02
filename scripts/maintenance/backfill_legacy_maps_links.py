
import csv
import os
import difflib

# Configuration
db_path = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
base_dir = r"C:\Users\emreo\Documents\Vet Directory"

# Map Cities to potential source CSVs
city_sources = {
    "Berlin": ["google.csv", "google (1).csv"],
    "Frankfurt": ["frankfurt.csv", "frankfurt2.csv"],
    "Hamburg": ["hamburg.csv", "hamburg english speaking.csv"],
    "Munich": ["munich.csv"]
}

def load_source_map(filename):
    """Loads a Name -> URL map from a source CSV."""
    path = os.path.join(base_dir, filename)
    name_map = {}
    if not os.path.exists(path):
        print(f"Warning: Source file {filename} not found.")
        return name_map
    
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.reader(f)
            for row in reader:
                if len(row) >= 2:
                    url = row[0].strip()
                    name = row[1].strip()
                    if url.startswith("http") and name:
                        name_map[name] = url
    except Exception as e:
        print(f"Error reading {filename}: {e}")
    
    return name_map

def main():
    # 1. Load Database
    rows = []
    fieldnames = []
    with open(db_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    if "Google Maps" not in fieldnames:
        print("Error: 'Google Maps' column missing in DB.")
        return

    # 2. Prepare Source Maps
    print("Loading source data...")
    sources_data = {}
    for city, files in city_sources.items():
        sources_data[city] = {}
        for file in files:
            print(f"  Loading {file}...")
            sources_data[city].update(load_source_map(file))

    # 3. Backfill
    updated_count = 0
    
    for row in rows:
        # Skip if already has URL
        if row.get("Google Maps"): continue
        
        city = row.get("City")
        name = row.get("Practice Name")
        
        if not city or not name: continue
        
        # Look up in corresponding city sources
        city_map = sources_data.get(city)
        if not city_map: continue
        
        # Exact Match
        if name in city_map:
            row["Google Maps"] = city_map[name]
            updated_count += 1
        else:
            # Fallback: fuzzy match?
            # Let's try simple normalization first (remove "Dr.", etc)
            pass

    # 4. Write Back
    with open(db_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Backfill Complete. Updated {updated_count} vets with Google Maps URLs.")

if __name__ == "__main__":
    main()

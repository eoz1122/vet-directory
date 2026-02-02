
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

def load_source_data():
    """Loads all source data into a City -> List of (Name, URL) dictionary."""
    data = {}
    for city, files in city_sources.items():
        data[city] = []
        for filename in files:
            path = os.path.join(base_dir, filename)
            if not os.path.exists(path):
                continue
            
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    reader = csv.reader(f)
                    for row in reader:
                        if len(row) >= 2:
                            url = row[0].strip()
                            name = row[1].strip()
                            if url.startswith("http") and name:
                                data[city].append((name, url))
            except Exception as e:
                print(f"Error reading {filename}: {e}")
    return data

def normalize(text):
    """Simple normalization for comparison."""
    return text.lower().replace("dr.", "").replace("med.", "").replace("vet.", "").replace("-", " ").replace("  ", " ").strip()

def find_best_match(target_name, source_list):
    """Finds the best fuzzy match for target_name in source_list."""
    norm_target = normalize(target_name)
    
    # 1. Exact Match via Normalization
    for name, url in source_list:
        if normalize(name) == norm_target:
            return url
            
    # 2. Token Set Match (e.g. "AniCura Berlin" vs "AniCura Tierklinik Berlin")
    target_tokens = set(norm_target.split())
    best_ratio = 0.0
    best_url = None
    
    for name, url in source_list:
        norm_source = normalize(name)
        
        # Difflib Ratio
        ratio = difflib.SequenceMatcher(None, norm_target, norm_source).ratio()
        
        # Boost if one contains the other
        if norm_target in norm_source or norm_source in norm_target:
            ratio += 0.2
            
        if ratio > 0.85 and ratio > best_ratio: # High threshold to avoid false positives
            best_ratio = ratio
            best_url = url
            
    return best_url

def main():
    sources = load_source_data()
    
    rows = []
    fieldnames = []
    with open(db_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    updated_count = 0
    
    for row in rows:
        if row.get("Google Maps"): continue # Skip if already has URL
        
        city = row.get("City")
        name = row.get("Practice Name")
        
        if not city or not name: continue
        
        source_list = sources.get(city)
        if not source_list: continue
        
        match_url = find_best_match(name, source_list)
        if match_url:
            row["Google Maps"] = match_url
            updated_count += 1
            print(f"Matched: '{name}' -> URL found")

    if updated_count > 0:
        with open(db_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)
            
    print(f"Fuzzy Backfill Complete. Updated {updated_count} vets.")

if __name__ == "__main__":
    main()

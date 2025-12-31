
import csv
import os

source_csv = r"C:\Users\emreo\Documents\Vet Directory\Leipzig.csv"
target_csv = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
output_csv = target_csv # Overwrite

def main():
    # 1. Load Maps URLs from source
    name_to_url = {}
    with open(source_csv, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i < 3: continue 
            if len(row) > 1:
                url = row[0].strip()
                name = row[1].strip()
                if name and url:
                    name_to_url[name] = url
    
    print(f"Loaded {len(name_to_url)} Maps URLs from source.")

    # 2. Read target CSV
    rows = []
    fieldnames = []
    
    with open(target_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    # 3. Add new column if missing
    if "Google Maps" not in fieldnames:
        fieldnames.append("Google Maps")
    
    # 4. Populate
    updated_count = 0
    for row in rows:
        # If already has data (unlikely if column is new), skip
        if row.get("Google Maps"): continue
        
        name = row["Practice Name"]
        if name in name_to_url:
             row["Google Maps"] = name_to_url[name]
             updated_count += 1
        elif row.get("City") == "Leipzig":
            # Try to populate anyway? 
            pass

    # 5. Write back
    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Updated {updated_count} rows with Google Maps URLs.")

if __name__ == "__main__":
    main()

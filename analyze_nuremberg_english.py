
import csv
import re

csv_path = r"C:\Users\emreo\Documents\Vet Directory\Nuremberg.csv"
place_id_pattern = re.compile(r"(ChIJ[\w-]+)")

results = []

with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    header = next(reader)
    for i, row in enumerate(reader):
        if not row: continue
        
        url = row[0]
        name = row[1]
        
        # Combine all review/text columns to search for keywords
        all_text = " ".join(row[3:]).lower()
        
        keywords = ["english", "speak", "language", "foreign", "fluent"]
        found_keywords = [k for k in keywords if k in all_text]
        
        place_id_match = place_id_pattern.search(url)
        place_id = place_id_match.group(1) if place_id_match else "N/A"
        
        if found_keywords:
            results.append({
                "row": i + 2,
                "name": name,
                "place_id": place_id,
                "signals": found_keywords,
                "snippets": all_text[:200]
            })

print(f"--- Potential English-Speaking Vets ({len(results)}) ---")
for r in results:
    print(f"Row {r['row']}: {r['name']} (Signals: {r['signals']})")
    print(f"   Review Link: https://search.google.com/local/reviews?placeid={r['place_id']}")
    print(f"   Snippet: {r['snippets']}")
    print("-" * 50)

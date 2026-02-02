
import csv
import re
import os

input_file = r"C:\Users\emreo\Documents\Vet Directory\Leipzig.csv"
output_file = r"C:\Users\emreo\Documents\Vet Directory\leipzig_review_links_v2.md"

# Regex to find Place ID starting with ChIJ within the URL
# It usually appears as !19sChIJ... or just ChIJ... followed by ? or other chars
place_id_pattern = re.compile(r"(ChIJ[\w-]+)")

vets = []
with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        if i < 3: continue 
        if not row: continue
        
        # Col 0: Maps URL
        # Col 1: Name
        if len(row) > 1:
            url = row[0].strip()
            name = row[1].strip()
            
            match = place_id_pattern.search(url)
            if match and name:
                place_id = match.group(1)
                review_url = f"https://search.google.com/local/reviews?placeid={place_id}"
                vets.append((name, review_url))
            elif name:
                # Fallback if no Place ID found
                query = f"{name} Leipzig reviews English"
                fallback_url = f"https://www.google.com/search?q={query}"
                vets.append((name, fallback_url))

# Generate Markdown
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("# Leipzig Vets - Direct Review Links (V2)\n\n")
    f.write("| Vet Name | Direct Review Link |\n")
    f.write("| :--- | :--- |\n")
    
    for name, url in vets:
        f.write(f"| **{name}** | [Open Reviews 🌟]({url}) |\n")

print(f"Generated V2 verification links for {len(vets)} vets in {output_file}")


import csv
import urllib.parse
import os

input_file = r"C:\Users\emreo\Documents\Vet Directory\Leipzig.csv"
output_file = r"C:\Users\emreo\Documents\Vet Directory\leipzig_review_links.md"

def get_google_search_url(name):
    query = f"{name} Leipzig reviews English"
    encoded_query = urllib.parse.quote(query)
    return f"https://www.google.com/search?q={encoded_query}"

# Read CSV (skip header/garbage rows)
vets = []
with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        if i < 3: continue # Skip first 3 lines (headers/garbage)
        if not row: continue
        
        # Based on file inspection:
        # Col 0: Maps URL
        # Col 1: Name
        if len(row) > 1:
            name = row[1].strip()
            if name:
                vets.append(name)

# Generate Markdown
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("# Leipzig Vets - Review Verification Links\n\n")
    f.write("| Vet Name | Verify English Support |\n")
    f.write("| :--- | :--- |\n")
    
    for name in vets:
        url = get_google_search_url(name)
        f.write(f"| **{name}** | [Search Reviews 🔎]({url}) |\n")

print(f"Generated verification links for {len(vets)} vets in {output_file}")

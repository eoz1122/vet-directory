
import csv
import re
import os

source_csv = r"C:\Users\emreo\Documents\Vet Directory\Munich 2.csv"
target_db = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
output_file = r"C:\Users\emreo\Documents\Vet Directory\munich_review_links.md"

# Regex to find Place ID starting with ChIJ within the URL
place_id_pattern = re.compile(r"(ChIJ[\w-]+)")

def main():
    # 1. Load existing verified vets to skip
    verified_names = set()
    with open(target_db, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['City'] == "Munich":
                verified_names.add(row['Practice Name'].strip())

    print(f"Loaded {len(verified_names)} existing Munich vets.")

    # 2. Process Source
    vets_to_check = []
    
    with open(source_csv, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i < 1: continue 
            if not row or len(row) < 2: continue
            
            url = row[0].strip()
            name = row[1].strip()
            
            if not name: continue
            if name in verified_names: continue # Skip already verified/added
            
            match = place_id_pattern.search(url)
            if match:
                place_id = match.group(1)
                # Link to open reviews directly
                review_url = f"https://search.google.com/local/reviews?placeid={place_id}"
                # Also a direct search link as backup/alternative for easy clicking
                search_url = f"https://www.google.com/search?q={name}+Munich+reviews+english"
                vets_to_check.append((name, review_url, search_url))
            else:
                # Fallback
                fallback_url = f"https://www.google.com/search?q={name}+Munich+reviews+english"
                vets_to_check.append((name, "", fallback_url))

    # 3. Generate Markdown
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Munich Vets - Pending Verification\n\n")
        f.write("Click the **Review Link** to open the Google Reviews modal directly. Check for 'English' mentions.\n\n")
        f.write("| Vet Name | Review Link | Search Link |\n")
        f.write("| :--- | :--- | :--- |\n")
        
        for name, rev_url, search_url in vets_to_check:
            rev_link = f"[Open Reviews 🌟]({rev_url})" if rev_url else "N/A"
            search_link = f"[Google Search 🔍]({search_url})"
            f.write(f"| **{name}** | {rev_link} | {search_link} |\n")

    print(f"Generated verification links for {len(vets_to_check)} remaining vets in {output_file}")

if __name__ == "__main__":
    main()

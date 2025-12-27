
import csv
import re
import os

source_csv = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
output_file = r"C:\Users\emreo\Documents\Vet Directory\all_vets_review_links.md"

# Regex to find Place ID starting with ChIJ within the URL
place_id_pattern = re.compile(r"(ChIJ[\w-]+)")

def main():
    vets_data = []
    
    with open(source_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get('Practice Name', 'Unknown')
            city = row.get('City', 'Unknown')
            status = row.get('Verification Status', 'Unknown')
            maps_url = row.get('Google Maps', '')
            
            review_url = ""
            link_source = "Search (Fallback)"
            
            # Try to build Place ID link
            if maps_url:
                match = place_id_pattern.search(maps_url)
                if match:
                    place_id = match.group(1)
                    review_url = f"https://search.google.com/local/reviews?placeid={place_id}"
                    link_source = "Direct (Place ID)"
            
            # Fallback
            if not review_url:
                query = f"{name} {city} reviews english"
                review_url = f"https://www.google.com/search?q={query}"
            
            vets_data.append({
                "name": name,
                "city": city,
                "status": status,
                "url": review_url,
                "source": link_source
            })

    # Sort by City then Name
    vets_data.sort(key=lambda x: (x['city'], x['name']))

    # Generate Markdown
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Master Verification List - All Vets\n\n")
        f.write("List of all vets in the database with links to check reviews. \n")
        f.write("**Direct (Place ID)** links open usage specific modal. **Search (Fallback)** links perform a Google Search.\n\n")
        
        f.write("| City | Vet Name | Status | Review Link | Link Type |\n")
        f.write("| :--- | :--- | :--- | :--- | :--- |\n")
        
        for v in vets_data:
            link_text = "Open Reviews 🌟" if v['source'].startswith("Direct") else "Google Search 🔍"
            f.write(f"| {v['city']} | **{v['name']}** | {v['status']} | [{link_text}]({v['url']}) | {v['source']} |\n")

    print(f"Generated master list for {len(vets_data)} vets in {output_file}")

if __name__ == "__main__":
    main()

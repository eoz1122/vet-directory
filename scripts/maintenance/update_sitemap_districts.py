
import json
import os
from datetime import datetime

vets_json = r"C:\Users\emreo\Documents\Vet Directory\web-app\src\data\vets.json"
sitemap_path = r"C:\Users\emreo\Documents\Vet Directory\web-app\public\sitemap.xml"

with open(vets_json, 'r', encoding='utf-8') as f:
    vets = json.load(f)

# Collect unique city/district pairs
routes = set()
for v in vets:
    city = v.get('city', '').lower().strip()
    district = v.get('district', '').lower().strip()
    
    if not city or not district:
        continue
        
    # Skip generic/placeholder districts
    if district in ['unknown', 'home visits*', 'specialist center', 'mobiler tierarzt']:
        continue
        
    slug = district.replace(' ', '-')
    routes.add((city, slug))

# Filter out routes already in the sitemap
with open(sitemap_path, 'r', encoding='utf-8') as f:
    sitemap_content = f.read()

new_entries = []
today = datetime.now().strftime('%Y-%m-%d')

for city, district_slug in sorted(list(routes)):
    # Check both raw and encoded
    url = f"https://englishspeakinggermany.online/vets/{city}/{district_slug}"
    if url not in sitemap_content:
        new_entries.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>""")

if new_entries:
    print(f"Generated {len(new_entries)} new entries.")
    # Insert before the closing </urlset>
    updated_sitemap = sitemap_content.replace('</urlset>', '\n'.join(new_entries) + '\n</urlset>')
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(updated_sitemap)
    print("Sitemap updated successfully.")
else:
    print("No new entries to add.")

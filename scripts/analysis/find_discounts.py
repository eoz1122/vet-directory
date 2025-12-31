import csv

def find_discounts(file_path, output_path):
    print(f"Analyzing {file_path} for discounts...")
    
    # German and English discount keywords
    keywords = ['discount', 'rabatt', 'gutschein', 'voucher', 'neukunde', 'off', 'save', 'willkommen', '%', 'bonus', 'free', 'gratis', 'sparen', 'deal']
    
    discounts = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                desc = row.get('descriptionShort', '').lower()
                name = row.get('programmeName', '')
                p_sector = row.get('primarySector', '')
                s_sector = row.get('subSectors', '')
                
                # Filter for relevant sectors first (Pet related)
                is_pet = 'Pets & Pet Care' in p_sector or 'Pets & Pet Care' in s_sector or \
                         (('insurance' in p_sector.lower() or 'insurance' in s_sector.lower()) and \
                          ('tier' in desc or 'pet' in desc or 'hund' in desc or 'katze' in desc))

                if is_pet:
                    # Check for discount keywords
                    found_keywords = [k for k in keywords if k in desc]
                    if found_keywords:
                        discounts.append({
                            'name': name,
                            'id': row['advertiserId'],
                            'description': row['descriptionShort'],
                            'keywords': found_keywords
                        })

    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"Found {len(discounts)} Pet advertisers with potential discount mentions.\n\n")
        f.write("--- POTENTIAL OFFERS ---\n")
        for item in discounts:
            f.write(f"[{item['id']}] {item['name']}\n")
            f.write(f"   > {item['description']}\n")
            f.write(f"   (Keywords: {', '.join(item['keywords'])})\n\n")
            
    print(f"Report written to {output_path}")

if __name__ == "__main__":
    find_discounts('data/input/advertiser-directory.csv', 'discount_report.txt')

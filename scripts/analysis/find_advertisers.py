import csv

def find_advertisers(file_path, output_file):
    print(f"Analyzing {file_path}...")
    
    pet_specific = []
    pet_insurance = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                p_sector = row.get('primarySector', '')
                s_sector = row.get('subSectors', '')
                desc = row.get('descriptionShort', '').lower()
                name = row.get('programmeName', '').lower()
                
                is_pet_sector = 'Pets & Pet Care' in p_sector or 'Pets & Pet Care' in s_sector
                
                # Check for Pet Insurance specifically
                # Looking for insurance keywords + pet context
                if (('insurance' in p_sector.lower() or 'insurance' in s_sector.lower() or 'versicherung' in desc) and \
                   (is_pet_sector or 'tier' in desc or 'pet' in desc or 'hund' in desc or 'katze' in desc)):
                    pet_insurance.append(row)
                
                elif is_pet_sector:
                    pet_specific.append(row)

    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    with open(output_file, 'w', encoding='utf-8') as out:
        out.write(f"# Advertiser Analysis\n\n")
        out.write(f"Found {len(pet_insurance)} Pet Insurance advertisers.\n")
        out.write(f"Found {len(pet_specific)} General Pet advertisers.\n\n")
        
        out.write("## 🏆 Top Pet Insurance Candidates\n")
        # Sort insurance by Awin Index
        pet_insurance.sort(key=lambda x: float(x['awinIndex'] or 0), reverse=True)
        for row in pet_insurance:
            out.write(f"- **{row['programmeName']}** (ID: {row['advertiserId']})\n")
            out.write(f"  - Commission: {row['commissionMax']}%\n")
            out.write(f"  - Awin Index: {row['awinIndex']}\n")
            out.write(f"  - Description: {row['descriptionShort']}\n\n")

        out.write("## 🛒 Top Pet Supplies Candidates (Top 10)\n")
        pet_specific.sort(key=lambda x: float(x['awinIndex'] or 0), reverse=True)
        for row in pet_specific[:10]:
            out.write(f"- **{row['programmeName']}** (ID: {row['advertiserId']})\n")
            out.write(f"  - Commission: {row['commissionMax']}%\n")
            out.write(f"  - Awin Index: {row['awinIndex']}\n")
            out.write(f"  - Description: {row['descriptionShort']}\n\n")

if __name__ == "__main__":
    find_advertisers('data/input/advertiser-directory.csv', 'advertiser_report.md')

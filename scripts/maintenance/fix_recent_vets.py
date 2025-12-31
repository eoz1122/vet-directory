
import os
import csv

csv_file = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"

def fix_recent_vets():
    # Read all content
    with open(csv_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    header = lines[0]
    new_lines = [header]
    
    # Define fixes: ID -> Emergency Value
    updates = {
        "Stuttgart-New-1": "24/7", # AniCura Plieningen
        "Stuttgart-New-2": "No",
        "Stuttgart-New-3": "No",
        "Cologne-New-1": "No",
        "Cologne-New-2": "No",
        "Cologne-New-3": "24/7", # Vet Zentrum
        "Hannover-New-1": "24/7", # AniCura
        "Hannover-New-2": "24/7", # TiHo
        "Hannover-New-3": "No",
        "Hannover-New-4": "No"
    }

    count = 0
    for line in lines[1:]:
        parts = line.strip().split(',')
        vet_id = parts[0]
        
        # Check if this is one of our new vets
        if vet_id in updates:
            # Reconstruct the line to have 14 columns
            # Current parts might vary in length if I messed up before
            # Expected: 0-11 present, need to insert 12 (Emergency) and 13 (Google Maps)
            
            # Basic reconstruction based on known indices
            # 0: ID, 1: Name, 2: City, 3: District, 4: Address, 5: Lat, 6: Lng, 7: Phone, 8: Website, 9: Status, 10: Date, 11: English Signals
            
            if len(parts) >= 12:
                # Take first 12 parts exactly
                base_parts = parts[:12]
                
                # Check if we accidentally put emergency info in col 11 (English Signals)
                # "24/7 Emergency; English spoken"
                signals = base_parts[11]
                new_signals = signals.replace("24/7 Emergency; ", "").replace("24/7 Emergency", "").strip()
                if new_signals.startswith(";"): new_signals = new_signals[1:].strip()
                if new_signals == "": new_signals = "English spoken" # Default fallback
                
                base_parts[11] = new_signals
                
                emergency_val = updates[vet_id]
                
                # Create new line with 14 columns
                # Col 12: Emergency Services
                # Col 13: Google Maps (empty)
                
                new_line = ",".join(base_parts) + f",{emergency_val},"
                new_lines.append(new_line + "\n")
                count += 1
            else:
                # Keep original if structure is weirder than expected
                new_lines.append(line)
        else:
            new_lines.append(line)

    with open(csv_file, 'w', encoding='utf-8', newline='') as f:
        f.writelines(new_lines)
        
    print(f"Fixed {count} records with correct Emergency status.")

if __name__ == "__main__":
    fix_recent_vets()

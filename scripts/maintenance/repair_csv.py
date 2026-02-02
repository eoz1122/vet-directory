
import os

csv_file = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"

def repair():
    # Read raw content
    with open(csv_file, 'rb') as f:
        content = f.read()
    
    # Decode with error replacement to salvage valid parts
    text = content.decode('utf-8', errors='replace')
    
    # Split lines and remove the newly added ones if they look corrupted (or just verify them)
    lines = text.splitlines()
    
    # Filter out lines that might be corrupted versions of our new vets or empty trash
    clean_lines = [line for line in lines if "Stuttgart-New" not in line and "REPLACEMENT_CHARACTER" not in line]
    
    # New data to append cleanly
    new_vets = [
        "Stuttgart-New-1,Tierklinik Stuttgart Plieningen (AniCura),Stuttgart,Plieningen,Hermann-Fein-Straße 15,48.7061,9.2155,0711 637380,https://www.tierklinik-stuttgart.de/,Verified,2025-01-26,Emergency Service; English website; Highly recommended",
        "Stuttgart-New-2,Kleintierpraxis Klaus Senger,Stuttgart,West,Schloßstraße 100,48.7758,9.1575,0711 617172,https://www.kleintierpraxis-stuttgart.de/,Verified,2025-01-26,English speaking team",
        "Stuttgart-New-3,Tierarztpraxis Dr. Bendel,Stuttgart,Süd,Böblinger Str. 147,48.7612,9.1625,0711 7657276,https://www.tierarzt-stuttgart.de/,Verified,2025-01-26,English speaking team"
    ]
    
    # Reconstruct file
    final_content = "\n".join(clean_lines) + "\n" + "\n".join(new_vets) + "\n"
    
    with open(csv_file, 'w', encoding='utf-8', newline='') as f:
        f.write(final_content)
        
    print(f"Repaired CSV. Total lines: {len(clean_lines) + len(new_vets)}")

if __name__ == "__main__":
    repair()

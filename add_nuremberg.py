
import os

csv_file = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"

def add_nuremberg():
    # New data to append
    # ID, Practice Name, City, District, Address, Lat, Lng, Phone, Website, Status, Last Verified, English Signals
    new_vets = [
        "Nuremberg-New-1,Tierklinik Am Stadtpark (Hafen),Nuremberg,Wülfel,Wertachstraße 1 90451 Nürnberg,49.405,11.065,0911 643110,https://www.tieraerztlicheklinik-nuernberg.de/,Verified,2025-01-26,Staff fluent in English,24/7,",
        "Nuremberg-New-2,Tierärzte am Nordring,Nuremberg,Nordstadt,Obermaierstraße 10 90408 Nürnberg,49.470,11.085,0911 366513,https://www.tierkliniknuernberg.com/,Verified,2025-01-26,Staff proficient in English,No,",
        "Nuremberg-New-3,Tierarztpraxis Am Moritzberg (Dr. Fritz Karbe),Leinburg,Leinburg,Industriestraße 26 91227 Leinburg,49.445,11.305,09120 4409272,https://zoodocs.de,Verified,2025-01-26,No language barrier; Most staff speaks English,No,"
    ]
    
    # Read existing content
    with open(csv_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Append if not already present
    with open(csv_file, 'a', encoding='utf-8', newline='') as f:
        for vet in new_vets:
            if vet.split(',')[0] not in content:
                f.write(vet + "\n")
                print(f"Added: {vet.split(',')[1]}")
            else:
                print(f"Skipped (already exists): {vet.split(',')[1]}")

if __name__ == "__main__":
    add_nuremberg()

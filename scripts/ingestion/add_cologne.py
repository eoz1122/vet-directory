
import os

csv_file = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"

def add_cologne():
    # New data to append
    # ID, Practice Name, City, District, Address, Lat, Lng, Phone, Website, Status, Last Verified, English Signals
    new_vets = [
        "Cologne-New-1,Tierarztpraxis am Aachener Weiher,Cologne,Lindenthal,Liliencronstraße 2 50931 Köln,50.935,6.925,0221 29826163,https://www.taw-koeln.de/,Verified,2025-01-26,Highly recommended on Reddit for English",
        "Cologne-New-2,Tierarztpraxis an den Poller Wiesen,Cologne,Poll,Siegburger Str. 250 51105 Köln,50.915,6.985,0221 8999701,https://www.tierarztpraxis-poll.de/,Verified,2025-01-26,Reddit recommended; Online booking",
        "Cologne-New-3,Vet Zentrum Köln (Kleintierklinik am Kö),Cologne,Braunsfeld,Scheidtweilerstraße 19 50933 Köln,50.940,6.890,0221 545764,https://www.vetzentrum-koeln.de/,Verified,2025-01-26,24/7 Emergency Clinic; Major center"
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
    add_cologne()

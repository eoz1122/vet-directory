
import os

csv_file = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"

def add_hannover():
    # New data to append
    new_vets = [
        "Hannover-New-1,AniCura Kleintierklinik Hannover,Hannover,Wülfel,Hildesheimer Str. 386 30519 Hannover,52.333,9.775,0511 98634848,https://www.anicura.de/kleintierklinik-hannover/,Verified,2025-01-26,24/7 Emergency; English spoken",
        "Hannover-New-2,Stiftung TiHo (Small Animal Clinic),Hannover,Kirchrode,Bünteweg 9 30559 Hannover,52.360,9.815,0511 9536200,https://www.tiho-hannover.de/kliniken-institute/kliniken/klinik-fuer-kleintiere,Verified,2025-01-26,University Clinic 24/7; Expert care",
        "Hannover-New-3,Kleintierpraxis Dr. Rüdiger Schmidt,Langenhagen,Kaltenweide,Kaltenweider Platz 7b 30855 Langenhagen,52.485,9.735,0511 86672461,https://www.tierarztpraxis-schmidt.com/,Verified,2025-01-26,Recommended on Reddit",
        "Hannover-New-4,Kleintierpraxis am Waldheim (Dr. Engelke),Hannover,Waldheim,Roßkampstraße 38 30519 Hannover,52.350,9.780,0511 832665,http://www.kleintierpraxis-waldheim.de/,Verified,2025-01-26,Highly recommended; Community favorite"
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
    add_hannover()

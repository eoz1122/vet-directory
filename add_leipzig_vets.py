
import csv
import os
from datetime import datetime

file_path = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"
today = datetime.now().strftime("%Y-%m-%d")

# Define ALL verified vets (original 6 + new batch)
new_vets = [
    # Original Batch
    {
        "ID": "Leipzig-1",
        "Practice Name": "Tierarztpraxis Kolonnadenviertel",
        "City": "Leipzig",
        "District": "Zentrum-West",
        "Address": "Kolonnadenstraße 23, 04109 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 9609974",
        "Website": "http://www.tierarztpraxis-kolonnadenviertel.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Multiple reviews explicitly mention English speaking support",
        "Emergency Services": ""
    },
    {
        "ID": "Leipzig-2",
        "Practice Name": "Tierarztpraxis Dr. Fricke - Leipzig",
        "City": "Leipzig",
        "District": "Wahren",
        "Address": "Ölhafenstraße 7, 04159 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 4616264",
        "Website": "https://www.tierarzt-auensee.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Website explicitly lists DE - EN languages",
        "Emergency Services": ""
    },
    {
        "ID": "Leipzig-3",
        "Practice Name": "Tierarztpraxis Reflexus - Kraa, Dr. Leukert und Girgner",
        "City": "Leipzig",
        "District": "Südvorstadt",
        "Address": "Kochstraße 42, 04275 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 3918270",
        "Website": "http://www.reflexus.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Listed as an English-speaking business in directories",
        "Emergency Services": ""
    },
    {
        "ID": "Leipzig-4",
        "Practice Name": "Tierarztpraxis im Planetenviertel",
        "City": "Leipzig",
        "District": "Grünau",
        "Address": "Jupiterstraße 44, 04205 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 24846222",
        "Website": "https://www.tierarztpraxis-im-planetenviertel.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Website has an English version/toggle",
        "Emergency Services": ""
    },
    {
        "ID": "Leipzig-5",
        "Practice Name": "Kleintierklinik der Universität Leipzig",
        "City": "Leipzig",
        "District": "Zentrum-Südost",
        "Address": "An den Tierkliniken 23, 04103 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 9738711",
        "Website": "https://kleintierklinik.uni-leipzig.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "University clinic; standard expectation of English support",
        "Emergency Services": "24/7"
    },
    {
        "ID": "Leipzig-6",
        "Practice Name": "Tierarztpraxis am Rosental",
        "City": "Leipzig",
        "District": "Gohlis",
        "Address": "Möckernsche Str. 26, 04155 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 5948210",
        "Website": "http://www.tierarztpraxis-rosental.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Mentioned in community discussions as English-speaking",
        "Emergency Services": ""
    },
    # New Batch (Batch 2)
    {
        "ID": "Leipzig-7",
        "Practice Name": "felmo Mobiler Tierarzt Leipzig",
        "City": "Leipzig",
        "District": "Mobiler Tierarzt",
        "Address": "Friedrich-List-Platz 1, 04103 Leipzig (Mobile Service)",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0345 48340111",
        "Website": "https://felmo.de/tierarzt/leipzig",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Multiple reviews confirm 'English speaking vets' and 'smooth communication'",
        "Emergency Services": ""
    },
    {
        "ID": "Leipzig-8",
        "Practice Name": "Tierarztpraxis Dr. Christine Fabritius",
        "City": "Leipzig",
        "District": "Zentrum-West",
        "Address": "Davidstraße 16, 04109 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 22287992",
        "Website": "http://www.praxis-fabritius.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Reviews highlight 'knowledgeable staff who are fluent in English'",
        "Emergency Services": ""
    },
    {
        "ID": "Leipzig-9",
        "Practice Name": "Tierarztpraxis Dr. Isabel Göpner/Dr. Silke Schroth",
        "City": "Leipzig",
        "District": "Reudnitz-Thonberg",
        "Address": "Kröbelstraße 11, 04317 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 2254153",
        "Website": "http://www.hund-katze-maus.net/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Listed on English-friendly platforms (Wheree) with explicit English option",
        "Emergency Services": ""
    },
    {
        "ID": "Leipzig-10",
        "Practice Name": "Kleintierpraxis Dr. Fatima Sterl",
        "City": "Leipzig",
        "District": "Gohlis-Nord",
        "Address": "Viaduktweg 4, 04159 Leipzig",
        "Latitude": "",
        "Longitude": "",
        "Phone": "0341 5201717",
        "Website": "http://www.tier-dr-sterl.de/",
        "Verification Status": "Verified",
        "Last Verified": today,
        "English Signals": "Listed on English-friendly directories; high likelihood of support",
        "Emergency Services": ""
    }
]

# Append to CSV
with open(file_path, 'a', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=[
        "ID", "Practice Name", "City", "District", "Address", "Latitude", "Longitude",
        "Phone", "Website", "Verification Status", "Last Verified", "English Signals", "Emergency Services"
    ])
    for vet in new_vets:
        writer.writerow(vet)

print(f"Added {len(new_vets)} Leipzig vets to {file_path}")

import csv
import os

db_path = 'web-app/vets-database-internal.csv'

# Read original DB
with open(db_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    fieldnames = reader.fieldnames

# Updates map
updates = {
    'Berlin-5': {'Emergency Services': '24/7', 'Phone': '030 83862356'},
    'Berlin-9': {'Emergency Services': '24/7', 'Phone': '0174 1601606'},
    'Berlin-81': {'Emergency Services': '24/7', 'Phone': '030 201805750'},
    'Munich-130': {'Emergency Services': '24/7'}
}

# Apply updates
for row in rows:
    if row['ID'] in updates:
        for k, v in updates[row['ID']].items():
            row[k] = v

# New entries to append
new_entries = [
    {
        "ID": "Hamburg-104", "Practice Name": "AniCura Hamburg Tierärztliche Klinik", "City": "Hamburg", "District": "Bahrenfeld",
        "Address": "Stresemannstraße 62, 22769 Hamburg", "Latitude": "53.560645", "Longitude": "9.927233",
        "Phone": "040 854040", "Website": "https://www.anicura.de/standorte/hamburg-altona/",
        "Verification Status": "Verified", "Last Verified": "2025-12-26",
        "English Signals": "Verified English Support", "Emergency Services": "24/7"
    },
    {
        "ID": "Hamburg-105", "Practice Name": "Tierärztliche Klinik Neustadt", "City": "Neustadt (near Hamburg)", "District": "Neustadt",
        "Address": "Goethering 6, 23730 Neustadt in Holstein", "Latitude": "54.103000", "Longitude": "10.822000",
        "Phone": "04561 610160", "Website": "http://www.tierklinik-neustadt.de/",
        "Verification Status": "Verified", "Last Verified": "2025-12-26",
        "English Signals": "Verified English Support", "Emergency Services": "24/7"
    },
    {
        "ID": "Hamburg-106", "Practice Name": "Kleintierklinik im Mühlenfeld", "City": "Hamburg", "District": "Eidelstedt",
        "Address": "Im Mühlenfeld 23, 22523 Hamburg", "Latitude": "53.606700", "Longitude": "9.905600",
        "Phone": "040 5700568", "Website": "http://www.tierklinik-im-muehlenfeld.de/",
        "Verification Status": "Verified", "Last Verified": "2025-12-26",
        "English Signals": "Verified English Support", "Emergency Services": "Weekends/Holidays"
    },
    {
        "ID": "Munich-136", "Practice Name": "AniCura Tierärztliches Zentrum München", "City": "Munich", "District": "Pasing",
        "Address": "Planegger Str. 150, 81241 München", "Latitude": "48.140800", "Longitude": "11.458900",
        "Phone": "089 88909690", "Website": "https://www.anicura.de/tierarztliches-zentrum-munchen/",
        "Verification Status": "Verified", "Last Verified": "2025-12-26",
        "English Signals": "Verified English Support", "Emergency Services": "24/7"
    },
    {
        "ID": "Frankfurt-99", "Practice Name": "Tierklinik Neu-Isenburg", "City": "Neu-Isenburg", "District": "Neu-Isenburg",
        "Address": "Carl-Friedrich-Gauß-Straße 5, 63263 Neu-Isenburg", "Latitude": "50.057500", "Longitude": "8.718000",
        "Phone": "06102 8838221", "Website": "https://www.tierklinik-neu-isenburg.de/",
        "Verification Status": "Verified", "Last Verified": "2025-12-26",
        "English Signals": "Verified English Support", "Emergency Services": "24/7"
    },
    {
        "ID": "Stuttgart-143", "Practice Name": "Tierklinik Nussdorf", "City": "Überlingen", "District": "Nussdorf",
        "Address": "Dieselstraße 7, 88662 Überlingen", "Latitude": "47.781800", "Longitude": "9.198200",
        "Phone": "07551 9494949", "Website": "https://www.tierklinik-nussdorf.de/",
        "Verification Status": "Verified", "Last Verified": "2025-12-26",
        "English Signals": "Verified English Support", "Emergency Services": "24/7"
    },
    {
        "ID": "Stuttgart-144", "Practice Name": "AniCura Tierärztliche Klinik Reutlingen", "City": "Reutlingen", "District": "Reutlingen",
        "Address": "August-Lämmle-Straße 51, 72760 Reutlingen", "Latitude": "48.490800", "Longitude": "9.192500",
        "Phone": "07121 334050", "Website": "https://www.anicura.de/tierklinik-reutlingen",
        "Verification Status": "Verified", "Last Verified": "2025-12-26",
        "English Signals": "Verified English Support", "Emergency Services": "Weekends/Holidays"
    }
]

# Append new entries
rows.extend(new_entries)

# Write back
with open(db_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Successfully updated CSV with {len(rows)} records.")

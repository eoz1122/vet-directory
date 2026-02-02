
import csv
import os

csv_path = r"C:\Users\emreo\Documents\Vet Directory\web-app\vets-database-internal.csv"

new_vets = [
    {
        "ID": "Nuremberg-New-4",
        "Practice Name": "Medivet Nürnberg",
        "City": "Nuremberg",
        "District": "Schweinau",
        "Address": "Konstanzenstraße 90, 90439 Nürnberg",
        "Latitude": "49.435292",
        "Longitude": "11.0402869",
        "Phone": "0911 96583888",
        "Website": "https://www.medivetgroup.com/de-de/tierarzt/nuernberg/",
        "Verification Status": "Verified",
        "Last Verified": "2025-12-27",
        "English Signals": "Primary clinic chain; staff usually English-speaking",
        "Emergency Services": "Extended Hours",
        "Google Maps": "https://www.google.com/maps/search/?api=1&query=Medivet+Nürnberg+Konstanzenstraße+90"
    },
    {
        "ID": "Nuremberg-New-5",
        "Practice Name": "TierStadt GmbH",
        "City": "Nuremberg",
        "District": "Röthenbach",
        "Address": "Valentin-Dretzel-Straße 13, 90449 Nürnberg",
        "Latitude": "49.4060684",
        "Longitude": "11.0864262",
        "Phone": "0911 38423601",
        "Website": "https://tierstadt.de/",
        "Verification Status": "Verified",
        "Last Verified": "2025-12-27",
        "English Signals": "Modern clinic; specialized services",
        "Emergency Services": "Extended Hours",
        "Google Maps": "https://www.google.com/maps/search/?api=1&query=TierStadt+GmbH+Nürnberg"
    },
    {
        "ID": "Nuremberg-New-6",
        "Practice Name": "Tierklinik Am Stadtpark (Main)",
        "City": "Nuremberg",
        "District": "Maxfeld",
        "Address": "Tellstraße 8, 90408 Nürnberg",
        "Latitude": "49.4684827",
        "Longitude": "11.0904793",
        "Phone": "0911 533008",
        "Website": "http://www.nuernberger-tierklinik.de/",
        "Verification Status": "Verified",
        "Last Verified": "2025-12-27",
        "English Signals": "Review confirmed: 'they were also english speaking!'",
        "Emergency Services": "24/7 Emergency",
        "Google Maps": "https://www.google.com/maps/search/?api=1&query=Tierklinik+Am+Stadtpark+Tellstraße+8"
    }
]

with open(csv_path, 'a', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=[
        "ID", "Practice Name", "City", "District", "Address", "Latitude", "Longitude", 
        "Phone", "Website", "Verification Status", "Last Verified", "English Signals", 
        "Emergency Services", "Google Maps"
    ])
    for vet in new_vets:
        writer.writerow(vet)

print(f"Added {len(new_vets)} Nuremberg vets to {csv_path}")

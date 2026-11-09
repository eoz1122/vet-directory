interface LocalCityCare {
    locationNote: string;
    emergencyGuide: string;
    sources: { name: string; note: string; href: string }[];
}

export const LOCAL_CITY_CARE: Record<string, LocalCityCare> = {
    Stuttgart: {
        locationNote: 'The Stuttgart directory also includes surrounding-area listings such as Asperg, Rutesheim, Ludwigsburg, Esslingen and Reutlingen. Check the full address before comparing travel time; a listing grouped under Stuttgart is not necessarily inside the city.',
        emergencyGuide: '/guides/emergency-vets-stuttgart',
        sources: [
            {
                name: 'Kleintierpraxis Dr. Ernst',
                note: 'The Killesberg practice publishes an English page with telephone booking instructions and directions. Ask which clinician can handle your appointment in English.',
                href: 'https://www.kleintierpraxis-ernst.de/en/home/',
            },
            {
                name: 'Kleintierpraxis Klaus Senger',
                note: 'The practice at Smaragdweg 1 publishes English service and contact information. Use the practice contact details to confirm the care needed and English availability.',
                href: 'https://kleintierpraxis-stuttgart.de/en',
            },
        ],
    },
    Leipzig: {
        locationNote: 'Compare the actual address as well as the district: the directory includes a Taucha listing in the greater Leipzig area and mobile services. Ask a mobile provider whether it covers your address; do not assume its listed address is a walk-in clinic.',
        emergencyGuide: '/guides/emergency-vets-leipzig',
        sources: [
            {
                name: 'Tierarztpraxis Leutzsch',
                note: 'The official team page identifies English-speaking team members, including veterinarians Bernhard Regensburger and Daniela Haupt. Ask who is available on your appointment date.',
                href: 'https://tierarztpraxis-leutzsch.de/pages/team.php',
            },
            {
                name: 'Tierarztpraxis am Kirschberg',
                note: 'The appointment page explicitly asks clients to request an English appointment when booking. Mention the language requirement in your first message or call.',
                href: 'https://tierarztpraxis-am-kirschberg.de/sprechzeiten/',
            },
        ],
    },
};

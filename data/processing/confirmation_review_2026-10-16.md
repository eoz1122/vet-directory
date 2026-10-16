# Community confirmation review - 2026-10-16

## Scope and safety

This is a review queue, not an automatic verification run. No `community_status`, verification status, or `last_scanned` value was changed. Confirmation emails remain disabled in production while this queue is adjudicated.

The source log contains 155 records for 41 unique practice IDs. Duplicate submissions are retained as evidence of repetition, not as independent proof.

## Immediate rejection queue

`erfurt-kleintierpraxis-dichterviertel` has 16 records, including 7 suspicious payload-like submissions (SQL/time-delay strings and one mutated-name probe). Those 7 records are untrusted attack traffic and must not be counted as community evidence. The remaining records for this ID still require a normal official-source review before any directory change.

## Active-candidate queue

The 40 IDs below matched the active canonical catalog. Repetition raises review priority only. It does not promote a listing automatically.

Important: all 41 IDs in the source log already have `verification.status = Verified` and `community_status = Verified` in the current catalog, including the Erfurt practice. Therefore this queue requires evidence hygiene and attack filtering, not a bulk status promotion.

| Vet ID | Submissions | Practice | City | Official website in catalog | Triage |
|---|---:|---|---|---|---|
| Internal-Ahlen-1 | 13 | Tierärztliche Klinik für Kleintiere Ahlen | Ahlen | Not listed | Review first; obtain an official source |
| Berlin-1 | 11 | Berlin English Vet (Tierarztpraxis an den Allee-Arcaden) | Berlin | Not listed | Review first; obtain an official source |
| Berlin-10 | 7 | Veterinary Clinic Chung & Wahle | Berlin | http://tierarztpraxis-chung-wahle.com | Review first; official site reachable |
| Hamburg-100 | 7 | Veterinarian Dr. Eva Tutlies | Hamburg | http://www.kleintierpraxis-tutlies.de/ | Review first; official site reachable after redirect |
| Frankfurt-127 | 5 | Flynn Family Medicine | Frankfurt | http://www.flynnsmedical.com/ | Review first; official site reachable after redirect |
| Internal-Augsburg-1 | 5 | AniCura Kleintierspezialisten Augsburg | Augsburg | https://www.anicura.de/standorte/kleintierspezialisten-augsburg/ | Review first; official site reachable |
| Berlin-126 | 5 | DER TIERARZT Dr. Theobald in Schöneberg | Berlin | https://tierarztschoeneberg.de/ | Review first; official site reachable after redirect |
| Frankfurt-129 | 4 | Tierhotel Rhein-Main | Frankfurt | http://www.tierhotel-rhein-main.de/ | Review next; official site reachable after redirect |
| Internal-1 | 4 | Medizinische Kleintierklinik der LMU München | Munich | https://www.vetmed.lmu.de/kleintierklinik/ | Review next; official site reachable after redirect |
| Munich-131 | 4 | Tierarztpraxis Dr. Cornelia Maul und Dr. Sabine Herget | Munich | https://www.tierarzt-muenchen.de/ | Review next; official site reachable after redirect |
| Munich-132 | 4 | Tierklinik Oberhaching | Munich | http://www.tierklinik-oberhaching.de/ | Review next; official site reachable after redirect |
| Stuttgart-137 | 4 | Kleintierpraxis Dr. Ernst | Stuttgart | https://www.kleintierpraxis-ernst.de/en/home/ | Review next; official site reachable |
| Stuttgart-138 | 4 | Felmo Mobiler Tierarzt Stuttgart | Stuttgart | https://felmo.de/tierarzt/stuttgart/ | Review next; official site reachable after redirect |
| Stuttgart-139 | 4 | Kleintierpraxis am Haigst GmbH | Stuttgart | https://kleintierpraxisamhaigst.de/ | Review next; official site reachable |
| Stuttgart-140 | 4 | Dr. med. vet. Erika Christiansen, Ingrid Kucher, Lehel Kooš GbR | Stuttgart | https://tierarztpraxis-asperg.de/ | Review next; official site reachable after redirect |
| Internal-Bremen-1 | 3 | Tierklinik Bremen | Bremen | https://kleintierklinik-bremen.de/ | Review; official site reachable |
| loerrach-anicura-kleintierzentrum | 3 | AniCura Kleintierzentrum Lörrach | Lörrach | https://www.anicura.de/standorte/loerrach/ | Review; official site reachable |
| Cologne-New-1 | 3 | Tierarztpraxis am Aachener Weiher | Cologne | https://www.taw-koeln.de/ | Review; official site reachable |
| Cologne-New-2 | 3 | Tierarztpraxis an den Poller Wiesen | Cologne | https://www.tierarztpraxis-poll.de/ | Review; official site reachable after redirect |
| Cologne-New-3 | 3 | Vet Zentrum Köln (Kleintierklinik am Kö) | Cologne | https://www.vetzentrum-koeln.de/ | Review; TLS certificate currently expired |
| Internal-Cologne-1 | 3 | Tierklinik Kellerwessel | Cologne | https://koelner-tierklinik.de/ | Review; official site reachable |
| Internal-Cologne-2 | 3 | Tierarztpraxis Dr. B. und A. Wichert | Cologne | Not listed | Obtain an official source |
| Leipzig-1 | 3 | Tierarztpraxis Kolonnadenviertel | Leipzig | http://www.tierarztpraxis-kolonnadenviertel.de/ | Review; official site reachable after redirect |
| Leipzig-2 | 3 | Tierarztpraxis Dr. Fricke - Leipzig | Leipzig | https://www.tierarzt-auensee.de/ | Review; official site reachable |
| Leipzig-6 | 3 | Tierarztpraxis am Rosental | Leipzig | http://www.tierarztpraxis-rosental.de/ | Review; official site reachable after redirect |
| Leipzig-Ullrich | 3 | Tierarztpraxis Dr. Ullrich | Leipzig | http://tierarzt-ullrich.de/ | Review; official site reachable after redirect |
| Internal-Nuremberg-1 | 3 | Tierklinik Nürnberg Hafen | Nuremberg | https://www.tierklinik-nbg.de/ | Review; official site reachable |
| dresden-vetpraxis-loebtau | 3 | VetPraxis Tierarztpraxis für Kleintiere! | Dresden | https://www.vetpraxis-dresden.de/ | Review; official site reachable |
| Leipzig-Plenge | 2 | Mobile Tierarztpraxis Dr. Amelie Plenge | Leipzig | Not listed | Obtain an official source |
| Nuremberg-New-2 | 2 | Tierärzte am Nordring | Nuremberg | https://www.tierkliniknuernberg.com/ | Review; official site reachable |
| bremen-exotenpraxis-doernath | 2 | Tierarztpraxis Klein Mexiko | Bremen | https://exotenpraxis-bremen.de/ | Review; official site reachable |
| elmshorn-medivet | 1 | Medivet Elmshorn | Elmshorn | https://www.medivetgroup.com/de-de/tierarzt/elmshorn/ | Review; official site reachable |
| Frankfurt-54 | 1 | Tierarztpraxis Maja Firlé | Frankfurt | Not listed | Obtain an official source |
| Bremen-Medivet | 1 | Medivet Bremen | Bremen | https://www.medivetgroup.com/de-de/tierarzt/bremen/ | Review; official site reachable |
| dresden-wolf-tiger-neustadt | 1 | Wolf & Tiger Tierarztpraxis Dresden am Goldenen Reiter | Dresden | https://www.wolfandtiger.de/locations/dresden/ | Review; official site reachable |
| Nuremberg-New-6 | 1 | Tierklinik Am Stadtpark (Main) | Nuremberg | http://www.nuernberger-tierklinik.de/ | Review; official site reachable after redirect |
| dresden-waldpark | 1 | Kleintierzentrum am Waldpark | Dresden | http://www.tierarzt-dresden-waldpark.de/ | Review; official site reachable after redirect |
| nuremberg-lipper-erlenstegen | 1 | Tierarztpraxis Dr. Erdmute Lipper | Nuremberg | https://www.dr-erdmute-lipper.de/ | Review; official site reachable |
| Frankfurt-53 | 1 | Dr. Cavalcanti (VetPetCare) | Bad Homburg | https://kleintierpraxis-vetpetcare.de | Review; official site reachable |
| essen-tierklinik-apelt | 1 | Tierärztliche Klinik für Kleintiere Dr. Jan Apelt | Essen | https://www.tieraerztliche-klinik.de/ | Review; official site reachable after redirect |

## Recommended adjudication rule

Promote a practice only when an official practice source or a current, attributable patient or vet confirmation supports English-language availability. A reachable website proves presence only, not English support. Keep `community_status`, verification status, and `last_scanned` unchanged until that evidence is recorded.

## Evidence checks completed for the highest-volume queue

- `Berlin-10` (Chung & Wahle): the official English page explicitly says the clinic is international and offers care in German, English, and Mandarin. This is strong official evidence for English support, but it is intentionally not applied automatically.
- `Berlin-1` (Allee-Arcaden): the official site confirms the practice and gives new-client instructions, but the page checked does not explicitly state English support. Keep pending.
- `Internal-Ahlen-1` (AniCura Ahlen): the official AniCura page confirms the active clinic, but the page checked does not explicitly state English support. Keep pending.
- `Hamburg-100` (Dr. Eva Tutlies): the catalog URL redirects to the current Billstedt practice domain, whose official team page confirms the practice is active. The page checked does not explicitly state English support. Keep pending.
- `Internal-Augsburg-1` (AniCura Augsburg): the official page confirms the active specialist centre and contact details, but the page checked does not explicitly state English support. Keep pending.
- `Berlin-126` (Dr. Theobald): the official page confirms the active Schöneberg practice and contact details, but the page checked does not explicitly state English support. Keep pending.
- `Frankfurt-127` (Flynn Family Medicine): the official domain is reachable after redirect. The page was not treated as English-support evidence without an explicit language statement.

Search results and directory pages were used only to locate current official sources. They were not counted as independent proof of English availability.

## Freshness triage

Twenty-six of the 41 practices have `last_scanned` dates older than 180 days as of 2026-10-16. Five of those also have no website listed. These should be the next refresh batch:

`Internal-Ahlen-1`, `Internal-Cologne-2`, `Cologne-New-1`, `Cologne-New-2`, `Cologne-New-3`, `Nuremberg-New-2`, `Berlin-1`, `Berlin-10`, `Berlin-126`, `Frankfurt-127`, `Frankfurt-129`, `Frankfurt-53`, `Frankfurt-54`, `Hamburg-100`, `Leipzig-1`, `Leipzig-6`, `Leipzig-Plenge`, `Leipzig-Ullrich`, `Munich-132`, `Nuremberg-New-6`, `Stuttgart-138`, `Stuttgart-139`, `Stuttgart-140`, `dresden-waldpark`, `dresden-wolf-tiger-neustadt`, `nuremberg-lipper-erlenstegen`.

The five entries without a catalog website are `Berlin-1`, `Frankfurt-54`, `Internal-Ahlen-1`, `Internal-Cologne-2`, and `Leipzig-Plenge`. Refresh these first because a current official source is missing as well as the scan being stale.

## Official-source discovery since the last pass

- `Berlin-1`: official practice site located at `https://www.berlin-english-vet.com/`; it confirms the practice and new-client process, but the checked page does not explicitly state English support.
- `Frankfurt-54`: current official site located at `https://www.tierarzt-firle.de/`, including an official English route at `https://www.tierarzt-firle.de/en/home`; keep English availability as pending until the team or booking process confirms it.
- `Internal-Ahlen-1`: current official AniCura Ahlen source located; it confirms the active clinic and contact details, but not English support.
- `Leipzig-Plenge`: current official contact page located at `https://www.tierarztpraxis-plenge.de/kontakt/`; it confirms the mobile practice and Leipzig service area, but not English support. A direct automated fetch currently returns HTTP 403, so this needs a manual browser check before relying on it.
- `Internal-Cologne-2`: no reliable official practice source located yet. Keep this entry in the highest-priority follow-up queue.

## Next actions

1. Review the seven suspicious records as rejected submissions and retain them only for security audit history.
2. Verify the 15 highest-volume active candidates first, beginning with the seven IDs at 5 or more submissions.
3. Resolve the expired TLS issue for `Cologne-New-3` before treating its website as current evidence.
4. Request an official source for the five practices with no website listed.
5. After adjudication, sweep only approved evidence into the catalog and re-enable notifications as a bounded daily digest, not per submission.

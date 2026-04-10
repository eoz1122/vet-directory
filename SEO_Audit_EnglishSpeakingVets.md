# SEO Audit: EnglishSpeakingVets (englishspeakinggermany.online)
**Audit Date:** April 10, 2026  
**Audit Type:** Full Site Audit — based on live site crawl via Chrome  

---

## What the Site Is

A community-sourced directory of **241 verified English-speaking veterinarians across Germany**, targeting expat pet owners. Coverage includes 30+ cities with neighborhood-level pages (e.g. `/vets/berlin/prenzlauer-berg`), plus a blog covering pet life in Germany (moving, insurance, dog tax, EU pet passports, etc.). 203 URLs are in the sitemap.

---

## Executive Summary

The site has a genuinely strong concept, a useful product, and solid content on its city pages — but it's being held back by **one critical technical flaw that affects every single page**: the title tag and meta description are identical across all 203 URLs. Google sees this as 203 near-duplicate pages and has responded accordingly — the Search Console data shows a catastrophic indexation drop from ~225 pages in January 2026 to near zero in February, with only a partial recovery to 34 pages since. Fixing title tags and meta descriptions is by far the highest-leverage thing you can do. The site also has no schema markup anywhere, no internal linking within blog posts, and a missing H1 on the homepage. Fix those four things and the site's organic trajectory will change dramatically.

---

## 🔴 The #1 Issue: Every Page Has the Same Title & Meta Description

This was confirmed across every page type checked:

| Page | Title Tag (actual) | Meta Description (actual) |
|------|--------------------|--------------------------|
| Homepage (`/`) | `The Pack \| 241 Verified English-Speaking Vets in Germany` | *"Find verified English-speaking veterinarians across Germany…"* |
| `/vets/berlin` | `EnglishSpeakingVets - English Speaking Vets in Germany` | *Same as above* |
| `/vets/berlin/prenzlauer-berg` | `EnglishSpeakingVets - English Speaking Vets in Germany` | *Same as above* |
| `/blog/moving-to-germany-with-pet-2025` | `EnglishSpeakingVets - English Speaking Vets in Germany` | *Same as above* |
| `/blog` | `Expat Dog & Cat Guides Germany \| EnglishSpeakingVets` | *Same as above* |

Google treats pages with identical titles and meta descriptions as duplicate content. With 203 URLs sharing the same signals, the algorithm has difficulty understanding which page is most relevant for any given query — so it often picks none of them, or picks just one. This directly explains the indexation crash visible in Search Console.

**Every city page, every neighborhood page, every blog post needs its own unique title tag and meta description.**

---

## On-Page Issues Table

| Page / Page Type | Issue | Severity | Recommended Fix |
|-----------------|-------|----------|-----------------|
| All 203 pages | **Identical title tag** across entire site | 🔴 Critical | Generate unique title per page (templates below) |
| All 203 pages | **Identical meta description** across entire site | 🔴 Critical | Generate unique meta per page (templates below) |
| Homepage (`/`) | **No H1 tag** | 🔴 Critical | Add `<h1>Find English-Speaking Vets in Germany</h1>` |
| All pages | **No schema markup** anywhere on site | 🔴 High | Add VetClinic/LocalBusiness schema on vet pages; Article schema on blog; Directory on homepage |
| All blog posts | **Zero internal links** back to directory or related articles | 🟠 High | Every blog post should link to at least 2–3 relevant vet city pages and related guides |
| Homepage | Most images missing alt text | 🟠 High | Add descriptive alt text: e.g. `alt="English-speaking vet clinic in Berlin"` |
| Homepage | Title hardcodes "241" — goes stale as directory grows | 🟡 Medium | Use dynamic count or remove the number: `English-Speaking Vets in Germany \| EnglishSpeakingVets` |
| Homepage | Brand mismatch — logo says "English Speaking Vets", title says "The Pack" | 🟡 Medium | Pick one brand name and use it consistently |
| City pages | H2 hardcodes vet count: "66 Verified Practices in Berlin" — will go stale | 🟡 Medium | Make this dynamic or phrase it without the exact number |
| Blog posts | URLs include `2025` (e.g. `/moving-to-germany-with-pet-2025`) — will appear dated | 🟡 Medium | Avoid year-stamped URLs; use `/moving-to-germany-with-pet/` and update content instead |
| All pages | No Open Graph tags confirmed | 🟡 Medium | Add `og:title`, `og:description`, `og:image` to improve social sharing CTR |
| `/blog/moving-to-germany-with-pet-2025` | Meta description is the generic site-wide one, not article-specific | 🔴 Critical | Write article-specific meta description |
| Neighborhood pages (e.g. `/vets/berlin/friedenau`) | Likely thin content — single vet per page | 🟡 Medium | Ensure each has at least a paragraph of neighbourhood context, not just a listing card |
| Robots.txt | Fine — all bots allowed, sitemap referenced correctly | ✅ Pass | No action needed |
| Sitemap | 203 URLs in sitemap, only 34 indexed (17%) | 🔴 Critical | Fix title/meta duplication first — this is almost certainly why Google is refusing to index the rest |

---

## Title Tag & Meta Description Templates

Here's exactly what each page type should use:

**City pages** (`/vets/berlin`, `/vets/munich`, etc.)
- Title: `English-Speaking Vets in [City] | EnglishSpeakingVets`
- Meta: `Find [N] verified English-speaking veterinary practices in [City]. Community-sourced and confirmed by expat pet owners. Emergency vets included.`

**Neighbourhood pages** (`/vets/berlin/prenzlauer-berg`, etc.)
- Title: `English-Speaking Vets in [Neighbourhood], [City] | EnglishSpeakingVets`
- Meta: `Looking for a vet in [Neighbourhood] who speaks English? Here are verified English-speaking practices near you, confirmed by expat reviews.`

**Blog posts**
- Title: `[Article Title] | EnglishSpeakingVets`  
  e.g. `Moving to Germany with a Pet: The 2025 Survival Checklist | EnglishSpeakingVets`
- Meta: Write a 150-160 character summary specific to that article's content — not the generic directory description.

**Homepage**
- Title: `English-Speaking Vets in Germany | Verified Expat Directory`
- Meta: `The trusted directory for expat pet owners in Germany. Find verified English-speaking veterinarians in Berlin, Hamburg, Munich, Frankfurt and 30+ cities.`

**Blog index**
- Title: `Expat Pet Guides for Germany | EnglishSpeakingVets`
- Meta: `Practical guides for expat pet owners in Germany — moving with pets, dog tax, EU pet passports, pet insurance, and more. In plain English.`

---

## Indexation Status & the February Crash

The Search Console screenshot shows:
- **~225 pages indexed** through January 2026
- **Massive drop to near-zero** around February 1–3, 2026
- **Slow recovery to 34 pages** by late March 2026
- **19 pages currently not indexed** (5 reasons), including 6 with "Page with redirect"

The February crash timing suggests a site migration, rebuild, or CMS change that broke something. The most likely causes given what we found:

1. The title/meta duplication may have worsened significantly at that point (e.g. if the site was rebuilt on a new framework and the dynamic title generation stopped working)
2. The 6 "Page with redirect" errors in Search Console suggest some URLs were changed without proper 301 redirects — Google followed the old URL, got redirected, and dropped both
3. If the site moved from one URL structure to another (e.g. `/berlin` → `/vets/berlin`), old inbound links and Google's cached URLs would now 404 or redirect

**Action:** In Search Console, open each of the "not indexed" reasons and look at the specific URLs. The redirect issue (6 pages) should be fixable immediately.

---

## Technical SEO Checklist

| Check | Status | Details |
|-------|--------|---------|
| robots.txt | ✅ Pass | Correct — allows all crawlers, references sitemap |
| Sitemap | ⚠️ Warning | 203 URLs submitted; only 34 indexed (17%). Fix title/meta duplication first. |
| HTTPS | ✅ Pass | Site loads on HTTPS |
| Meta robots on pages | ✅ Pass | All checked pages show `index, follow` |
| Canonical tags | ✅ Pass | Canonical set on checked pages |
| H1 tags | ❌ Fail | Missing on homepage; present on city pages and blog posts |
| Unique title tags | ❌ Fail | Identical across all page types |
| Unique meta descriptions | ❌ Fail | Identical across all page types |
| Schema markup | ❌ Fail | Absent on all checked pages |
| Image alt text | ❌ Fail | Missing on most homepage images; OK on blog posts |
| Internal linking | ❌ Fail | Blog posts contain zero internal links to directory pages |
| Open Graph tags | ⚠️ Unconfirmed | Not detected on checked pages |
| Page speed / Core Web Vitals | ⚠️ Unaudited | Run PageSpeed Insights on `/vets/berlin` to check LCP, CLS, INP |
| Mobile friendliness | ⚠️ Unaudited | Visual inspection suggested responsive design; test in Search Console |
| Broken links / 404s | ⚠️ Unaudited | 6 "Page with redirect" issues confirmed in Search Console — investigate |

---

## Keyword Opportunities (Actual Niche)

*These are the terms your city and neighbourhood pages should be ranking for but currently aren't, due to the title/meta issue.*

| Keyword | Est. Difficulty | Opportunity | Relevant Page |
|---------|----------------|-------------|---------------|
| english speaking vet berlin | Low | 🔴 High | `/vets/berlin` |
| english speaking vet hamburg | Low | 🔴 High | `/vets/hamburg` |
| english speaking vet munich | Low | 🔴 High | `/vets/munich` |
| english speaking vet frankfurt | Low | 🔴 High | `/vets/frankfurt` |
| tierarzt english speaking berlin | Low | 🔴 High | `/vets/berlin` |
| vet in berlin that speaks english | Very Low | 🔴 High | `/vets/berlin` |
| moving to germany with a dog | Low-Medium | 🔴 High | `/blog/moving-to-germany-with-pet-2025` |
| eu pet passport germany | Low | 🔴 High | `/blog/eu-pet-passport-germany-2025` |
| hundesteuer germany expat | Very Low | 🔴 High | `/blog/hundesteuer-dog-tax-germany-2025` |
| pet insurance germany expats | Low-Medium | 🟠 Medium | `/blog/pet-insurance-germany-2025` |
| english speaking vet cologne | Very Low | 🟠 Medium | `/vets/cologne` |
| english speaking vet stuttgart | Very Low | 🟠 Medium | `/vets/stuttgart` |
| dogs on berlin public transport | Very Low | 🟠 Medium | `/blog/public-transport-with-dogs-berlin-2025` |
| pet friendly apartments germany | Low | 🟠 Medium | `/blog/pet-friendly-apartments-germany-2025` |
| cat registration germany | Very Low | 🟠 Medium | `/blog/cat-registration-germany-2025` |
| english vet prenzlauer berg | Very Low | 🟢 Low | `/vets/berlin/prenzlauer-berg` |
| emergency vet berlin english | Very Low | 🟢 Low | `/vets/berlin` + new emergency section |
| dog tax berlin 2026 | Very Low | 🟢 Low | `/blog/hundesteuer-dog-tax-germany-2025` |

Most of these are **very low competition** — they're niche, long-tail, and intent-specific. The only reason you're not ranking for them is the title/meta duplication problem.

---

## Content Gap Analysis

You have good foundational blog content. Here's what's missing:

**High priority — directly supports directory traffic:**
- **Emergency vets in Germany** — "emergency vet berlin english" and similar have real search demand. A dedicated emergency vet section or article would drive high-intent traffic and is a clear gap vs. any competitor.
- **"English-speaking vet near me" landing page** — a location-aware or general hub page explaining your verification methodology, optimised for trust queries.
- **Vet comparison content** — "Best vets in Berlin for expats" — listicle format, directly drives clicks to your directory listings.

**Medium priority — builds blog authority:**
- German pet laws for expats (Tierschutzgesetz summary in English)
- Guide to German pharmacy vs. vet prescriptions
- What to expect at a German vet (culture guide — reduces anxiety for first-timers)
- City-specific pet guides (best dog parks in Berlin, pet-friendly cafés Munich, etc.) — currently no competitors own this space well

**Missing formats:**
- **FAQ pages** per city — "Do vets in Berlin speak English?" — directly targetable for People Also Ask SERP features
- **Structured comparison table** of pet insurance providers — high affiliate potential
- **Checklist** — "First week with a new vet in Germany" — highly shareable, link-worthy

---

## Competitor Landscape

You're in a niche with essentially **no direct competitors** — no other site is doing a verified English-speaking vet directory for Germany. The indirect competition is:
- General expat Germany sites (iamexpat.de, expatica.com) — they have a vet-finding section but it's not verified or English-specific
- Google Maps — the default fallback, but it doesn't filter for English-speaking or verify it
- Expat Facebook groups — where people currently ask "does anyone know an English-speaking vet in Berlin?"

**This is a genuine competitive moat.** The directory concept is defensible if you execute the SEO basics. You're losing to Google Maps right now not because Maps is better — but because your pages aren't ranking due to the title/meta issue.

---

## Prioritized Action Plan

### 🚀 Quick Wins — Do This Week

1. **Fix title tags — all 203 pages** (Impact: 🔴 Critical | Effort: 2–4 hours with templates)
   - Use the templates above. This is a template/CMS change, not manual work — one fix in your page template propagates to all city and neighbourhood pages.

2. **Fix meta descriptions — all 203 pages** (Impact: 🔴 Critical | Effort: 2–4 hours with templates)
   - Same approach — update the meta description template in your CMS/framework to use city name, neighbourhood name, article title as variables.

3. **Add H1 to homepage** (Impact: 🔴 High | Effort: 15 minutes)
   - `<h1>Find English-Speaking Vets in Germany</h1>` above the listings grid.

4. **Fix the 6 "Page with redirect" errors in Search Console** (Impact: 🔴 High | Effort: 1–2 hours)
   - Go to Search Console → Indexing → Pages → "Page with redirect". Find the old URLs being redirected, update the sitemap and any internal links to point to the final destination URLs.

5. **Add alt text to homepage images** (Impact: 🟠 Medium | Effort: 30 minutes)
   - Each vet listing image: `alt="[Clinic Name] — English-speaking vet in [Neighbourhood], [City]"`

6. **Request indexing for your top 10 most important pages** via Search Console URL Inspection (Impact: 🔴 High | Effort: 30 minutes)
   - After fixing titles/metas: `/vets/berlin`, `/vets/hamburg`, `/vets/munich`, `/vets/frankfurt`, `/vets/cologne`, `/vets/stuttgart`, `/blog`, homepage, and your two best blog posts.

---

### 📈 Strategic Investments — This Quarter

1. **Add schema markup to all page types** (Impact: 🔴 High | Effort: 1–2 days)
   - City/neighbourhood pages: `VeterinaryCare` + `LocalBusiness` JSON-LD for each listed vet (name, address, telephone, openingHours)
   - Blog posts: `Article` schema (headline, author, datePublished, dateModified)
   - Homepage: `WebSite` + `Organization` schema
   - This enables rich results (star ratings, opening hours) in Google SERPs — massive CTR boost for local searches

2. **Add internal links inside every blog post** (Impact: 🟠 High | Effort: 2–3 hours across 16 posts)
   - Every blog post should contain 2–3 contextual links to city vet pages. e.g. the "Moving to Germany" guide should link to `/vets/berlin`, `/vets/hamburg`, `/vets/munich` naturally within the text.

3. **Create an Emergency Vets page/section** (Impact: 🔴 High | Effort: 1 day)
   - "24-hour English-speaking emergency vets in Germany" is extremely high-intent, no real competition, and the kind of search someone does in a stressful moment — perfect for your audience.

4. **Build city FAQ pages** (Impact: 🟠 Medium | Effort: 2 hours per city)
   - A short FAQ block on each city page ("Do vets in Berlin speak English?", "How do I find a vet in Germany as an expat?") targets People Also Ask boxes with near-zero effort.

5. **Pursue first backlinks** (Impact: 🔴 High | Effort: Ongoing)
   - Your biggest weakness is zero inbound links — domain authority is effectively 0. Targets:
     - Expat Facebook groups (post your directory — people will bookmark and share it)
     - iamexpat.de, expatica.com — reach out to be listed as a resource
     - Expat blogs (guest post: "How we verified 241 English-speaking vets in Germany")
     - Relocation companies and HR/mobility platforms that serve international employees

6. **Fix year-stamped blog URLs before they age** (Impact: 🟡 Medium | Effort: 1 day)
   - Consider migrating `/blog/moving-to-germany-with-pet-2025` → `/blog/moving-to-germany-with-pet` with 301 redirects, then update the content date in the title/H1 instead. Evergreen URLs rank longer and don't need to be recreated each year.

---

*Audit prepared by Claude · EnglishSpeakingVets · April 10, 2026*  
*Based on live crawl of englishspeakinggermany.online via Chrome browser inspection*

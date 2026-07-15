# Patiotech Wholesale — Digital Business Cards

Static multi-person digital business card site for **Patiotech Wholesale**.

Built with HTML5, CSS3, and vanilla JavaScript only. No frameworks, package managers, CDNs, backends, or analytics.

Live path (GitHub Pages):

`https://goomoralybeam.github.io/digital-business-card/`

---

## Run locally (this computer only)

```bash
py -m http.server 5500 --bind 127.0.0.1
```

If `py` is unavailable:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Then open:

- Default Jason card: http://127.0.0.1:5500/
- Explicit Jason: http://127.0.0.1:5500/?person=jason
- Team directory: http://127.0.0.1:5500/?directory=true

`--bind 127.0.0.1` keeps the server reachable only on this computer. Do **not** bind `0.0.0.0` or a LAN IP on an office network.

---

## Employee URLs

| URL | Result |
|-----|--------|
| `/` or `/?person=jason` | Jason Dao |
| `/?person=SLUG` | Matching employee |
| `/?person=unknown` | Contact not found |
| `/?directory=true` | Team directory |

Example:

`https://goomoralybeam.github.io/digital-business-card/?person=jason`

---

## How to add a new employee

1. Add their photo as `assets/people/slug.jpg`
2. Add a profile object in `people.js` (see the commented `stefan` example)
3. The object **key** is the URL slug (`?person=slug`)
4. Slugs: lowercase letters, numbers, hyphens only
5. Separate profiles with commas
6. Shared fields can reuse company phone, website, cover and QR
7. Keep mobile, email, name, role and avatar employee-specific

No separate HTML page is required. Save generates a vCard in the browser from the selected profile.

---

## Project structure

```
/
├── index.html
├── styles.css
├── script.js
├── people.js
├── contact.vcf          (fallback only)
├── logo.png
├── README.md
├── .nojekyll
└── assets/
    ├── cover.jpg
    ├── avatar.jpg       (original Jason photo — kept for compatibility)
    ├── qr-website.png
    ├── people/
    │   └── jason.jpg
    └── icons/
        └── …
```

---

## Colour theme

- White `#FFFFFF`
- Logo orange `#F08026`
- COLORBOND Monument `#323233`

---

## Cover image height

Restored to pre-compaction behaviour:

- `aspect-ratio: 16 / 9`
- `max-height: 220px`
- `object-fit: cover`
- Avatar overlaps the bottom edge

Scrolling is expected on smaller phones.

---

## Safety notes

- Fully static and client-side
- No LAN discovery, backends, or external scripts
- Local testing listens on `127.0.0.1` only
- Paths are relative (works under `/digital-business-card/` on GitHub Pages)

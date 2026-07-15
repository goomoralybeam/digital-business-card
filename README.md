# Jason Dao — Digital Business Card

Static digital business card for **Jason Dao**, System Administration at **Patiotech Wholesale**.

Built with HTML5, CSS3, and vanilla JavaScript only. No frameworks, no package managers, no external CDNs.

---

## Run locally (this computer only)

Open a terminal in this project folder, then start Python’s built-in static file server **bound to localhost**:

```bash
py -m http.server 5500 --bind 127.0.0.1
```

If `py` is not available on your system, use:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Then open:

[http://127.0.0.1:5500](http://127.0.0.1:5500)

or

[http://localhost:5500](http://localhost:5500)

### Why `--bind 127.0.0.1`?

Binding to `127.0.0.1` keeps the development server accessible **only from the current computer**. It is not reachable from other devices on the office network, Wi‑Fi, or the internet.

Do **not** bind to `0.0.0.0`, your LAN IP address, or any public network interface for office-network safety.

Stop the server with `Ctrl+C` when finished.

### Opening the file directly

You can also open `index.html` directly in a browser (double-click / File → Open). Most of the page works this way. Clipboard and native share may be limited by browser rules on the `file://` protocol — prefer the local server above when testing those actions.

---

## Testing on a physical phone

Do **not** expose this development server on an office Wi‑Fi or LAN for phone testing.

Safer options:

1. Publish the site to GitHub Pages first, then open the public HTTPS URL on the phone.
2. Test from a **personal** home network (not an office network).
3. Use a **personal** mobile hotspot.
4. Transfer screenshots for visual review.

The NFC card and a real QR code should only point to the final public HTTPS URL after publishing.

---

## Project structure

```
/
├── index.html
├── styles.css
├── script.js
├── contact.vcf
├── logo.png
├── README.md
├── .nojekyll
└── assets/
    ├── profile-placeholder.svg
    ├── cover-placeholder.svg
    ├── qr-placeholder.svg
    └── icons/
        ├── mobile.svg
        ├── phone.svg
        ├── email.svg
        ├── website.svg
        ├── contact.svg
        ├── copy.svg
        └── share.svg
```

`.nojekyll` tells GitHub Pages not to process the site with Jekyll when you publish later.

---

## Replace placeholders

### Profile photo

Real photo: `assets/avatar.jpg`

### Cover image

Web cover image: `assets/cover.jpg` (optimised for mobile).

The original large `assets/cover.png` is optional and can be deleted to keep the GitHub repo smaller.

### QR code

`assets/qr-website.png` encodes `https://patiotechwholesale.com.au` (Monument modules on white). The QR is also a tappable link to the same URL.

To regenerate later:

```bash
py -c "import qrcode; qr=qrcode.QRCode(box_size=10,border=2); qr.add_data('https://patiotechwholesale.com.au'); qr.make(fit=True); qr.make_image(fill_color='#323233', back_color='#FFFFFF').save('assets/qr-website.png')"
```

### Logo

`logo.png` is the official company logo (including tagline). Do not recreate, crop, stretch, or add a second slogan under it.

### Colour theme

White `#FFFFFF` · Logo orange `#F08026` · COLORBOND Monument `#323233`

### Contact details

Edit the `contact` object at the top of `script.js`, and keep `contact.vcf` and the fallback text in `index.html` in sync.

---

## Features

| Action | Behaviour |
|--------|-----------|
| Mobile / Business | Opens `tel:` dial links |
| Email | Opens `mailto:` |
| Website | Opens company site in a new tab |
| Save Contact | Downloads `contact.vcf` |
| Copy Details | Copies formatted contact text |
| Share Card | Uses `navigator.share` when available; otherwise copies the page URL |

---

## Network & safety notes

- Fully static and client-side only — no backend.
- No analytics, tracking, cookies, or external scripts.
- No LAN discovery, scanning, or requests to other network devices.
- Local testing listens on `127.0.0.1` only.
- No administrator privileges required.
- Publishing to GitHub Pages / DNS / hosting is intentionally not configured in this phase.

/* =========================================================
   people.js — Employee profiles for the digital business card
   =========================================================
   HOW TO ADD A NEW EMPLOYEE
   ---------------------------------------------------------
   1. The object KEY is the URL slug, e.g. ?person=stefan
   2. Slug must use lowercase letters, numbers or hyphens only
   3. Avatar filename should normally match the slug
      (e.g. assets/people/stefan.jpg)
   4. Separate each profile object with a comma
   5. Business phone, website, cover, website QR, address and
      opening hours may be shared (see companyInfo below)
   6. Mobile, email, name, role, avatar and card QR are
      normally employee-specific
   7. After adding a person, generate their card QR PNG:
      assets/qr-card-SLUG.png → their GitHub Pages card URL
   ========================================================= */

/** Shared company details applied to every employee card */
const companyInfo = {
  addressDisplay: "302 Woodpark Rd, Smithfield NSW 2164",
  addressMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=302%20Woodpark%20Rd%2C%20Smithfield%20NSW%202164",
  addressStreet: "302 Woodpark Rd",
  addressLocality: "Smithfield",
  addressRegion: "NSW",
  addressPostcode: "2164",
  addressCountry: "Australia",
  hoursDisplay:
    "Mon–Fri 7:00am–3:30pm (all services)\nSat 7:00am–3:30pm (pickup only)"
};

const people = {
  jason: {
    fullName: "Jason Dao",
    role: "System Admin",
    company: "Patiotech Wholesale",
    mobileDisplay: "+61 414 225 210",
    mobileLink: "+61414225210",
    businessDisplay: "+61 2 8380 0089",
    businessLink: "+61283800089",
    email: "jason.d@patiotechwholesale.com.au",
    websiteDisplay: "patiotechwholesale.com.au",
    websiteUrl: "https://patiotechwholesale.com.au",
    slogan: "Outdoor Living Engineered",
    avatar: "assets/people/jason.jpg",
    cover: "assets/cover.jpg",
    qrImage: "assets/qr-website.png",
    qrUrl: "https://patiotechwholesale.com.au",
    qrLabel: "Scan for website",
    cardQrImage: "assets/qr-card-jason.png",
    cardQrUrl: "https://goomoralybeam.github.io/digital-business-card/?person=jason",
    cardQrLabel: "Scan for this card"
  },

  alice: {
    fullName: "Alice Nguyen",
    role: "Marketing Manager",
    company: "Patiotech Wholesale",
    mobileDisplay: "+61 2 8380 0089",
    mobileLink: "+61283800089",
    businessDisplay: "+61 2 8380 0089",
    businessLink: "+61283800089",
    email: "alice.n@patiotechwholesale.com.au",
    websiteDisplay: "patiotechwholesale.com.au",
    websiteUrl: "https://patiotechwholesale.com.au",
    slogan: "Outdoor Living Engineered",
    avatar: "assets/people/alice.svg",
    cover: "assets/cover.jpg",
    qrImage: "assets/qr-website.png",
    qrUrl: "https://patiotechwholesale.com.au",
    qrLabel: "Scan for website",
    cardQrImage: "assets/qr-card-alice.png",
    cardQrUrl: "https://goomoralybeam.github.io/digital-business-card/?person=alice",
    cardQrLabel: "Scan for this card"
  },

  stefan: {
    fullName: "Stefan Dimov",
    role: "Sale Manager",
    company: "Patiotech Wholesale",
    mobileDisplay: "+61 2 8380 0089",
    mobileLink: "+61283800089",
    businessDisplay: "+61 2 8380 0089",
    businessLink: "+61283800089",
    email: "stefan.d@patiotechwholesale.com.au",
    websiteDisplay: "patiotechwholesale.com.au",
    websiteUrl: "https://patiotechwholesale.com.au",
    slogan: "Outdoor Living Engineered",
    avatar: "assets/people/stefan.svg",
    cover: "assets/cover.jpg",
    qrImage: "assets/qr-website.png",
    qrUrl: "https://patiotechwholesale.com.au",
    qrLabel: "Scan for website",
    cardQrImage: "assets/qr-card-stefan.png",
    cardQrUrl: "https://goomoralybeam.github.io/digital-business-card/?person=stefan",
    cardQrLabel: "Scan for this card"
  },

  kimhak: {
    fullName: "KimHak Keo",
    role: "CEO",
    company: "Patiotech Wholesale",
    mobileDisplay: "+61 2 8380 0089",
    mobileLink: "+61283800089",
    businessDisplay: "+61 2 8380 0089",
    businessLink: "+61283800089",
    email: "kim.keo@goomor.com.au",
    websiteDisplay: "patiotechwholesale.com.au",
    websiteUrl: "https://patiotechwholesale.com.au",
    slogan: "Outdoor Living Engineered",
    avatar: "assets/people/kimhak.svg",
    cover: "assets/cover.jpg",
    qrImage: "assets/qr-website.png",
    qrUrl: "https://patiotechwholesale.com.au",
    qrLabel: "Scan for website",
    cardQrImage: "assets/qr-card-kimhak.png",
    cardQrUrl: "https://goomoralybeam.github.io/digital-business-card/?person=kimhak",
    cardQrLabel: "Scan for this card"
  },

  robert: {
    fullName: "Robert Piez",
    role: "Sale Manager",
    company: "Patiotech Wholesale",
    mobileDisplay: "+61 2 8380 0089",
    mobileLink: "+61283800089",
    businessDisplay: "+61 2 8380 0089",
    businessLink: "+61283800089",
    email: "robert.p@patiotechwholesale.com.au",
    websiteDisplay: "patiotechwholesale.com.au",
    websiteUrl: "https://patiotechwholesale.com.au",
    slogan: "Outdoor Living Engineered",
    avatar: "assets/people/robert.svg",
    cover: "assets/cover.jpg",
    qrImage: "assets/qr-website.png",
    qrUrl: "https://patiotechwholesale.com.au",
    qrLabel: "Scan for website",
    cardQrImage: "assets/qr-card-robert.png",
    cardQrUrl: "https://goomoralybeam.github.io/digital-business-card/?person=robert",
    cardQrLabel: "Scan for this card"
  },

  vin: {
    fullName: "Vin Than",
    role: "Warehouse Manager",
    company: "Patiotech Wholesale",
    mobileDisplay: "+61 2 8380 0089",
    mobileLink: "+61283800089",
    businessDisplay: "+61 2 8380 0089",
    businessLink: "+61283800089",
    email: "vin.than@goomor.com.au",
    websiteDisplay: "patiotechwholesale.com.au",
    websiteUrl: "https://patiotechwholesale.com.au",
    slogan: "Outdoor Living Engineered",
    avatar: "assets/people/vin.svg",
    cover: "assets/cover.jpg",
    qrImage: "assets/qr-website.png",
    qrUrl: "https://patiotechwholesale.com.au",
    qrLabel: "Scan for website",
    cardQrImage: "assets/qr-card-vin.png",
    cardQrUrl: "https://goomoralybeam.github.io/digital-business-card/?person=vin",
    cardQrLabel: "Scan for this card"
  }
};

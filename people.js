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
   5. Business phone, website, cover and QR may be shared
   6. Mobile, email, name, role and avatar are normally unique
   ========================================================= */

const people = {
  jason: {
    fullName: "Jason Dao",
    role: "System Administration",
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
    qrLabel: "Scan for website"
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
    qrLabel: "Scan for website"
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
    qrLabel: "Scan for website"
  }
};

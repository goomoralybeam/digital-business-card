/* =========================================================
   Multi-person digital business card — Patiotech Wholesale
   Theme: White · Logo orange · COLORBOND Monument
   ========================================================= */

const FEEDBACK_MS = 2000;
const DEFAULT_SLUG = "jason";

/** @type {string|null} */
let activeSlug = null;
/** @type {object|null} */
let activeProfile = null;
/** @type {string|null} */
let vcardObjectUrl = null;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof people !== "object" || people === null) {
    showNotFound();
    return;
  }

  const params = new URLSearchParams(window.location.search);

  if (params.get("directory") === "true") {
    showDirectory();
    return;
  }

  const selected = getSelectedPerson();
  if (!selected.profile) {
    showNotFound(selected.slug);
    return;
  }

  showCard();
  applyProfile(selected.slug, selected.profile);
  wireActions();
});

function getSelectedPerson() {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = (params.get("person") || DEFAULT_SLUG)
    .trim()
    .toLowerCase();

  return {
    slug: requestedSlug,
    profile: Object.prototype.hasOwnProperty.call(people, requestedSlug)
      ? people[requestedSlug]
      : null
  };
}

function showCard() {
  setViewVisibility({ card: true, notFound: false, directory: false });
}

function showNotFound() {
  setViewVisibility({ card: false, notFound: true, directory: false });
  document.title = "Contact not found · Patiotech Wholesale";
  const back = document.getElementById("btn-back-home");
  if (back) {
    back.href = "./?person=" + encodeURIComponent(DEFAULT_SLUG);
  }
}

function showDirectory() {
  setViewVisibility({ card: false, notFound: false, directory: true });
  document.title = "Our Team · Patiotech Wholesale";
  renderDirectory();
}

function setViewVisibility({ card, notFound, directory }) {
  const cardEl = document.getElementById("view-card");
  const notFoundEl = document.getElementById("view-not-found");
  const directoryEl = document.getElementById("view-directory");
  if (cardEl) cardEl.hidden = !card;
  if (notFoundEl) notFoundEl.hidden = !notFound;
  if (directoryEl) directoryEl.hidden = !directory;
}

function applyProfile(slug, profile) {
  activeSlug = slug;
  activeProfile = profile;

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (key && Object.prototype.hasOwnProperty.call(profile, key)) {
      el.textContent = profile[key];
    }
  });

  const title = `${profile.fullName} · ${profile.company}`;
  const description = `${profile.role} at ${profile.company}. ${profile.slogan}.`;

  document.title = title;
  setMeta("meta-description", "content", description);
  setMeta("meta-author", "content", `${profile.fullName}, ${profile.company}`);
  setMeta("og-title", "content", title);
  setMeta("og-description", "content", description);
  setMeta("og-image", "content", profile.cover);
  setMeta("twitter-title", "content", title);
  setMeta("twitter-description", "content", description);
  setMeta("twitter-image", "content", profile.cover);

  const cover = document.getElementById("cover-image");
  if (cover) {
    cover.src = profile.cover;
    cover.alt = "Patiotech Wholesale project cover";
  }

  const avatar = document.getElementById("profile-image");
  if (avatar) {
    avatar.src = profile.avatar;
    avatar.alt = profile.fullName;
  }

  const qrImage = document.getElementById("qr-image");
  if (qrImage) {
    qrImage.src = profile.qrImage;
    qrImage.alt = `QR code linking to ${profile.websiteDisplay || profile.qrUrl}`;
  }

  const qrLabel = document.getElementById("qr-label");
  if (qrLabel) {
    qrLabel.textContent = profile.qrLabel;
  }

  const mobile = document.getElementById("link-mobile");
  const business = document.getElementById("link-business");
  const email = document.getElementById("link-email");
  const website = document.getElementById("link-website");
  const qr = document.getElementById("link-qr");

  if (mobile) {
    mobile.href = `tel:${profile.mobileLink}`;
    mobile.setAttribute("aria-label", `Call mobile ${profile.mobileDisplay}`);
  }
  if (business) {
    business.href = `tel:${profile.businessLink}`;
    business.setAttribute("aria-label", `Call business phone ${profile.businessDisplay}`);
  }
  if (email) {
    email.href = `mailto:${profile.email}`;
    email.setAttribute("aria-label", `Email ${profile.email}`);
  }
  if (website) {
    website.href = profile.websiteUrl;
    website.target = "_blank";
    website.rel = "noopener noreferrer";
    website.setAttribute(
      "aria-label",
      `Visit ${profile.websiteDisplay} (opens in a new tab)`
    );
  }
  if (qr) {
    qr.href = profile.qrUrl;
    qr.target = "_blank";
    qr.rel = "noopener noreferrer";
    qr.setAttribute(
      "aria-label",
      `Scan or tap QR code to open ${profile.qrUrl}`
    );
  }

  updateSaveLink(profile);
}

function setMeta(id, attr, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, value);
}

function wireActions() {
  const saveBtn = document.getElementById("btn-save");
  const copyBtn = document.getElementById("btn-copy");
  const shareBtn = document.getElementById("btn-share");
  const fallbackClose = document.getElementById("fallback-close");
  const fallback = document.getElementById("copy-fallback");

  if (saveBtn) {
    saveBtn.addEventListener("click", (event) => {
      if (!activeProfile) return;
      // Refresh the blob URL on each click so it stays current
      updateSaveLink(activeProfile);
      if (!vcardObjectUrl) {
        // Blob unavailable — allow fallback href (contact.vcf) to proceed
        return;
      }
      // Ensure download attribute is set; default navigation handles Blob links
      event.preventDefault();
      triggerBlobDownload(vcardObjectUrl, saveBtn.getAttribute("download") || "contact.vcf");
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      void handleCopyDetails(copyBtn);
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      void handleShare(shareBtn);
    });
  }

  if (fallbackClose && fallback) {
    fallbackClose.addEventListener("click", () => {
      fallback.hidden = true;
    });

    fallback.addEventListener("click", (event) => {
      if (event.target === fallback) {
        fallback.hidden = true;
      }
    });
  }
}

/* ---------- Directory ---------- */

function renderDirectory() {
  const list = document.getElementById("directory-list");
  if (!list) return;
  list.replaceChildren();

  Object.keys(people).forEach((slug) => {
    const profile = people[slug];
    const li = document.createElement("li");
    li.className = "directory-item";

    const link = document.createElement("a");
    link.className = "directory-link";
    link.href = `?person=${encodeURIComponent(slug)}`;
    link.setAttribute(
      "aria-label",
      `Open digital business card for ${profile.fullName}, ${profile.role}`
    );

    const img = document.createElement("img");
    img.className = "directory-avatar";
    img.src = profile.avatar;
    img.alt = "";
    img.width = 64;
    img.height = 64;
    img.decoding = "async";

    const text = document.createElement("span");
    text.className = "directory-text";

    const name = document.createElement("span");
    name.className = "directory-name";
    name.textContent = profile.fullName;

    const role = document.createElement("span");
    role.className = "directory-role";
    role.textContent = profile.role;

    text.append(name, role);
    link.append(img, text);
    li.append(link);
    list.append(li);
  });
}

/* ---------- Copy / Share ---------- */

function buildDetailsText(profile) {
  return [
    profile.fullName,
    profile.role,
    profile.company,
    `Mobile: ${profile.mobileDisplay}`,
    `Business: ${profile.businessDisplay}`,
    `Email: ${profile.email}`,
    `Website: ${profile.websiteUrl}`,
    profile.slogan
  ].join("\n");
}

function getEmployeeShareUrl(slug) {
  const url = new URL(window.location.href);
  url.searchParams.delete("directory");
  url.searchParams.set("person", slug);
  return url.toString();
}

async function handleCopyDetails(button) {
  if (!activeProfile) return;
  const text = buildDetailsText(activeProfile);
  const label = button.querySelector(".btn-label");
  const original = label ? label.textContent : "Copy";

  const ok = await copyText(text);
  if (ok) {
    setTemporaryLabel(label, "Details copied", original);
  } else {
    showCopyFallback(text);
  }
}

async function handleShare(button) {
  if (!activeProfile || !activeSlug) return;
  const label = button.querySelector(".btn-label");
  const original = label ? label.textContent : "Share";
  const shareUrl = getEmployeeShareUrl(activeSlug);
  const shareData = {
    title: document.title,
    text: `${activeProfile.fullName} · ${activeProfile.role} at ${activeProfile.company}`,
    url: shareUrl
  };

  if (typeof navigator.share === "function") {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err && (err.name === "AbortError" || err.name === "NotAllowedError")) {
        return;
      }
    }
  }

  const ok = await copyText(shareUrl);
  if (ok) {
    setTemporaryLabel(label, "Link copied", original);
  } else {
    showCopyFallback(shareUrl);
  }
}

async function copyText(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fall through
    }
  }
  return legacyCopy(text);
}

function legacyCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  area.style.top = "0";
  document.body.appendChild(area);
  area.focus();
  area.select();

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch (_) {
    success = false;
  }

  document.body.removeChild(area);
  return success;
}

function showCopyFallback(text) {
  const panel = document.getElementById("copy-fallback");
  const field = document.getElementById("fallback-text");
  if (!panel || !field) {
    window.prompt("Copy these details:", text);
    return;
  }
  field.value = text;
  panel.hidden = false;
  field.focus();
  field.select();
}

function setTemporaryLabel(labelEl, temporary, original) {
  if (!labelEl) return;
  labelEl.textContent = temporary;
  window.setTimeout(() => {
    labelEl.textContent = original;
  }, FEEDBACK_MS);
}

/* ---------- vCard generation ---------- */

function escapeVCardValue(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function splitName(fullName) {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { first: "", last: "" };
  }
  if (parts.length === 1) {
    return { first: parts[0], last: "" };
  }
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts[parts.length - 1]
  };
}

function buildVCard(profile) {
  const { first, last } = splitName(profile.fullName);
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(last)};${escapeVCardValue(first)};;;`,
    `FN:${escapeVCardValue(profile.fullName)}`,
    `ORG:${escapeVCardValue(profile.company)}`,
    `TITLE:${escapeVCardValue(profile.role)}`,
    `TEL;TYPE=CELL:${escapeVCardValue(profile.mobileLink)}`,
    `TEL;TYPE=WORK,VOICE:${escapeVCardValue(profile.businessLink)}`,
    `EMAIL;TYPE=WORK:${escapeVCardValue(profile.email)}`,
    `URL:${escapeVCardValue(profile.websiteUrl)}`,
    `NOTE:${escapeVCardValue(profile.slogan)}`,
    "END:VCARD"
  ];
  return lines.join("\r\n") + "\r\n";
}

function filenameFromProfile(profile) {
  return (
    String(profile.fullName)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") + ".vcf"
  );
}

function updateSaveLink(profile) {
  const btn = document.getElementById("btn-save");
  if (!btn) return;

  const filename = filenameFromProfile(profile) || "contact.vcf";
  btn.setAttribute("download", filename);
  btn.setAttribute("aria-label", `Save contact as vCard for ${profile.fullName}`);

  if (typeof Blob === "undefined" || typeof URL === "undefined" || !URL.createObjectURL) {
    // Graceful fallback for environments without Blob URLs
    btn.href = "contact.vcf";
    return;
  }

  if (vcardObjectUrl) {
    URL.revokeObjectURL(vcardObjectUrl);
    vcardObjectUrl = null;
  }

  const blob = new Blob([buildVCard(profile)], {
    type: "text/vcard;charset=utf-8"
  });
  vcardObjectUrl = URL.createObjectURL(blob);
  btn.href = vcardObjectUrl;
}

function triggerBlobDownload(objectUrl, filename) {
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

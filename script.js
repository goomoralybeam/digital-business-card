/* =========================================================
   Configuration — update contact details in one place
   ========================================================= */
const contact = {
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
  slogan: "Outdoor Living Engineered"
};

const FEEDBACK_MS = 2000;

document.addEventListener("DOMContentLoaded", () => {
  populateFields();
  wireActions();
});

function populateFields() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (key && Object.prototype.hasOwnProperty.call(contact, key)) {
      el.textContent = contact[key];
    }
  });

  const mobile = document.getElementById("link-mobile");
  const business = document.getElementById("link-business");
  const email = document.getElementById("link-email");
  const website = document.getElementById("link-website");
  const qr = document.getElementById("link-qr");

  if (mobile) {
    mobile.href = `tel:${contact.mobileLink}`;
    mobile.setAttribute("aria-label", `Call mobile ${contact.mobileDisplay}`);
  }
  if (business) {
    business.href = `tel:${contact.businessLink}`;
    business.setAttribute("aria-label", `Call business phone ${contact.businessDisplay}`);
  }
  if (email) {
    email.href = `mailto:${contact.email}`;
    email.setAttribute("aria-label", `Email ${contact.email}`);
  }
  if (website) {
    website.href = contact.websiteUrl;
    website.setAttribute(
      "aria-label",
      `Visit ${contact.websiteDisplay} (opens in a new tab)`
    );
  }
  if (qr) {
    qr.href = contact.websiteUrl;
    qr.setAttribute(
      "aria-label",
      `Scan or tap QR code to open ${contact.websiteDisplay}`
    );
  }
}

function wireActions() {
  const copyBtn = document.getElementById("btn-copy");
  const shareBtn = document.getElementById("btn-share");
  const fallbackClose = document.getElementById("fallback-close");
  const fallback = document.getElementById("copy-fallback");

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

function buildDetailsText() {
  return [
    contact.fullName,
    contact.role,
    contact.company,
    `Mobile: ${contact.mobileDisplay}`,
    `Business: ${contact.businessDisplay}`,
    `Email: ${contact.email}`,
    `Website: ${contact.websiteUrl}`,
    contact.slogan
  ].join("\n");
}

async function handleCopyDetails(button) {
  const text = buildDetailsText();
  const label = button.querySelector(".btn-label");
  const original = label ? label.textContent : "Copy Details";

  const ok = await copyText(text);
  if (ok) {
    setTemporaryLabel(label, "Details copied", original);
  } else {
    showCopyFallback(text);
  }
}

async function handleShare(button) {
  const label = button.querySelector(".btn-label");
  const original = label ? label.textContent : "Share Card";
  const shareData = {
    title: document.title,
    text: `${contact.fullName} · ${contact.role} at ${contact.company}`,
    url: window.location.href
  };

  if (typeof navigator.share === "function") {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      // User cancelled share sheet — do not show an error
      if (err && (err.name === "AbortError" || err.name === "NotAllowedError")) {
        return;
      }
      // Fall through to URL copy for other failures
    }
  }

  const ok = await copyText(window.location.href);
  if (ok) {
    setTemporaryLabel(label, "Link copied", original);
  } else {
    showCopyFallback(window.location.href);
  }
}

async function copyText(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fall through to legacy method
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

const banner = document.querySelector(".notification-banner");
const closeButtons = banner?.querySelectorAll(
  ".notification-banner_close, .notification-banner_cta-close"
);

const KEY = "banner_closed_until";
const now = Date.now();
const until = Number(localStorage.getItem(KEY) || 0);

// Beim Laden ausblenden, wenn 24h noch nicht vorbei sind
if (banner && until > now) {
  banner.style.display = "none";
}

// Über beide Close-Klassen schließbar + 24h merken
closeButtons?.forEach((btn) => {
  btn.addEventListener("click", () => {
    const oneDay = 24 * 60 * 60 * 1000;
    localStorage.setItem(KEY, String(Date.now() + oneDay));
    banner.style.display = "none";
  });
});

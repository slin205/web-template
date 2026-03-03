const STORAGE_KEY = "notificationBannerClosed";
const banner = document.querySelector(".notification-banner");

if (banner && localStorage.getItem(STORAGE_KEY) === "1") {
  banner.style.display = "none";
}

const closeButtons = banner?.querySelectorAll(
  ".notification-banner-close, .notification-banner-cta-close"
);

closeButtons?.forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, "1");
    banner.style.display = "none";
  });
});

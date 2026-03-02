const banner = document.querySelector(".notification-banner");
const closeButtons = banner?.querySelectorAll(
  ".notification-banner-close, .notification-banner-cta-close"
);

closeButtons?.forEach((btn) => {
  btn.addEventListener("click", () => {
    banner.style.display = "none";
  });
});

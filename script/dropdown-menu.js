const megaItems = document.querySelectorAll(".has-mega");

function closeAllMega() {
  megaItems.forEach((item) => {
    item.classList.remove("open");
    const btn = item.querySelector(".nav-trigger");
    const panel = item.querySelector(".mega");
    btn?.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  });
}

megaItems.forEach((item) => {
  const btn = item.querySelector(".nav-trigger");
  const panel = item.querySelector(".mega");

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = item.classList.contains("open");
    closeAllMega();

    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });
});

document.addEventListener("click", closeAllMega);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllMega();
});

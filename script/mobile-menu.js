const trigger = document.querySelector(".mobile-trigger");
const menu = document.getElementById("mobileMenu");
const icon = trigger?.querySelector(".material-symbols-filled");
const globalnav = document.querySelector(".globalnav");

trigger?.addEventListener("click", () => {
  const isOpen = !menu.hasAttribute("hidden");

  if (isOpen) {
    menu.setAttribute("hidden", "");
    trigger.setAttribute("aria-expanded", "false");
    icon.textContent = "dehaze";
    globalnav?.classList.remove("menu-open");
    trigger.focus();
  } else {
    menu.removeAttribute("hidden");
    trigger.setAttribute("aria-expanded", "true");
    icon.textContent = "close";
    globalnav?.classList.add("menu-open");
    menu.querySelector("a, button, [tabindex]:not([tabindex='-1'])")?.focus();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (menu.hasAttribute("hidden")) return;

  menu.setAttribute("hidden", "");
  trigger.setAttribute("aria-expanded", "false");
  icon.textContent = "dehaze";
  globalnav?.classList.remove("menu-open");
  trigger.focus();
});



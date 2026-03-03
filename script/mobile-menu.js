const trigger = document.querySelector(".mobile-trigger");
const menu = document.getElementById("mobileMenu");
const icon = trigger?.querySelector(".material-symbols-filled");
const globalnav = document.querySelector(".globalnav");
const desktopMq = window.matchMedia("(min-width: 1280px)");

function closeMobileMenu({ focusTrigger = false } = {}) {
  if (!menu || !trigger || !icon) return;
  menu.setAttribute("hidden", "");
  trigger.setAttribute("aria-expanded", "false");
  icon.textContent = "dehaze";
  globalnav?.classList.remove("menu-open");
  if (focusTrigger) trigger.focus();
}

function openMobileMenu() {
  if (!menu || !trigger || !icon) return;
  menu.removeAttribute("hidden");
  trigger.setAttribute("aria-expanded", "true");
  icon.textContent = "close";
  globalnav?.classList.add("menu-open");
  menu.querySelector("a, button, [tabindex]:not([tabindex='-1'])")?.focus();
}

trigger?.addEventListener("click", () => {
  const isOpen = !menu.hasAttribute("hidden");
  if (isOpen) closeMobileMenu({ focusTrigger: true });
  else openMobileMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (menu.hasAttribute("hidden")) return;
  closeMobileMenu({ focusTrigger: true });
});

// Wenn auf Desktop gewechselt wird -> Mobile-Menüzustand zurücksetzen
function handleBreakpointChange(e) {
  if (e.matches) closeMobileMenu();
}

handleBreakpointChange(desktopMq);
desktopMq.addEventListener("change", handleBreakpointChange);

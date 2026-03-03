const resetBtn = document.querySelector(".cookie-rest button");

resetBtn?.addEventListener("click", () => {
  localStorage.clear();
  history.scrollRestoration = "manual";
  location.replace(location.pathname + location.search);
});

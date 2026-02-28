const resetBtn = document.querySelector(".cookie-rest button");

resetBtn?.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

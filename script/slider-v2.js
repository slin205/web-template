document.querySelectorAll(".slider").forEach((slider) => {
  const track = slider.querySelector(".slider-track");
  if (!track) return;

  const originals = Array.from(track.querySelectorAll(".slider-item"));
  if (originals.length < 2) return;

  const cloneCount = Math.min(2, originals.length);
  const ANIM = "transform 1.618s cubic-bezier(0.618, 0.062, 0.272, 1)";
  const intervalMs = 3814;

  // Vorne: letzte N (rückwärts, damit Reihenfolge stimmt)
  for (let i = originals.length - 1; i >= originals.length - cloneCount; i -= 1) {
    track.insertBefore(originals[i].cloneNode(true), track.firstChild);
  }

  // Hinten: erste N
  for (let i = 0; i < cloneCount; i += 1) {
    track.appendChild(originals[i].cloneNode(true));
  }

  const items = Array.from(track.querySelectorAll(".slider-item"));
  let index = cloneCount;
  let timer = null;

  function setActive(i) {
    items.forEach((item, idx) => item.classList.toggle("is-active", idx === i));
  }

  function moveTo(i, instant = false) {
    const item = items[i];
    const left = item.offsetLeft;
    const centerOffset = (slider.clientWidth - item.getBoundingClientRect().width) / 2;

    track.style.transition = instant ? "none" : ANIM;
    track.style.transform = `translate3d(-${left - centerOffset}px, 0, 0)`;
    setActive(i);
  }

  function jumpTo(i) {
    index = i;
    moveTo(index, true);
    track.offsetHeight; // reflow
    track.style.transition = ANIM;
  }

  function nextSlide() {
    index += 1;
    moveTo(index, false);
  }

  function prevSlide() {
    index -= 1;
    moveTo(index, false);
  }

  function startAuto() {
    if (timer) return;
    timer = setInterval(nextSlide, intervalMs);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  // Start: sofort korrekt positionieren, dann autoplay
  jumpTo(index);
  startAuto();

  track.addEventListener("transitionend", () => {
    const firstReal = cloneCount;
    const lastReal = items.length - cloneCount - 1;

    if (index > lastReal) jumpTo(firstReal);
    else if (index < firstReal) jumpTo(lastReal);
  });

  window.addEventListener("resize", () => jumpTo(index));

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  slider.setAttribute("tabindex", "0");
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { stopAuto(); nextSlide(); startAuto(); }
    if (e.key === "ArrowLeft") { stopAuto(); prevSlide(); startAuto(); }
  });

  slider.addEventListener("click", (e) => {
    if (e.target.closest("a, button, input, select, textarea, label")) return;

    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const zone = rect.width * 0.25;

    stopAuto();
    if (x <= zone) prevSlide();
    else if (x >= rect.width - zone) nextSlide();
    startAuto();
  });
});

document.querySelectorAll(".slider").forEach((slider) => {
  const track = slider.querySelector(".slider-track");
  if (!track || slider.dataset.sliderInit) return;
  slider.dataset.sliderInit = "1";

  const originals = [...track.querySelectorAll(".slider-item")];
  if (originals.length < 2) return;

  const dotsWrap = slider.querySelector(".slider-dots");
  const n = Math.min(2, originals.length);
  const delay = 3814;

  // Original-Index auf echte Slides setzen (wird in Clones mitkopiert)
  originals.forEach((item, i) => {
    item.dataset.originIndex = String(i);
  });

  // Clones vorne/hinten
  for (let i = originals.length - 1; i >= originals.length - n; i--) {
    track.prepend(originals[i].cloneNode(true));
  }
  for (let i = 0; i < n; i++) {
    track.append(originals[i].cloneNode(true));
  }

  const items = [...track.querySelectorAll(".slider-item")];
  const realCount = originals.length;
  let index = n; // erstes echtes Slide
  let timer = null;
  let isHover = false;

  // Dots
  const dots = dotsWrap
    ? Array.from({ length: realCount }, (_, i) => {
        const b = document.createElement("button");
        b.className = "slider-dot";
        b.type = "button";
        b.setAttribute("aria-label", `Slide ${i + 1}`);
        dotsWrap.appendChild(b);
        return b;
      })
    : [];

  const xFor = (i) => {
    const el = items[i];
    return -(el.offsetLeft - (slider.clientWidth - el.getBoundingClientRect().width) / 2);
  };

  const setDots = () => {
    if (!dots.length) return;
    const realIndex = (index - n + realCount) % realCount;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === realIndex));
  };

  const move = (i, instant = false) => {
    track.style.transition = instant ? "none" : "";
    track.style.transform = `translate3d(${xFor(i)}px,0,0)`;
    setDots();
  };

  const jump = (i) => {
    index = i;
    move(index, true);
    track.offsetHeight; // reflow
    track.style.transition = "";
  };

  const start = () => {
    if (isHover || timer) return;
    timer = setInterval(() => {
      index += 1;
      move(index);
    }, delay);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  // Dot-Klick
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      stop();
      index = i + n; // echtes Ziel im Realblock
      move(index);
      if (!isHover) start();
    });
  });

  // Klick auf sichtbare Nachbar-Slides
  slider.addEventListener("click", (e) => {
    const clickedItem = e.target.closest(".slider-item");
    if (!clickedItem || !track.contains(clickedItem)) return;
    if (e.target.closest(".slider-dot")) return;

    const targetOrigin = Number(clickedItem.dataset.originIndex);
    if (Number.isNaN(targetOrigin)) return;

    const base = n + targetOrigin;
    const candidates = [base, base - realCount, base + realCount];

    const best = candidates.reduce((bestIdx, cur) =>
      Math.abs(cur - index) < Math.abs(bestIdx - index) ? cur : bestIdx
    );

    if (best === index) return;

    stop();
    index = best;
    move(index);
    if (!isHover) start();
  });

  // Init
  requestAnimationFrame(() => {
    jump(index);
    start();
  });

  // Endlos-Reset
  track.addEventListener("transitionend", () => {
    const firstReal = n;
    const lastReal = items.length - n - 1;

    if (index > lastReal) jump(firstReal);
    else if (index < firstReal) jump(lastReal);
  });

  // Resize
  window.addEventListener("resize", () => jump(index));

  // Hover Pause/Resume
  slider.addEventListener("mouseenter", () => {
    isHover = true;
    stop();
  });

  slider.addEventListener("mouseleave", () => {
    isHover = false;
    start();
  });
});

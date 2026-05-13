(function () {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const viewport = document.getElementById("lb-viewport");
  const stage = document.getElementById("lb-stage");
  const image = document.getElementById("lb-img");
  const closeBtn = document.getElementById("lb-close");
  const prevBtn = document.getElementById("lb-prev");
  const nextBtn = document.getElementById("lb-next");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");
  const counterTop = document.getElementById("lb-counter");
  const counterBottom = document.getElementById("lb-counter-bottom");
  const gallery = document.getElementById("gallery");

  if (
    !items.length ||
    !lightbox ||
    !viewport ||
    !stage ||
    !image ||
    !closeBtn ||
    !prevBtn ||
    !nextBtn ||
    !zoomInBtn ||
    !zoomOutBtn ||
    !counterTop ||
    !counterBottom
  ) {
    return;
  }

  let current = 0;
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  function formatIndex(value) {
    return String(value).padStart(2, "0");
  }

  function updateCounter() {
    const value = formatIndex(current + 1) + " / " + formatIndex(items.length);
    counterTop.textContent = value;
    counterBottom.textContent = value;
  }

  function applyTransform() {
    image.style.transform =
      "translate(calc(-50% + " + translateX + "px), calc(-50% + " + translateY + "px)) scale(" + scale + ")";
  }

  function clampPosition() {
    if (scale <= 1) {
      translateX = 0;
      translateY = 0;
      return;
    }

    const maxX = Math.max(0, (image.clientWidth * scale - viewport.clientWidth) / 2);
    const maxY = Math.max(0, (image.clientHeight * scale - viewport.clientHeight) / 2);
    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  function setZoom(nextScale) {
    scale = Math.max(1, Math.min(4, nextScale));
    clampPosition();
    applyTransform();
  }

  function loadImage(index) {
    const item = items[index];
    const preview = item.querySelector("img");

    if (!preview) {
      return;
    }

    image.src = item.dataset.full || preview.src;
    image.alt = preview.alt;
    updateCounter();
    resetZoom();
  }

  function openLightbox(index) {
    current = index;
    loadImage(current);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    image.src = "";
    document.body.style.overflow = "";
    viewport.classList.remove("is-dragging");
  }

  function showPrevious() {
    current = (current - 1 + items.length) % items.length;
    loadImage(current);
  }

  function showNext() {
    current = (current + 1) % items.length;
    loadImage(current);
  }

  function zoomFromPoint(factor, clientX, clientY) {
    const rect = viewport.getBoundingClientRect();
    const nextScale = Math.max(1, Math.min(4, scale * factor));

    if (nextScale === 1) {
      resetZoom();
      return;
    }

    const pointX = clientX - rect.left - rect.width / 2 - translateX;
    const pointY = clientY - rect.top - rect.height / 2 - translateY;
    const ratio = nextScale / scale;

    translateX -= pointX * (ratio - 1);
    translateY -= pointY * (ratio - 1);
    scale = nextScale;
    clampPosition();
    applyTransform();
  }

  items.forEach(function (item, index) {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrevious);
  nextBtn.addEventListener("click", showNext);

  zoomInBtn.addEventListener("click", function () {
    zoomFromPoint(
      1.25,
      viewport.clientWidth / 2 + viewport.getBoundingClientRect().left,
      viewport.clientHeight / 2 + viewport.getBoundingClientRect().top
    );
  });

  zoomOutBtn.addEventListener("click", function () {
    zoomFromPoint(
      0.8,
      viewport.clientWidth / 2 + viewport.getBoundingClientRect().left,
      viewport.clientHeight / 2 + viewport.getBoundingClientRect().top
    );
  });

  viewport.addEventListener("wheel", function (event) {
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.12 : 0.9;
    zoomFromPoint(factor, event.clientX, event.clientY);
  }, { passive: false });

  viewport.addEventListener("dblclick", function (event) {
    if (scale > 1) {
      resetZoom();
      return;
    }

    zoomFromPoint(2, event.clientX, event.clientY);
  });

  viewport.addEventListener("pointerdown", function (event) {
    if (scale <= 1) {
      return;
    }

    isDragging = true;
    dragStartX = event.clientX - translateX;
    dragStartY = event.clientY - translateY;
    viewport.classList.add("is-dragging");
  });

  window.addEventListener("pointermove", function (event) {
    if (!isDragging) {
      return;
    }

    translateX = event.clientX - dragStartX;
    translateY = event.clientY - dragStartY;
    clampPosition();
    applyTransform();
  });

  window.addEventListener("pointerup", function () {
    isDragging = false;
    viewport.classList.remove("is-dragging");
  });

  stage.addEventListener("click", function (event) {
    if (event.target === stage) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }

    if (event.key === "+") {
      setZoom(scale + 0.25);
    }

    if (event.key === "-") {
      setZoom(scale - 0.25);
    }
  });

  if (gallery) {
    gallery.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  }

  lightbox.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
})();

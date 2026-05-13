(function () {
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const dots = Array.from(document.querySelectorAll(".carousel-dot"));
  const prev = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");
  const counter = document.getElementById("carousel-count");
  const total = slides.length;

  if (!total || !dots.length || !prev || !next || !counter) {
    return;
  }

  let current = 0;
  let timer;

  function formatIndex(value) {
    return String(value).padStart(2, "0");
  }

  function show(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + total) % total;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    counter.textContent = formatIndex(current + 1) + " / " + formatIndex(total);
  }

  function resetTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      show(current + 1);
    }, 6800);
  }

  prev.addEventListener("click", function () {
    show(current - 1);
    resetTimer();
  });

  next.addEventListener("click", function () {
    show(current + 1);
    resetTimer();
  });

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      show(index);
      resetTimer();
    });
  });

  counter.textContent = formatIndex(current + 1) + " / " + formatIndex(total);
  resetTimer();
})();

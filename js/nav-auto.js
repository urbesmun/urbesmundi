(function () {
  const series = [
    {
      index: "01",
      title: "Estocolmo en invierno",
      href: "proyectos/1-estocolmo/1-estocolmo.html"
    },
    {
      index: "02",
      title: "Bilbao en B&N",
      href: "proyectos/2-bilbaoBN/2-bilbaoBN.html"
    }
  ];

  const entries = [
    {
      index: "01",
      title: "Entrada 1",
      href: "proyectos/blog/entrada-1.html"
    }
  ];

  function rootPrefix() {
    const path = window.location.pathname;
    const marker = "/proyectos/";

    if (!path.includes(marker)) {
      return "";
    }

    return "../../";
  }

  function normalizePath(value) {
    return value.replace(/^\/+/, "").replace(/\/index\.html$/, "/");
  }

  function currentRelativePath() {
    const pathname = decodeURIComponent(window.location.pathname);
    const start = pathname.indexOf("proyectos/");

    if (start === -1) {
      return normalizePath(pathname.split("/").pop() || "");
    }

    return normalizePath(pathname.slice(start));
  }

  function setLink(link, target, fallbackHref, fallbackText) {
    if (!link) {
      return;
    }

    if (target) {
      link.href = rootPrefix() + target.href;
      link.textContent = target.title;
      return;
    }

    link.href = rootPrefix() + fallbackHref;
    link.textContent = fallbackText;
  }

  function updateNav(nav, items, fallbackHref, fallbackText) {
    const current = currentRelativePath();
    const currentIndex = items.findIndex(function (item) {
      return normalizePath(item.href) === current;
    });

    if (currentIndex === -1) {
      return;
    }

    const prev = items[currentIndex - 1];
    const next = items[currentIndex + 1];

    setLink(nav.querySelector("[data-auto-prev]"), prev, fallbackHref, fallbackText);
    setLink(nav.querySelector("[data-auto-next]"), next, fallbackHref, fallbackText);
  }

  document.querySelectorAll("[data-auto-nav]").forEach(function (nav) {
    const type = nav.getAttribute("data-auto-nav");

    if (type === "series") {
      updateNav(nav, series, "galeria.html", "Ver todas las series");
    }

    if (type === "blog") {
      updateNav(nav, entries, "blog.html", "Ver todas las entradas");
    }
  });
})();

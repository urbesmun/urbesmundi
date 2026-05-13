(function () {
  function rootPrefix() {
    return window.location.pathname.includes("/proyectos/") ? "../../" : "";
  }

  function link(path) {
    return rootPrefix() + path;
  }

  function renderHeader(target) {
    target.innerHTML =
      '<header class="site-header">' +
        '<div class="site-mark">' +
          '<a href="' + link("index.html") + '" class="logo-wrap" aria-label="Ir al inicio de Urbes Mundi">' +
            '<img src="' + link("logo.png") + '" alt="Urbes Mundi">' +
          '</a>' +
          '<div>' +
            '<p class="site-title">Urbes Mundi</p>' +
            '<p class="site-note">Ciudades del mundo</p>' +
          '</div>' +
        '</div>' +
        '<nav class="site-nav">' +
          '<a href="' + link("galeria.html") + '">Proyectos</a>' +
          '<a href="' + link("blog.html") + '">Blog</a>' +
          '<a href="' + link("contacto.html") + '">Contacto</a>' +
        '</nav>' +
      '</header>';
  }

  function renderFooter(target) {
    target.innerHTML =
      '<footer class="site-footer">' +
        '<p>© 2026 Urbes Mundi</p>' +
        '<a class="site-footer-link" href="' + link("galeria.html") + '">Explorar sitio</a>' +
      '</footer>';
  }

  document.querySelectorAll("[data-site-header]").forEach(renderHeader);
  document.querySelectorAll("[data-site-footer]").forEach(renderFooter);
})();

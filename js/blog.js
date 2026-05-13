(function () {
  /*
    NUEVA ENTRADA EN blog-posts.json
    Copiar, pegar arriba del todo y cambiar los campos:

    {
      "index": "N",
      "title": "Titulo de la entrada",
      "meta": "Ciudad, Pais · Año",
      "href": "proyectos/blog/YYMMDD/entrada.html",
      "date": "2026-01-01",
      "published": true
    }
  */

  const target = document.getElementById("blog-index");

  if (!target) {
    return;
  }

  function entryNumber(entry) {
    const value = Number.parseInt(String(entry.index).replace(/\D/g, ""), 10);
    return Number.isNaN(value) ? 0 : value;
  }

  function sortNewestFirst(a, b) {
    const dateA = Date.parse(a.date || "");
    const dateB = Date.parse(b.date || "");

    if (!Number.isNaN(dateA) && !Number.isNaN(dateB) && dateA !== dateB) {
      return dateB - dateA;
    }

    return entryNumber(b) - entryNumber(a);
  }

  function createEntry(entry) {
    const article = document.createElement("article");
    article.style.borderTop = "0.5px solid var(--line)";
    article.style.paddingTop = "18px";

    const meta = document.createElement("span");
    meta.className = "project-meta";
    meta.textContent = entry.meta || "Entrada " + entry.index;

    const link = document.createElement("a");
    link.className = "blog-entry-link";
    link.href = entry.href;
    link.textContent = entry.title;
    link.style.display = "inline-block";
    link.style.marginTop = "8px";
    link.style.fontSize = "1rem";
    link.style.letterSpacing = "0.08em";
    link.style.textDecoration = "none";
    link.style.textTransform = "uppercase";

    article.appendChild(meta);
    article.appendChild(link);

    return article;
  }

  function render(entries) {
    const published = entries
      .filter(function (entry) {
        return entry.published;
      })
      .sort(sortNewestFirst);

    target.innerHTML = "";

    if (!published.length) {
      const empty = document.createElement("p");
      empty.className = "project-description";
      empty.textContent = "Entradas en preparacion.";
      target.appendChild(empty);
      return;
    }

    published.forEach(function (entry) {
      target.appendChild(createEntry(entry));
    });
  }

  fetch("blog-posts.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("No se pudo cargar blog-posts.json");
      }

      return response.json();
    })
    .then(render)
    .catch(function () {
      target.innerHTML = "";
      const error = document.createElement("p");
      error.className = "project-description";
      error.textContent = "No se pudo cargar el indice de entradas.";
      target.appendChild(error);
    });
})();

(function () {
  /*
    NUEVA SERIE
    Copiar, pegar dentro de const series y cambiar los campos:

    {
      index: "NN",
      title: "Titulo de la serie",
      type: "Serie",
      href: "proyectos/N-serie/N-serie.html",
      cover: "proyectos/N-serie/portada.jpg",
      published: true
    },

    Orden cronologico: la serie mas antigua arriba y la mas nueva abajo.
    El render de index y galeria invierte el orden para mostrar lo mas nuevo primero.
  */

  const series = [
  {
      index: "03",
      title: "Bajo tierra",
      type: "Serie",
      href: "proyectos/3-bajo-tierra/3-bajo-tierra.html",
      cover: "proyectos/3-bajo-tierra/portada.jpg",
      published: true
    },
    {
      index: "02",
      title: "Bilbao en B&N",
      type: "Serie",
      href: "proyectos/2-bilbaoBN/2-bilbaoBN.html",
      cover: "proyectos/2-bilbaoBN/portada.jpg",
      published: true
    },
    {
      index: "01",
      title: "Estocolmo en invierno",
      type: "Serie",
      href: "proyectos/1-estocolmo/1-estocolmo.html",
      cover: "proyectos/1-estocolmo/portada.jpg",
      published: true
    },

  ];

  const homeLayouts = ["large", "medium", "tall", "wide", "small", "small", "small", "small", "small"];
  const galleryLayouts = ["primary", "secondary", "secondary", "primary", "tertiary", "square", "square", "square", "square", "square", "square", "square", "square", "square", "square", "square"];

  function newestFirst() {
    return series
      .filter(function (item) {
        return item.published;
      })
      .slice()
      .reverse();
  }

  function createCard(item, baseClass, layoutClass, nameClass, kickerClass, indexClass) {
    const card = document.createElement("a");
    card.className = baseClass + " " + layoutClass;
    card.href = item.href;

    const image = document.createElement("img");
    image.src = item.cover;
    image.alt = item.title;

    const info = document.createElement("div");
    info.className = baseClass === "project-card" ? "project-info" : "archive-info";

    const text = document.createElement("div");
    text.className = baseClass === "project-card" ? "project-text" : "archive-text";

    const kicker = document.createElement("span");
    kicker.className = kickerClass;
    kicker.textContent = item.type;

    const name = document.createElement("span");
    name.className = nameClass;
    name.textContent = item.title;

    const index = document.createElement("span");
    index.className = indexClass;
    index.textContent = item.index;

    text.appendChild(kicker);
    text.appendChild(name);
    info.appendChild(text);
    info.appendChild(index);
    card.appendChild(image);
    card.appendChild(info);

    return card;
  }

  function renderHome(target) {
    newestFirst().slice(0, 9).forEach(function (item, index) {
      target.appendChild(createCard(
        item,
        "project-card",
        homeLayouts[index] || "small",
        "project-name",
        "project-kicker",
        "project-index"
      ));
    });
  }

  function renderGallery(target) {
    newestFirst().forEach(function (item, index) {
      target.appendChild(createCard(
        item,
        "archive-card",
        galleryLayouts[index] || "square",
        "archive-name",
        "archive-kicker",
        "archive-index"
      ));
    });
  }

  const homeTarget = document.getElementById("series-home");
  const galleryTarget = document.getElementById("series-gallery");

  if (homeTarget) {
    renderHome(homeTarget);
  }

  if (galleryTarget) {
    renderGallery(galleryTarget);
  }
})();

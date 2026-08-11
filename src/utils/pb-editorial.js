const CATEGORIES = [
  "Lo más reciente", "Cultura e identidad", "Historia y memoria",
  "Sabor boricua", "Boricuas por el mundo", "Guías útiles",
  "Manos boricuas", "De pueblo en pueblo"
];

function plain(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function categorySlug(value = "") {
  return plain(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function editorialCategory(title = "", labels = []) {
  const text = plain([title, ...labels].join(" "));
  if (/lo mas reciente|ultima hora/.test(text)) return "Lo más reciente";
  if (/artesan|hecho a mano/.test(text)) return "Manos boricuas";
  if (/receta|mofongo|pastel|almojabana|pina colada|gastronomi|comida|cocina|sabor/.test(text)) return "Sabor boricua";
  if (/historia|memoria|grito de lares|patria|herencia/.test(text)) return "Historia y memoria";
  if (/diaspora|boricuas? por el mundo|nueva york|fuera de puerto rico|lejos de la isla/.test(text)) return "Boricuas por el mundo";
  if (/guia|mudanza|licencia|credito|vehiculo|carro|tramite|consejo|recurso/.test(text)) return "Guías útiles";
  if (/pueblo|municipio|barrio/.test(text)) return "De pueblo en pueblo";
  return "Cultura e identidad";
}

module.exports = { CATEGORIES, categorySlug, editorialCategory };

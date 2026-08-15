const CATEGORIES = [
  "Lo más reciente", "Cultura e identidad", "Historia y memoria",
  "Sabor boricua", "Boricuas por el mundo", "Guías útiles",
  "Música y arte", "Manos boricuas", "De pueblo en pueblo"
];

function plain(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function categorySlug(value = "") {
  return plain(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function editorialCategory(title = "", labels = []) {
  const headline = plain(title);
  const labelText = plain(labels.join(" "));
  if (/lo mas reciente|ultima hora/.test(labelText)) return "Lo más reciente";

  // El título manda. Las etiquetas antiguas de Blogger pueden estar repetidas
  // o mal aplicadas y no deben arrastrar todos los artículos a una categoría.
  if (/artesan|hecho a mano/.test(headline)) return "Manos boricuas";
  if (/receta|mofongo|pastel|almojabana|pina colada|gastronomi|comida|cocina|sabor|caldero|platos boricuas/.test(headline)) return "Sabor boricua";
  if (/historia|memoria|grito de lares|patria|herencia|23 de septiembre|lares:/.test(headline)) return "Historia y memoria";
  if (/diaspora|boricuas? por el mundo|nueva york|fuera de puerto rico|lejos de la isla|carry-on|destinos favoritos/.test(headline)) return "Boricuas por el mundo";
  if (/guia|mudanza|licencia|credito|vehiculo|carro|tramite|consejo|recurso|sistema de salud/.test(headline)) return "Guías útiles";
  if (/musica|cancion|cantante|bad bunny|arte|artista|literatura|cine|poesia/.test(headline)) return "Música y arte";
  if (/pueblo|municipio|barrio/.test(headline)) return "De pueblo en pueblo";
  return "Cultura e identidad";
}

module.exports = { CATEGORIES, categorySlug, editorialCategory };

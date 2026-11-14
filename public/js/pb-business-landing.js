'use strict';

const previews = {
  comida: 'Hola, me interesa un mofongo con pollo y unos tostones para recoger. ¿A qué hora estaría listo?',
  tienda: 'Hola, ¿todavía tienes la vela de coco? ¿Cómo puedo recogerla?',
  servicios: 'Hola, quisiera una cotización para revisar mi carro a domicilio. Estoy en Hatillo. ¿Tienes disponibilidad?'
};

for (const button of document.querySelectorAll('[data-preview]')) {
  button.addEventListener('click', () => {
    const message = document.getElementById(button.getAttribute('aria-controls'));
    const show = message.hidden;
    message.hidden = !show;
    button.setAttribute('aria-expanded', String(show));
    if (show) message.textContent = previews[button.dataset.preview];
  });
}

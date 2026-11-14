'use strict';

const english = document.documentElement.lang === 'en';
const previews = english ? {
  comida: 'Hi, I’d like a mofongo with chicken and some tostones for pickup. When would it be ready?',
  tienda: 'Hi, is the coconut candle still in stock? How can I pick it up?',
  servicios: 'Hi, could I get a quote for a mobile diagnostic visit? I’m in Hatillo. Do you have availability?'
} : {
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

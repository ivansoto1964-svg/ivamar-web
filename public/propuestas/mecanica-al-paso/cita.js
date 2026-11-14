'use strict';

const form = document.querySelector('[data-service-appointment]');
const review = form.querySelector('button[type="submit"]');
const confirmation = form.querySelector('[data-appointment-confirmation]');
const summary = form.querySelector('[data-appointment-address]');
const message = form.querySelector('[data-appointment-message]');
const value = name => form.elements.namedItem(name).value.trim();
let route;

function resetConfirmation() {
  confirmation.hidden = true;
  message.hidden = true;
}

form.addEventListener('input', event => {
  event.target.setCustomValidity('');
  resetConfirmation();
});

form.querySelector('[data-appointment-edit]').addEventListener('click', () => {
  resetConfirmation();
  form.elements.namedItem('address').focus();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  for (const field of form.querySelectorAll('input[required]')) {
    if (!field.value.trim()) {
      field.setCustomValidity('Completa este campo.');
      field.reportValidity();
      return;
    }
  }
  const address = [value('address'), value('city'), value('region')].join(', ');
  summary.textContent = address + (value('landmark') ? '\nReferencia: ' + value('landmark') : '');
  route = new URL('https://www.google.com/maps/dir/');
  route.search = new URLSearchParams({api:'1',destination:address,travelmode:'driving'});
  confirmation.hidden = false;
  summary.focus();
});

form.querySelector('[data-appointment-example]').addEventListener('click', () => {
  message.textContent = 'Saludos, quisiera pedir una cita a domicilio.\n\nDirección del servicio: ' +
    summary.textContent + '\nRuta en Google Maps: ' + route.href +
    '\n\n¿Cubres esta zona y qué disponibilidad tienes?';
  message.hidden = false;
});

review.disabled = false;

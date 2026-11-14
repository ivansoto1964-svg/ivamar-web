'use strict';

for (const form of document.querySelectorAll('[data-service-appointment]')) {
  const confirmation = form.querySelector('[data-appointment-confirmation]');
  const summary = form.querySelector('[data-appointment-address]');
  const whatsapp = form.querySelector('[data-appointment-whatsapp]');
  const review = form.querySelector('button[type="submit"]');
  const required = [...form.querySelectorAll('input[required]')];

  function clearConfirmation() {
    confirmation.hidden = true;
    whatsapp?.removeAttribute('href');
  }

  form.addEventListener('input', event => {
    event.target.setCustomValidity('');
    clearConfirmation();
  });
  form.querySelector('[data-appointment-edit]').addEventListener('click', () => {
    clearConfirmation();
    form.elements.address.focus();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const input of required) {
      if (!input.value.trim()) {
        input.setCustomValidity('Completa este campo.');
        input.reportValidity();
        return;
      }
    }

    const value = name => form.elements.namedItem(name).value.trim();
    const address = [value('address'), value('city'), value('region')].join(', ');
    const landmark = value('landmark');
    const details = landmark ? address + '\nReferencia: ' + landmark : address;
    summary.textContent = details;
    if (whatsapp) {
      const map = new URL('https://www.google.com/maps/dir/');
      map.search = new URLSearchParams({api:'1', destination:address, travelmode:'driving'});
      const message = 'Saludos, quisiera pedir una cita a domicilio.\n\nDirección del servicio: ' +
        details + '\nRuta en Google Maps: ' + map.href + '\n\n¿Cubres esta zona y qué disponibilidad tienes?';
      const link = new URL('https://wa.me/' + form.dataset.phone);
      link.searchParams.set('text',message);
      whatsapp.href = link.href;
    }
    confirmation.hidden = false;
    summary.focus();
  });
  review.disabled = false;
}

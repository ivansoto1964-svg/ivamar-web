(() => {
  document.querySelectorAll('[data-pb-subscribe]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const emailInput = form.elements.email;
      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('.pb-subscribe-status');
      const email = String(emailInput?.value || '').trim();
      const source = String(form.dataset.source || 'inicio');

      const show = (message, state) => {
        status.textContent = message;
        status.dataset.state = state;
      };

      if (!emailInput?.checkValidity()) {
        emailInput?.reportValidity();
        show('Escribe un correo electrónico válido.', 'error');
        return;
      }

      button.disabled = true;
      show('Guardando tu suscripción…', 'pending');
      try {
        const response = await fetch('/api/newsletter-boricua', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) throw new Error(result.error || 'No se pudo completar la suscripción.');
        form.reset();
        show('¡Wepa! Ya estás suscrito a Planeta Boricua. 🇵🇷', 'success');
      } catch (error) {
        show(error.message || 'No se pudo conectar. Intenta nuevamente.', 'error');
      } finally {
        button.disabled = false;
      }
    });
  });
})();

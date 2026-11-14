(() => {
  const data = document.getElementById('pb-menu-data');
  if (!data) return;
  const {name, whatsapp, items} = JSON.parse(data.textContent);
  const cart = new Map();
  let previousRequest;
  const list = document.getElementById('cart-lines');
  const total = document.getElementById('cart-total');
  const send = document.getElementById('cart-send');
  const payment = document.getElementById('cart-payment');
  const pickup = document.getElementById('cart-pickup');
  const time = document.getElementById('cart-time');
  const timeField = document.getElementById('cart-time-field');
  const needsTime = () => pickup.value === 'hora';
  const money = cents => '$' + (cents / 100).toFixed(2);
  const selected = () => items.filter(item => cart.has(item.id));
  function render() {
    list.replaceChildren();
    let cents = 0;
    for (const item of selected()) {
      const quantity = cart.get(item.id);
      cents += item.cents * quantity;
      const line = document.createElement('li');
      line.textContent = quantity + ' × ' + item.name + ' · ' + money(item.cents * quantity) + ' ';
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Quitar uno';
      remove.setAttribute('aria-label','Quitar uno de '+item.name);
      remove.onclick = () => {
        if (quantity === 1) cart.delete(item.id);
        else cart.set(item.id,quantity - 1);
        render();
      };
      line.append(remove);
      list.append(line);
    }
    total.textContent = cart.size ? 'Subtotal estimado: ' + money(cents) : 'Tu carrito está vacío.';
    timeField.hidden = !needsTime();
    send.disabled = !cart.size || !whatsapp || (needsTime() && !time.value);
  }
  for (const button of document.querySelectorAll('[data-add]:enabled')) {
    button.onclick = () => {
      const id = button.dataset.add;
      cart.set(id,Math.min(99,(cart.get(id) || 0) + 1));
      render();
    };
  }
  pickup.onchange = render;
  time.oninput = render;
  send.onclick = () => {
    if (!whatsapp || !cart.size || (needsTime() && !time.value)) return;
    const lines = selected().map(item => cart.get(item.id) + ' × ' + item.name);
    const [hour,minute] = time.value.split(':').map(Number);
    const pickupText = needsTime() ? (hour % 12 || 12) + ':' + String(minute).padStart(2,'0') + (hour < 12 ? ' a. m.' : ' p. m.') : 'Lo antes posible';
    const details = [...lines,total.textContent,'Método de pago: ' + payment.value,'Recogido solicitado: ' + pickupText].join('\n');
    if (previousRequest?.details !== details) {
      const reference = 'PB-' + Array.from(window.crypto.getRandomValues(new Uint8Array(8)),
        byte=>byte.toString(16).padStart(2,'0')).join('').toUpperCase();
      previousRequest = {details,reference};
    }
    const message = ['Hola, ' + name + '. Quiero hacer este pedido:', 'Referencia: ' + previousRequest.reference,
      details,'Por favor, confirma el total y la hora de recogido.'].join('\n');
    window.location.assign('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message));
  };
  render();
})();

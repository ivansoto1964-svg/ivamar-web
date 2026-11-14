const reportDay = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Puerto_Rico',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

function validDay(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value;
}

const dollars = cents => (cents / 100).toFixed(2);
const today = () => reportDay.format(new Date());
const daySales = (truck,day) => (truck.sales || []).filter(sale=>sale.day === day);

module.exports = function mountSales(app,{panel,page,esc,owner,csrf,update}) {
  const route = panel+'/ventas';

  function report(truck,day,{note = '',error = false,reference = '',amount = ''} = {}) {
    const sales = daySales(truck,day);
    const total = sales.reduce((sum,sale)=>sum+sale.cents,0);
    return page('Ventas de PB',`
      <p><a href="${panel}">Volver al panel</a></p>
      ${note ? `<p class="notice" role="${error ? 'alert' : 'status'}">${esc(note)}</p>` : ''}
      <section class="card">
        <h2>Resumen diario</h2>
        <form method="get">
          <label>Día de venta<input type="date" name="dia" value="${day}" required></label>
          <button>Ver resumen</button>
        </form>
        <p><strong>${sales.length} ventas registradas · $${dollars(total)}</strong></p>
        <a class="action" href="${route}/csv?dia=${day}">Descargar CSV</a>
        ${sales.length ? `<ul>${sales.map(sale=>`<li>${esc(sale.reference)} · $${dollars(sale.cents)}</li>`).join('')}</ul>` : '<p>Este día todavía no tiene ventas registradas.</p>'}
      </section>
      <form class="card" method="post">${csrf(truck)}
        <h2>Registrar una venta cobrada</h2>
        <p>Busca la referencia PB en el pedido que recibiste por WhatsApp y registra el monto que cobraste. Si coordinaste la venta directamente desde tu menú de PB, usa una referencia única de tu recibo.</p>
        <label>Día de venta<input type="date" name="day" value="${day}" required></label>
        <label>Referencia<input name="reference" value="${esc(reference)}" maxlength="40" autocapitalize="characters" required></label>
        <label>Monto cobrado en dólares<input name="amount" inputmode="decimal" value="${esc(amount)}" maxlength="12" placeholder="15.50" required></label>
        <button>Guardar venta</button>
      </form>`,truck.palette);
  }

  app.get(route,owner,(req,res)=>{
    const day = validDay(req.query.dia) ? req.query.dia : today();
    const note = req.query.guardada === '1' ? 'Venta registrada.' : '';
    res.send(report(req.truck,day,{note}));
  });

  app.post(route,owner,(req,res)=>{
    const {day,reference,amount} = req.body;
    const normalized = typeof reference === 'string' ? reference.trim().toUpperCase() : '';
    const normalizedAmount = typeof amount === 'string' ? amount.trim().replace(',','.') : '';
    const parts = /^(\d{1,7})(?:\.(\d{1,2}))?$/.exec(normalizedAmount);
    const cents = parts ? Number(parts[1])*100+Number((parts[2] || '').padEnd(2,'0')) : 0;
    const state = {error:true,reference:normalized.slice(0,40),amount:normalizedAmount.slice(0,12)};
    if (!validDay(day) || !/^[A-Z0-9][A-Z0-9-]{0,39}$/.test(normalized) || cents <= 0) {
      return res.status(400).send(report(req.truck,validDay(day) ? day : today(),{
        ...state,note:'Revisa el día, el monto y la referencia. Usa letras, números o guiones en la referencia.'
      }));
    }
    const result = update(req,truck=>{
      truck.sales ??= [];
      const existing = truck.sales.find(sale=>sale.reference === normalized);
      if (existing) return existing.day === day && existing.cents === cents ? 'saved' : 'duplicate';
      truck.sales.push({day,reference:normalized,cents});
      return 'saved';
    });
    if (result === 'duplicate') {
      return res.status(409).send(report(req.truck,day,{...state,note:'Ya registraste una venta con esa referencia.'}));
    }
    res.redirect(303,route+'?dia='+day+'&guardada=1');
  });

  app.get(route+'/csv',owner,(req,res)=>{
    const day = validDay(req.query.dia) ? req.query.dia : today();
    const sales = daySales(req.truck,day);
    const total = sales.reduce((sum,sale)=>sum+sale.cents,0);
    const rows = [
      'Fecha,Tipo,Referencia,Cantidad,Monto USD',
      [day,'Resumen','',sales.length,dollars(total)].join(','),
      ...sales.map(sale=>[day,'Venta',sale.reference,1,dollars(sale.cents)].join(','))
    ];
    res.attachment('ventas-pb-'+day+'.csv').type('text/csv').send('\uFEFF'+rows.join('\r\n')+'\r\n');
  });
};

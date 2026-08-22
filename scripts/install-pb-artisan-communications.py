from pathlib import Path

server_path = Path('src/server.js')
view_path = Path('src/views/pb-control.js')
server = server_path.read_text()
view = view_path.read_text()

# -----------------------------
# SERVER: helpers + history
# -----------------------------
if "PB_ARTISAN_MAIL_HISTORY_FILE" not in server:
    anchor = "const PB_AFFILIATE_CLICKS_FILE = '/data/pb-affiliate-clicks.json';"
    addition = """const PB_AFFILIATE_CLICKS_FILE = '/data/pb-affiliate-clicks.json';
const PB_ARTISAN_MAIL_HISTORY_FILE = '/data/pb-artisan-mail-history.json';

function pbArtisanRecipients() {
  const seen = new Set();
  return loadApprovedPBListings().map(item => ({
    name:String(item.name || 'Artesano/a').trim(),
    email:String(item.email || '').trim().toLowerCase()
  })).filter(item => {
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(item.email) || seen.has(item.email)) return false;
    seen.add(item.email);
    return true;
  });
}

function pbArtisanMailHistory() {
  return readJsonFile(PB_ARTISAN_MAIL_HISTORY_FILE,[]).sort((a,b) => new Date(b.sentAt || 0)-new Date(a.sentAt || 0)).slice(0,25);
}

function pbArtisanMailHtml(name, message) {
  const escMail = value => String(value || '').replace(/[&<>\"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[char]));
  const safeName = escMail(name || 'Artesano/a');
  const safeMessage = escMail(message).replace(/\\n/g,'<br>');
  return `<div style=\"font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#253247\">
    <div style=\"background:linear-gradient(135deg,#002d62,#ce1126);padding:24px;text-align:center;border-radius:12px 12px 0 0\">
      <div style=\"font-size:30px\">🇵🇷</div><h1 style=\"color:white;font-size:22px;margin:8px 0 0\">Planeta Boricua</h1>
      <p style=\"color:#ffffffcc;margin:5px 0 0\">Feria Digital de Artesanías Puertorriqueñas</p>
    </div>
    <div style=\"background:#fff;border:1px solid #e5e8ee;padding:28px\">
      <p style=\"font-size:16px\">Hola, <strong>${safeName}</strong>:</p>
      <div style=\"font-size:15px;line-height:1.7\">${safeMessage}</div>
      <div style=\"text-align:center;margin:28px 0\"><a href=\"https://www.masboricuaqueunmofongo.com/pb/add-negocio\" style=\"display:inline-block;background:#ce1126;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:700\">Invitar a otro artesano →</a></div>
    </div>
    <div style=\"background:#f5f5f0;padding:16px;text-align:center;border-radius:0 0 12px 12px;color:#777;font-size:12px;line-height:1.5\">Recibes este mensaje porque participas en la Feria Digital de Artesanías Puertorriqueñas de Planeta Boricua.<br>© 2026 Planeta Boricua · Más Boricua que un Mofongo 🇵🇷</div>
  </div>`;
}
"""
    if anchor not in server:
        raise SystemExit('Server affiliate anchor not found')
    server = server.replace(anchor, addition, 1)

# -----------------------------
# SERVER: add communications to PB model
# -----------------------------
if "artisanEmailCount" not in server:
    anchor = "  const affiliates = pbAffiliateSummary();\n  return {csrf,latestPending,latestApproved,commentsPending,commentsApproved,artisansPending,artisansApproved,eventsPending,eventsApproved,subscribers,blogPosts,affiliates,counts:{pendingLatest:latestPending.length,pendingComments:commentsPending.length,pendingArtisans:artisansPending.length,pendingEvents:eventsPending.length,pendingTotal:latestPending.length+commentsPending.length+artisansPending.length+eventsPending.length,blogPosts:blogPosts.length,subscribers:subscribers.length,affiliateClicks:affiliates.reduce((sum,item)=>sum+item.clicks,0)}};"
    replacement = """  const affiliates = pbAffiliateSummary();
  const artisanEmailCount = pbArtisanRecipients().length;
  const artisanMailHistory = pbArtisanMailHistory();
  return {csrf,latestPending,latestApproved,commentsPending,commentsApproved,artisansPending,artisansApproved,eventsPending,eventsApproved,subscribers,blogPosts,affiliates,artisanEmailCount,artisanMailHistory,counts:{pendingLatest:latestPending.length,pendingComments:commentsPending.length,pendingArtisans:artisansPending.length,pendingEvents:eventsPending.length,pendingTotal:latestPending.length+commentsPending.length+artisansPending.length+eventsPending.length,blogPosts:blogPosts.length,subscribers:subscribers.length,affiliateClicks:affiliates.reduce((sum,item)=>sum+item.clicks,0)}};"""
    if anchor not in server:
        raise SystemExit('PB control model anchor not found')
    server = server.replace(anchor, replacement, 1)

# -----------------------------
# SERVER: actions for test + send
# -----------------------------
if "artisan-email-test" not in server:
    anchor = "    if (action.startsWith('event-')) {"
    addition = r'''    if (action === 'artisan-email-test' || action === 'artisan-email-send') {
      const subject = sanitize(req.body.subject || '').replace(/\s+/g,' ').trim();
      const message = sanitize(req.body.message || '').trim();
      if (subject.length < 3 || subject.length > 140) return res.status(400).json({ok:false,error:'El asunto debe tener entre 3 y 140 caracteres.'});
      if (message.length < 10 || message.length > 6000) return res.status(400).json({ok:false,error:'El mensaje debe tener entre 10 y 6,000 caracteres.'});
      if (!process.env.RESEND_API_KEY) return res.status(503).json({ok:false,error:'Resend no está configurado en Render.'});
      if (action === 'artisan-email-test') {
        await resend.emails.send({from:`Planeta Boricua <${PB_SENDER_EMAIL}>`,to:PB_CONTACT_EMAIL,subject:`[PRUEBA] ${subject}`,html:pbArtisanMailHtml('Prueba PB',message)});
        return ok(`Email de prueba enviado a ${PB_CONTACT_EMAIL}.`);
      }
      const recipients = pbArtisanRecipients();
      if (!recipients.length) return res.status(400).json({ok:false,error:'No encontré emails válidos de artesanos aprobados.'});
      const payloads = recipients.map(person => ({from:`Planeta Boricua <${PB_SENDER_EMAIL}>`,to:person.email,subject,html:pbArtisanMailHtml(person.name,message)}));
      for (let i=0;i<payloads.length;i+=100) {
        const batch = payloads.slice(i,i+100);
        if (resend.batch && typeof resend.batch.send === 'function') {
          const result = await resend.batch.send(batch);
          if (result?.error) throw new Error(result.error.message || 'Resend rechazó un lote de emails.');
        } else {
          for (const email of batch) await resend.emails.send(email);
        }
      }
      const history = readJsonFile(PB_ARTISAN_MAIL_HISTORY_FILE,[]);
      history.push({id:`${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,subject,messagePreview:message.slice(0,180),recipientCount:recipients.length,sentAt:new Date().toISOString()});
      writeJsonFile(PB_ARTISAN_MAIL_HISTORY_FILE,history.slice(-100));
      return ok(`Comunicado enviado a ${recipients.length} artesanos.`);
    }
'''
    if anchor not in server:
        raise SystemExit('PB action anchor not found')
    server = server.replace(anchor, addition + anchor, 1)

# -----------------------------
# VIEW: communications history renderer
# -----------------------------
if "function communicationRows" not in view:
    anchor = "function affiliateRows(items) {"
    addition = """function communicationRows(items) {
  if (!items.length) return empty('Todavía no se han enviado comunicados desde PB Control.');
  return items.map(item => `<article class=\"item compact\"><div><span class=\"eyebrow\">${shortDate(item.sentAt)} · ${esc(item.recipientCount || 0)} destinatarios</span><h3>${esc(item.subject || '')}</h3><p>${esc(item.messagePreview || '')}</p></div></article>`).join('');
}

"""
    if anchor not in view:
        raise SystemExit('View function anchor not found')
    view = view.replace(anchor, addition + anchor, 1)

# -----------------------------
# VIEW: communications tab
# -----------------------------
if 'data-tab="comunicaciones"' not in view:
    anchor = '<button class="tab" data-tab="artesanos">Artesanos</button><button class="tab" data-tab="eventos">Eventos</button>'
    replacement = '<button class="tab" data-tab="artesanos">Artesanos</button><button class="tab" data-tab="comunicaciones">Comunicaciones</button><button class="tab" data-tab="eventos">Eventos</button>'
    if anchor not in view:
        raise SystemExit('View tabs anchor not found')
    view = view.replace(anchor, replacement, 1)

# -----------------------------
# VIEW: communications panel
# -----------------------------
if 'id="comunicaciones"' not in view:
    anchor = '  <section class="panel" id="eventos"><div class="section"><h2>Pendientes</h2>${eventRows(model.eventsPending || [],true)}</div><div class="section"><h2>En la Agenda</h2>${eventRows(model.eventsApproved || [],false)}</div></section>'
    panel = '''  <section class="panel" id="comunicaciones"><div class="section"><div class="sectionhead"><div><h2>📣 Comunicaciones a Artesanos</h2><p class="sectionnote">${model.artisanEmailCount || 0} emails únicos entre los artesanos aprobados. Cada mensaje se envía individualmente.</p></div></div><p class="editor-note"><strong>Seguro:</strong> primero envía una prueba. El botón de envío general pedirá confirmación antes de escribirle a todos.</p><form id="artisanMailForm" class="formgrid"><div class="field full"><label>Asunto</label><input name="subject" maxlength="140" value="🇵🇷 Gracias por ser parte de nuestra Feria Digital" required></div><div class="field full"><label>Mensaje</label><textarea class="editor" name="message" maxlength="6000" required>¡Gracias por ser parte de la Feria Digital de Artesanías Puertorriqueñas!\n\nCuando comenzamos esta idea en Planeta Boricua, queríamos crear un espacio donde nuestros artesanos pudieran mostrar su trabajo, darse a conocer y conectar con Puerto Rico y con nuestra diáspora.\n\nLa respuesta ha sido increíble. Ya somos más de 100 artesanos inscritos, y seguimos creciendo.\n\nQuiero agradecerte personalmente por confiar en este proyecto y formar parte de él desde el comienzo. ❤️\n\nAhora quiero pedirte una pequeña ayuda: comparte la invitación con otros artesanos que conozcas. Puede ser un familiar, un amigo, alguien de tu pueblo o ese artesano que siempre ves en las ferias.\n\nLa inscripción continúa siendo completamente GRATIS y todavía están a tiempo para formar parte del lanzamiento oficial el 23 de septiembre, Día del Grito de Lares.\n\nRegistro: https://www.masboricuaqueunmofongo.com/pb/add-negocio\n\nQueremos reunir el talento de nuestras manos boricuas, tanto en Puerto Rico como en la diáspora.\n\nGracias por ayudarnos a llevar esta Feria todavía más lejos.\n\nPlaneta Boricua 🇵🇷\nMás Boricua que un Mofongo\nManos boricuas, arte que cuenta nuestra historia.</textarea></div><div class="field full"><div class="tools"><button class="action" id="artisanMailTest" type="button">Enviar prueba</button><button class="primary" id="artisanMailSend" type="button">Enviar a ${model.artisanEmailCount || 0} artesanos</button></div><p class="muted">La prueba llega solamente al correo administrativo de PB. El envío general no expone las direcciones de otros artesanos.</p></div></form></div><div class="section"><h2>Historial de comunicaciones</h2><p class="sectionnote">Últimos envíos realizados desde este Centro de Control.</p>${communicationRows(model.artisanMailHistory || [])}</div></section>'''
    if anchor not in view:
        raise SystemExit('View panel anchor not found')
    view = view.replace(anchor, panel + '\n' + anchor, 1)

# -----------------------------
# VIEW: browser behavior
# -----------------------------
if "artisanMailTest" not in view.split('<script>')[-1]:
    anchor = "if(!blogForm.elements.dateISO.value)blogForm.elements.dateISO.value=new Date().toISOString().slice(0,10);"
    script = r'''if(!blogForm.elements.dateISO.value)blogForm.elements.dateISO.value=new Date().toISOString().slice(0,10);const artisanMailForm=document.getElementById('artisanMailForm'),artisanMailTest=document.getElementById('artisanMailTest'),artisanMailSend=document.getElementById('artisanMailSend');async function sendArtisanMail(mode){const data=Object.fromEntries(new FormData(artisanMailForm));const isTest=mode==='test';if(!isTest&&!confirm(`Vas a enviar este comunicado a ${model_count} artesanos. ¿Deseas continuar?`))return;const button=isTest?artisanMailTest:artisanMailSend;button.disabled=true;try{show(isTest?'Enviando prueba…':'Enviando comunicado…');const d=await apiAction(isTest?'artisan-email-test':'artisan-email-send','mail',data);show(d.message||'Enviado.');if(!isTest)setTimeout(()=>location.reload(),900)}catch(err){show(err.message,true)}finally{button.disabled=false}}artisanMailTest.onclick=()=>sendArtisanMail('test');artisanMailSend.onclick=()=>sendArtisanMail('send');'''
    script = script.replace('${model_count}', "${model.artisanEmailCount || 0}")
    if anchor not in view:
        raise SystemExit('View script anchor not found')
    view = view.replace(anchor, script, 1)

server_path.write_text(server)
view_path.write_text(view)
print('PB artisan communications installer applied.')

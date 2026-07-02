const fs = require('fs');
const path = require('path');

// 1. Copy the view file
fs.copyFileSync(
  path.join(__dirname, 'autoridad-energia-criolla.js'),
  path.join('src', 'views', 'autoridad-energia-criolla.js')
);
console.log('✅ Vista autoridad-energia-criolla.js copiada');

// 2. Add require and routes to server.js
let code = fs.readFileSync('src/server.js', 'utf8');

// Add require
const requireMarker = `const { getPlacePhoto } = require("./helpers/googlePhotos");`;
const requireAddition = `const { getPlacePhoto } = require("./helpers/googlePhotos");
const aecDemo = require("./views/autoridad-energia-criolla");`;

if (code.includes(requireMarker) && !code.includes('aecDemo')) {
  code = code.replace(requireMarker, requireAddition);
  console.log('✅ Require de aecDemo agregado');
}

// Add routes before app.listen
const routeMarker = `// ==========================================
// PLANETA BORICUA — DIRECTORIO DE NEGOCIOS
// ==========================================`;

const newRoutes = `// ==========================================
// AUTORIDAD ENERGÍA CRIOLLA — DEMO
// ==========================================

app.get("/autoridad-energia-criolla", (req, res) => res.send(aecDemo));

app.post("/api/aec-chat", aiLimiter, express.json(), async (req, res) => {
  const { message, history = [] } = req.body;
  const system = \`Eres IvA, el asistente virtual de Autoridad de Energía Criolla, una empresa de paneles solares en Puerto Rico fundada por Reinaldo Ortiz García. Eres amable, profesional y conoces muy bien el mercado solar de Puerto Rico.

SOBRE LA EMPRESA:
- Nombre: Autoridad de Energía Criolla
- Fundador/Presidente: Reinaldo Ortiz García — instalador y asesor con años de experiencia
- Servicios: instalación de sistemas solares residenciales y comerciales, reparación, mantenimiento, baterías e inversores
- Teléfono: (939) 865-1483
- Email: autoridadenergiacriolla@gmail.com
- Filosofía: servicio honesto, educación al cliente, soluciones accesibles

INFORMACIÓN TÉCNICA Y DE INCENTIVOS QUE CONOCES:
- Crédito Federal ITC: 30% del costo del sistema como crédito en impuestos federales (disponible hasta 2032)
- Ley 399 de PR: exención total de impuesto sobre la propiedad para sistemas de energía renovable
- Net Metering con LUMA: venta del exceso de energía de vuelta a la red, créditos en la factura
- Financiamiento disponible desde $0 de inicial
- Retorno de inversión típico: 5-7 años
- Ahorro mensual promedio: $100-200 dependiendo del sistema y consumo
- Garantía de paneles: 25 años típicamente
- Garantía de inversores: 10-12 años típicamente
- Un sistema residencial típico cuesta entre $15,000-$30,000 antes de incentivos
- Después del crédito del 30%, el costo real baja significativamente

CÓMO RESPONDER:
- Responde en español
- Máximo 3-4 oraciones por respuesta
- Si preguntan por cotización específica, pide el consumo mensual de luz (kWh o monto en $) para dar una estimación más precisa
- Siempre termina ofreciendo conectar con Reinaldo via WhatsApp: (939) 865-1483
- Si preguntan algo que no sabes, di "Para darte información más precisa sobre eso, te recomiendo hablar directamente con Reinaldo al (939) 865-1483"\`;

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system,
      messages
    });
    res.json({ reply: response.content[0].text });
  } catch(err) {
    console.error('AEC chat error:', err.message);
    res.json({ reply: 'Hubo un error técnico. Llama directamente a Reinaldo al (939) 865-1483.' });
  }
});

// ==========================================
// PLANETA BORICUA — DIRECTORIO DE NEGOCIOS
// ==========================================`;

if (code.includes(routeMarker)) {
  code = code.replace(routeMarker, newRoutes);
  console.log('✅ Rutas de AEC demo agregadas al server.js');
} else {
  console.log('❌ No encontré el marcador de rutas');
}

fs.writeFileSync('src/server.js', code);
console.log('\n🎉 Demo de Autoridad Energía Criolla instalado');

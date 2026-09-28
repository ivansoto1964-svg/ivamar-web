const assert = require('assert');
const fs = require('fs');
const welcome = require('../src/services/pb-subscriber-welcome');

const secret = 'controlled-test-secret';
const email = 'persona@example.com';

assert.strictEqual(welcome.normalizeSubscriberEmail('  PERSONA@Example.COM '), email, 'Debe normalizar el email.');
assert(welcome.isValidSubscriberEmail(email), 'Debe aceptar un email válido.');
assert(!welcome.isValidSubscriberEmail('correo-invalido'), 'Debe rechazar un email inválido.');

const token = welcome.createUnsubscribeToken(email, secret);
assert.strictEqual(welcome.verifyUnsubscribeToken(token, secret), email, 'El token firmado debe recuperar el email.');
assert.strictEqual(welcome.verifyUnsubscribeToken(token + 'x', secret), '', 'Un token alterado debe ser rechazado.');

const message = welcome.welcomeEmail({email,from:'Planeta Boricua <notificaciones@example.com>',secret});
assert.strictEqual(message.subject, '🇵🇷 ¡Wepa! Bienvenido a Planeta Boricua', 'Debe usar el asunto aprobado.');
assert(message.html.includes('El corazón boricua cabe en una carry-on.'), 'Debe contener el mensaje aprobado.');
assert(message.html.includes('Iván Soto Pino'), 'Debe incluir la firma aprobada.');
assert(message.html.includes('Darse de baja'), 'Debe incluir una baja visible.');
assert(message.headers['List-Unsubscribe'].includes('/suscripcion/salir/'), 'Debe incluir el encabezado estándar de baja.');
assert.strictEqual(message.headers['List-Unsubscribe-Post'], 'List-Unsubscribe=One-Click', 'Debe permitir la baja de un clic.');

const subscribers = [{email:'existente@example.com',subscribedAt:'2026-09-01T00:00:00.000Z'}];
assert(welcome.findSubscriber(subscribers,' EXISTENTE@example.com '), 'Debe detectar duplicados sin distinguir mayúsculas.');
assert.strictEqual(welcome.findSubscriber(subscribers,email), null, 'Debe reconocer una dirección realmente nueva.');
const record = welcome.createSubscriberRecord(email,'inicio',new Date('2026-09-28T12:00:00.000Z'));
assert.deepStrictEqual(record, {
  email,
  source:'inicio',
  subscribedAt:'2026-09-28T12:00:00.000Z',
  status:'active',
  welcomeStatus:'sending',
  welcomeAttemptedAt:'2026-09-28T12:00:00.000Z'
}, 'Una alta nueva debe registrar el intento antes de enviar.');

const server = fs.readFileSync(require.resolve('../src/server'), 'utf8');
const stories = fs.readFileSync(require.resolve('../src/routes/pb-stories'), 'utf8');
const duplicateCheck = server.indexOf('if (pbSubscriberWelcome.findSubscriber(subscribers, email))');
const createRecord = server.indexOf('pbSubscriberWelcome.createSubscriberRecord(email, savedSource)');
const sendWelcome = server.indexOf('resend.emails.send(pbSubscriberWelcome.welcomeEmail');
assert(duplicateCheck >= 0 && duplicateCheck < createRecord && createRecord < sendWelcome, 'El duplicado debe salir antes de crear o enviar otra bienvenida.');
assert(server.includes("subscriber.welcomeStatus = 'sent'"), 'Debe registrar la bienvenida confirmada.');
assert(server.includes("subscriber.welcomeStatus = 'failed'"), 'Debe registrar un fallo sin perder al suscriptor.');
assert(server.includes("app.post('/suscripcion/salir/:token'"), 'Debe existir una ruta de baja funcional.');
assert(stories.includes('pbSubscriberWelcome.findSubscriber(list,email)'), 'La suscripción opcional de Historias debe usar el mismo control de duplicados.');
assert(stories.includes('pbSubscriberWelcome.welcomeEmail'), 'La suscripción opcional de Historias también debe enviar la bienvenida.');

console.log('PB subscriber welcome tests passed.');

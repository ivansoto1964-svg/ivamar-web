const assert = require('assert');
const fs = require('fs');
const path = require('path');
const batches = require('../src/services/pb-artisan-mail-batches');

const recipients = Array.from({length:225},(_,index) => ({name:`Artesano ${index+1}`,email:`persona${index+1}@example.com`}));
let deliveries = [];
const subject = 'Revisa tu perfil';
const message = 'Actualiza tus datos antes del lanzamiento.';

const first = batches.nextBatch(recipients,deliveries,subject,message);
assert.equal(first.batch.length,50);
assert.equal(first.remainingBefore,225);

deliveries = batches.recordDeliveries(deliveries,first.campaignId,first.batch,'2026-09-01T12:00:00.000Z');
deliveries = batches.recordDeliveries(deliveries,first.campaignId,first.batch,'2026-09-01T12:01:00.000Z');
assert.equal(deliveries.length,50,'recording the same accepted batch must be idempotent');

const second = batches.nextBatch(recipients,deliveries,subject,message);
assert.equal(second.batch.length,50);
assert.equal(second.remainingBefore,175);
assert.equal(new Set([...first.batch,...second.batch].map(item=>item.email)).size,100);

const differentMessage = batches.nextBatch(recipients,deliveries,subject,message+' Cambio');
assert.equal(differentMessage.batch[0].email,recipients[0].email,'a different message starts a separate campaign');

const server = fs.readFileSync(path.join(__dirname,'..','src/server.js'),'utf8');
const view = fs.readFileSync(path.join(__dirname,'..','src/views/pb-control.js'),'utf8');
assert.match(server,/PB_ARTISAN_MAIL_DELIVERIES_FILE/);
assert.match(server,/Lote enviado a \$\{delivered\.length\} artesanos/);
assert.match(server,/Actualizar mi perfil/);
assert.match(view,/Enviar próximo lote \(máx\. 50\)/);
assert.match(view,/un máximo de 50 artesanos pendientes/);

console.log('PB artisan email batch tests passed');

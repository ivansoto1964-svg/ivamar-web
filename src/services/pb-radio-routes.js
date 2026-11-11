const { randomUUID } = require('node:crypto');
const { Router } = require('express');
const { createRadioStore, getSchedule, validateSlot, httpsUrl } = require('./pb-radio');
const { publicRadio, radioControl } = require('../views/planetaboricua/radio');

function createRadioRouter({ requireAdmin, requireAdminCsrf, file = process.env.PB_RADIO_FILE || '/data/pb-radio/schedule.json' }) {
  const router = Router();
  const store = createRadioStore(file);

  router.get('/radio', (_req, res) => res.send(publicRadio()));
  router.get('/api/pb-radio', (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json(getSchedule(store.read()));
  });

  router.get('/pb-control/radio', requireAdmin, (req, res) => {
    const config = store.read();
    const slot = req.query.editar ? config.slots.find(item => item.id === req.query.editar) : null;
    if (req.query.editar && !slot) return res.status(404).send('Programa no encontrado.');
    res.send(radioControl(config, req.pbAdminSession.csrf, { slot, saved: req.query.guardado === '1' }));
  });

  router.post('/pb-control/radio', requireAdmin, requireAdminCsrf, (req, res) => {
    const body = req.body || {};
    let slot;
    try {
      store.update(body.revision, config => {
        if (body.action === 'fallback') return { ...config, fallback: httpsUrl(String(body.fallback || '').trim()) };
        if (body.action !== 'save') throw new Error('Acción inválida.');
        const id = String(body.id || '');
        if (id && !config.slots.some(item => item.id === id)) throw new Error('Programa no encontrado.');
        if (!id && config.slots.length >= 100) throw new Error('La parrilla admite hasta 100 programas.');
        slot = validateSlot(body, id || randomUUID());
        const slots = id ? config.slots.map(item => item.id === id ? slot : item) : [...config.slots, slot];
        return { ...config, slots };
      });
      res.redirect(303, '/pb-control/radio?guardado=1');
    } catch (error) {
      if (error.code) throw error;
      const config = store.read();
      const attempted = body.action === 'save' ? { ...body, enabled: body.enabled === 'yes' } : null;
      res.status(400).send(radioControl(config, req.pbAdminSession.csrf, { slot: slot || attempted, error: error.message }));
    }
  });
  return router;
}

module.exports = { createRadioRouter };

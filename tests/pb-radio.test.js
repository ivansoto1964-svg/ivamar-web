const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { createRadioStore, getSchedule, validateSchedule, validateSlot } = require('../src/services/pb-radio');
const { publicRadio, radioControl } = require('../src/views/planetaboricua/radio');

function program(overrides = {}) {
  const data = {
    title: 'Programa', station: 'Emisora', day: '2', start: '10:00', end: '11:00',
    stream: 'https://example.com/live.mp3', enabled: 'yes', ...overrides,
  };
  return validateSlot(data, data.title);
}

test('starts and stops a block on the Puerto Rico clock', () => {
  const config = { slots: [program()], fallback: '' };
  const check = value => getSchedule(config, new Date(value));
  const before = check('2026-11-17T13:59:50.000Z');
  assert.equal(before.current, null);
  assert.equal(before.next.title, 'Programa');
  assert.equal(before.refreshMs, 10000);
  assert.equal(check('2026-11-17T14:00:00.000Z').current.title, 'Programa');
  assert.equal(check('2026-11-17T15:00:00.000Z').current, null);
  assert.equal(check('2026-07-14T14:00:00.000Z').current.title, 'Programa');
});

test('handles overnight programs and overlapping slots across the end of the week', () => {
  const overnight = program({ day: '6', start: '23:30', end: '00:30' });
  const sunday = program({ title: 'Domingo', day: '0', start: '00:00', end: '01:00' });
  assert.throws(() => validateSchedule([overnight, sunday]), /Se cruzan/);
  const schedule = getSchedule({ slots: [overnight], fallback: '' }, new Date('2026-11-15T04:00:00Z'));
  assert.equal(schedule.current.title, 'Programa');
  assert.equal(schedule.refreshMs, 30 * 60000);
});

test('drafts stay private and settings persist without stale edits overwriting them', t => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-radio-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const store = createRadioStore(path.join(directory, 'radio.json'));
  const original = store.read();
  assert.equal(original.slots.length, 4);
  assert.deepEqual(getSchedule(original).programs, []);
  assert.match(radioControl(original, 'test-token'), /Dialogando con Manolo/);
  assert.doesNotMatch(publicRadio(), /Dialogando con Manolo/);
  store.update(original.revision, config => ({ ...config, slots: [program()] }));
  assert.equal(store.read().slots[0].title, 'Programa');
  assert.throws(() => store.update(original.revision, () => original), /La parrilla cambió/);
  assert.throws(() => program({ stream: 'javascript:alert(1)' }), /HTTPS/);
  assert.throws(() => program({ stream: '' }), /enlace/);
  assert.equal(program({ stream: '', link: 'https://example.com/radio' }).link, 'https://example.com/radio');
});

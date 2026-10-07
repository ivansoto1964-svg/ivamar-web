const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = process.env.PB_EXTERNAL_METRICS_FILE || '/data/pb-external-metrics.json';

function text(value, max = 300) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function whole(value, label) {
  if (value === '' || value == null) return 0;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > 1000000000) throw new Error(`${label} debe ser un número entero mayor o igual a cero.`);
  return number;
}

function money(value, label) {
  if (value === '' || value == null) return 0;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || number > 10000000) throw new Error(`${label} debe ser una cantidad válida mayor o igual a cero.`);
  return Number(number.toFixed(2));
}

function validate(input) {
  const month = text(input.month, 7);
  if (!/^\d{4}-(?:0[1-9]|1[0-2])$/.test(month)) throw new Error('Selecciona un mes válido.');
  return {
    month,
    ga4Users:whole(input.ga4Users, 'Los usuarios de GA4'),
    ga4Sessions:whole(input.ga4Sessions, 'Las sesiones de GA4'),
    ga4Views:whole(input.ga4Views, 'Las vistas de GA4'),
    searchClicks:whole(input.searchClicks, 'Los clics de Search Console'),
    searchImpressions:whole(input.searchImpressions, 'Las impresiones de Search Console'),
    affiliateRevenue:money(input.affiliateRevenue, 'El ingreso afiliado confirmado'),
    affiliateNotes:text(input.affiliateNotes, 300),
    sourceNotes:text(input.sourceNotes, 300),
    updatedAt:new Date().toISOString()
  };
}

function createExternalMetrics(options = {}) {
  const file = options.file || DEFAULT_FILE;
  function read() {
    try {
      const value = JSON.parse(fs.readFileSync(file, 'utf8'));
      return Array.isArray(value) ? value : [];
    } catch (_) { return []; }
  }
  function write(items) {
    fs.mkdirSync(path.dirname(file), { recursive:true });
    const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(temp, JSON.stringify(items, null, 2));
    fs.renameSync(temp, file);
  }
  function list() { return read().sort((a,b) => String(b.month).localeCompare(String(a.month))); }
  function save(input) {
    const row = validate(input);
    const items = read();
    const index = items.findIndex(item => item.month === row.month);
    if (index >= 0) items[index] = row; else items.push(row);
    write(items);
    return row;
  }
  function summary() {
    return list().reduce((result,row) => {
      result.months += 1;
      result.affiliateRevenue = Number((result.affiliateRevenue + (Number(row.affiliateRevenue) || 0)).toFixed(2));
      return result;
    }, {months:0,affiliateRevenue:0});
  }
  function csv() {
    const safe = value => {
      let cell = String(value ?? '');
      if (/^[=+\-@]/.test(cell)) cell = `'${cell}`;
      return `"${cell.replace(/"/g, '""')}"`;
    };
    const header = ['mes','ga4_usuarios','ga4_sesiones','ga4_vistas','search_console_clics','search_console_impresiones','ingreso_afiliado_confirmado_usd','detalle_ingreso','notas_fuentes'];
    return [header,...list().map(row => [row.month,row.ga4Users,row.ga4Sessions,row.ga4Views,row.searchClicks,row.searchImpressions,row.affiliateRevenue,row.affiliateNotes,row.sourceNotes])]
      .map(row => row.map(safe).join(',')).join('\n') + '\n';
  }
  return {list,save,summary,csv};
}

module.exports = {DEFAULT_FILE,createExternalMetrics,validate};

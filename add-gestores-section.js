const fs = require('fs');
let code = fs.readFileSync('src/views/regresar-a-pr.js', 'utf8');

// 1. Insertar info-box de gestores en la sección de VEHÍCULOS (antes del cierre, después de arbitrios)
const vehiculoMarker = `          <div class="info-box-text">Usa el VIN de tu vehículo para estimar el monto de arbitrios en SURI de Hacienda PR. Así sabes cuánto vas a pagar antes de enviar el carro desde USA.<br><br>
            <a href="https://suri.hacienda.pr.gov" target="_blank" style="color:#002D62;font-weight:700;">Estimar arbitrios en SURI → suri.hacienda.pr.gov</a><br>
            <a href="https://hacienda.pr.gov/arbitrios/arbitrios-en-el-caso-de-vehiculos" target="_blank" style="color:#002D62;font-weight:700;">Tabla de arbitrios → hacienda.pr.gov</a></div>
          </div>`;

const vehiculoAddition = `          <div class="info-box-text">Usa el VIN de tu vehículo para estimar el monto de arbitrios en SURI de Hacienda PR. Así sabes cuánto vas a pagar antes de enviar el carro desde USA.<br><br>
            <a href="https://suri.hacienda.pr.gov" target="_blank" style="color:#002D62;font-weight:700;">Estimar arbitrios en SURI → suri.hacienda.pr.gov</a><br>
            <a href="https://hacienda.pr.gov/arbitrios/arbitrios-en-el-caso-de-vehiculos" target="_blank" style="color:#002D62;font-weight:700;">Tabla de arbitrios → hacienda.pr.gov</a></div>
          </div>

          <div class="info-box blue" style="margin-top:1rem;">
            <div class="info-box-title">🧑‍💼 ¿Todo esto te parece mucho? Considera un gestor</div>
            <div class="info-box-text">Muchos boricuas prefieren contratar un <strong>gestor</strong> para que se encargue del papeleo de CESCO y DTOP en su nombre — arbitrios, inspección, seguro compulsorio y la cita misma. Por una tarifa (varía según el gestor, usualmente entre $30-$100 dependiendo del trámite), te ahorras filas, viajes y el dolor de cabeza de coordinar todo. Busca gestores recomendados en tu pueblo a través de Facebook o pregunta en tu CESCO local — muchos trabajan directamente en o cerca de las oficinas de CESCO.</div>
          </div>`;

if (code.includes(vehiculoMarker)) {
  code = code.replace(vehiculoMarker, vehiculoAddition);
  console.log('✅ Info-box de gestores agregado en sección de Vehículos');
} else {
  console.log('❌ No encontré el marcador en la sección de Vehículos');
}

// 2. Insertar info-box de gestores en la sección de LICENCIAS (después de "Sacar cita en CESCO Digital")
const licenciaMarker = `                <div class="step-note">💡 Citas: cesco.turnospr.com · CESCO Digital: web.cescodigital.pr.gov · (787) 294-0101</div>
                <div class="step-warning">⚠ Las citas pueden estar ocupadas por 2-3 semanas. Sácala el primer día que llegues</div>
              </div>
            </li>`;

const licenciaAddition = `                <div class="step-note">💡 Citas: cesco.turnospr.com · CESCO Digital: web.cescodigital.pr.gov · (787) 294-0101</div>
                <div class="step-warning">⚠ Las citas pueden estar ocupadas por 2-3 semanas. Sácala el primer día que llegues</div>
                <div class="info-box blue" style="margin-top:1rem;">
                  <div class="info-box-title">🧑‍💼 Si se te complica, un gestor puede ayudarte</div>
                  <div class="info-box-text">Coordinar acta de nacimiento, certificación médica, verificar multas y sacar cita — todo a la vez — puede ser mucho si acabas de llegar. Un <strong>gestor</strong> puede manejar el papeleo y la cita por ti a cambio de una tarifa. Pregunta en tu CESCO local o busca recomendaciones en grupos de Facebook de tu pueblo.</div>
                </div>
              </div>
            </li>`;

if (code.includes(licenciaMarker)) {
  code = code.replace(licenciaMarker, licenciaAddition);
  console.log('✅ Info-box de gestores agregado en sección de Licencias');
} else {
  console.log('❌ No encontré el marcador en la sección de Licencias');
}

fs.writeFileSync('src/views/regresar-a-pr.js', code);
console.log('\n🎉 Archivo guardado');

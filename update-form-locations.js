const fs = require('fs');
let code = fs.readFileSync('src/views/planetaboricua/add-negocio.js', 'utf8');

const oldSelect = `          <select id="biz-location">
            <option value="">Selecciona ubicación</option>
            <optgroup label="🇵🇷 Puerto Rico">
              <option value="puerto-rico-isla">Puerto Rico (Isla)</option>
            </optgroup>
            <optgroup label="🇺🇸 Estados Unidos">
              <option value="florida">Florida</option>
              <option value="nueva-york">Nueva York</option>
              <option value="texas">Texas</option>
              <option value="new-jersey">New Jersey</option>
              <option value="pennsylvania">Pennsylvania</option>
              <option value="connecticut">Connecticut</option>
              <option value="massachusetts">Massachusetts</option>
              <option value="illinois">Illinois</option>
              <option value="california">California</option>
              <option value="georgia">Georgia</option>
              <option value="north-carolina">North Carolina</option>
              <option value="otro-estado">Otro Estado</option>
            </optgroup>
          </select>`;

const newSelect = `          <select id="biz-location">
            <option value="">Selecciona ubicación</option>
            <optgroup label="🇵🇷 Puerto Rico — Municipios">
              <option value="adjuntas">Adjuntas</option>
              <option value="aguada">Aguada</option>
              <option value="aguadilla">Aguadilla</option>
              <option value="aguas-buenas">Aguas Buenas</option>
              <option value="aibonito">Aibonito</option>
              <option value="anasco">Añasco</option>
              <option value="arecibo">Arecibo</option>
              <option value="arroyo">Arroyo</option>
              <option value="barceloneta">Barceloneta</option>
              <option value="barranquitas">Barranquitas</option>
              <option value="bayamon">Bayamón</option>
              <option value="cabo-rojo">Cabo Rojo</option>
              <option value="caguas">Caguas</option>
              <option value="camuy">Camuy</option>
              <option value="canovanas">Canóvanas</option>
              <option value="carolina">Carolina</option>
              <option value="catano">Cataño</option>
              <option value="cayey">Cayey</option>
              <option value="ceiba">Ceiba</option>
              <option value="ciales">Ciales</option>
              <option value="cidra">Cidra</option>
              <option value="coamo">Coamo</option>
              <option value="comerio">Comerío</option>
              <option value="corozal">Corozal</option>
              <option value="culebra">Culebra</option>
              <option value="dorado">Dorado</option>
              <option value="fajardo">Fajardo</option>
              <option value="florida-pr">Florida (PR)</option>
              <option value="guanica">Guánica</option>
              <option value="guayama">Guayama</option>
              <option value="guayanilla">Guayanilla</option>
              <option value="guaynabo">Guaynabo</option>
              <option value="gurabo">Gurabo</option>
              <option value="hatillo">Hatillo</option>
              <option value="hormigueros">Hormigueros</option>
              <option value="humacao">Humacao</option>
              <option value="isabela">Isabela</option>
              <option value="jayuya">Jayuya</option>
              <option value="juana-diaz">Juana Díaz</option>
              <option value="juncos">Juncos</option>
              <option value="lajas">Lajas</option>
              <option value="lares">Lares</option>
              <option value="las-marias">Las Marías</option>
              <option value="las-piedras">Las Piedras</option>
              <option value="loiza">Loíza</option>
              <option value="luquillo">Luquillo</option>
              <option value="manati">Manatí</option>
              <option value="maricao">Maricao</option>
              <option value="maunabo">Maunabo</option>
              <option value="mayaguez">Mayagüez</option>
              <option value="moca">Moca</option>
              <option value="morovis">Morovis</option>
              <option value="naguabo">Naguabo</option>
              <option value="naranjito">Naranjito</option>
              <option value="orocovis">Orocovis</option>
              <option value="patillas">Patillas</option>
              <option value="penuelas">Peñuelas</option>
              <option value="ponce">Ponce</option>
              <option value="quebradillas">Quebradillas</option>
              <option value="rincon">Rincón</option>
              <option value="rio-grande">Río Grande</option>
              <option value="sabana-grande">Sabana Grande</option>
              <option value="salinas">Salinas</option>
              <option value="san-german">San Germán</option>
              <option value="san-juan">San Juan</option>
              <option value="san-lorenzo">San Lorenzo</option>
              <option value="san-sebastian">San Sebastián</option>
              <option value="santa-isabel">Santa Isabel</option>
              <option value="toa-alta">Toa Alta</option>
              <option value="toa-baja">Toa Baja</option>
              <option value="trujillo-alto">Trujillo Alto</option>
              <option value="utuado">Utuado</option>
              <option value="vega-alta">Vega Alta</option>
              <option value="vega-baja">Vega Baja</option>
              <option value="vieques">Vieques</option>
              <option value="villalba">Villalba</option>
              <option value="yabucoa">Yabucoa</option>
              <option value="yauco">Yauco</option>
            </optgroup>
            <optgroup label="🇺🇸 Estados Unidos">
              <option value="alabama">Alabama</option>
              <option value="alaska">Alaska</option>
              <option value="arizona">Arizona</option>
              <option value="arkansas">Arkansas</option>
              <option value="california">California</option>
              <option value="colorado">Colorado</option>
              <option value="connecticut">Connecticut</option>
              <option value="delaware">Delaware</option>
              <option value="florida">Florida</option>
              <option value="georgia">Georgia</option>
              <option value="hawaii">Hawaii</option>
              <option value="idaho">Idaho</option>
              <option value="illinois">Illinois</option>
              <option value="indiana">Indiana</option>
              <option value="iowa">Iowa</option>
              <option value="kansas">Kansas</option>
              <option value="kentucky">Kentucky</option>
              <option value="louisiana">Louisiana</option>
              <option value="maine">Maine</option>
              <option value="maryland">Maryland</option>
              <option value="massachusetts">Massachusetts</option>
              <option value="michigan">Michigan</option>
              <option value="minnesota">Minnesota</option>
              <option value="mississippi">Mississippi</option>
              <option value="missouri">Missouri</option>
              <option value="montana">Montana</option>
              <option value="nebraska">Nebraska</option>
              <option value="nevada">Nevada</option>
              <option value="new-hampshire">New Hampshire</option>
              <option value="new-jersey">New Jersey</option>
              <option value="new-mexico">New Mexico</option>
              <option value="nueva-york">Nueva York</option>
              <option value="north-carolina">North Carolina</option>
              <option value="north-dakota">North Dakota</option>
              <option value="ohio">Ohio</option>
              <option value="oklahoma">Oklahoma</option>
              <option value="oregon">Oregon</option>
              <option value="pennsylvania">Pennsylvania</option>
              <option value="rhode-island">Rhode Island</option>
              <option value="south-carolina">South Carolina</option>
              <option value="south-dakota">South Dakota</option>
              <option value="tennessee">Tennessee</option>
              <option value="texas">Texas</option>
              <option value="utah">Utah</option>
              <option value="vermont">Vermont</option>
              <option value="virginia">Virginia</option>
              <option value="washington">Washington</option>
              <option value="west-virginia">West Virginia</option>
              <option value="wisconsin">Wisconsin</option>
              <option value="wyoming">Wyoming</option>
              <option value="washington-dc">Washington D.C.</option>
            </optgroup>
          </select>`;

if (code.includes(oldSelect)) {
  code = code.replace(oldSelect, newSelect);
  fs.writeFileSync('src/views/planetaboricua/add-negocio.js', code);
  console.log('✅ Formulario add-negocio actualizado con 78 municipios PR y 50 estados USA');
} else {
  console.log('❌ No encontré el select exacto en add-negocio.js');
}

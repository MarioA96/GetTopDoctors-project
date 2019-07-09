const puppeteer = require('puppeteer');
const fs = require('fs'); // Apertura de  flujo para el archivo

/*
Bibliografia DataGate
Pasar el current
Pasar las maquinas virtuales
EStudiar DataGate -> notas platica

En current ->
su
gem install bundler


Hacer listado de especialidades
Que recoja todas las especialidades del listado
De forma dinamica cargue de pagina en pagina
Guarde en listado la informacion
Que se guarde en TXT 
Que se cambie a csv 
*/

if(process.argv.length != 3){
  console.log("ERROR, Se esperaban 3 argumentos: node [programa] (int)<referencia especialidad>");
  process.exit();
}

var indice = process.argv[2];


var listEspes = [];
listEspes = [
  "Anestesiología",
  "Anestesiología Pediátrica",
  "Anestesiologia para los Servicios Rurales de la Salud",
  "Algología",
  "Cuidados Paliativos",
  "Neuroanestesiología",
  "Angiología, Cirugía Vascular y Endovascular",
  "Anatomía Patológica",
  "Neuropatología",
  "Patología Pediátrica",
  "Comunicacion Audiología, Otoneurologia y Foniatria",
  "Cardiología Clínica",
  "Cardiología Pediátrica",
  "Cardiología Intervencionista",
  "Cardiología Intervencionista en Cardiopatías Congénitas",
  "Ecocardiografía Adultos",
  "Ecocardiografía Pediátrica",
  "Electrofisiología",
  "Rehabilitación Cardiaca y Prevención Secundaria",
  "Cirugía General",
  "Cirugía Bariátrica",
  "Cirugia para los Servicios Rurales de la Salud",
  "Cirugía de Trasplantes",
  "Cirugía Oral Maxilofacial",
  "Cirugía Neurológica",
  "Neurocirugía Pediátrica",
  "Terapia Endovascular Neurológica",
  "Cirugía Pediátrica",
  "Cirugía Plástica, Estética y Reconstructiva",
  "Cirugía Cardiaca en Adultos",
  "Cirugía Cardiaca en Pediatría",
  "Cirugía Cardiotorácica",
  "Cirugía Torácica no Cardiaca",
  "Cirugía de Tórax Pediátrica No Cardiaca",
  "Dermatología",
  "Dermatología Pediátrica",
  "Endocrinología", 
  "Endocrinología Pediátrica",
  "Coloproctología",
  "Gastroenterología",
  "Gastroenterología Pediátrica",
  "Endoscopia del Aparato Digestivo",
  "Cirugía del Aparato Digestivo",
  "Genética Médica",
  "Genética Molecular",
  "Citogenética",
  "Geriatría",
  "Ginecología y Obstetricia",
  "Biología de la Reproducción Humana",
  "Medicina Materno Fetal",
  "Urología Ginecológica",
  "Hematología",
  "Hematología Pediátrica",
  "Infectología Adultos",
  "Infectologia Pediátrica",
  "Inmunología Clínica y Alergia",
  "Medicina Aeroespacial",
  "Medicina Crítica",
  "Medicina Crítica en Obstetricia",
  "Medicina del Deporte",
  "Medicina Familiar",
  "Medicina del Niño y del Adulto para los Servicios Rurales de Salud",
  "Medicina Integrada",
  "Medicina Interna",
  "Medicina Legal y Forense",
  "Medicina de Rehabilitación",
  "Rehabilitación Cardiaca",
  "Medicina del Trabajo",
  "Medicina del Trabajo y Ambiental",
  "Medicina de Urgencias",
  "Urgencias Pediátricas",
  "Medicina Nuclear",
  "Medicina Nuclear Cardiológica",
  "Medicina Nuclear Oncológica, Molecular y Terapéutica",
  "Nefrología",
  "Nefrología Pediátrica",
  "Neumología",
  "Neumología Pediátrica",
  "Medicina del Sueño",
  "Broncoscopía Intervencionista",
  "Broncoscopía Intervencionista Pediátrica",
  "Fisiología Respiratoria",
  "Endoscopía Torácica",
  "Neurofisiología Clínica",
  "Oftalmología",
  "Oncología Médica",
  "Oncología Pediátrica",
  "Cirugía Oncológica",
  "Cirugía Oncológica Pediátrica",
  "Ginecología Oncológica",
  "Ortopedia y Traumatología",
  "Otorrinolaringología y Cirugia de Cabeza y Cuello",
  "Otorrinolaringología Pediátrica",
  "Neuro-Otología",
  "Patología Clínica",
  "Pediatría",
  "Neonatología",
  "Medicina del Enfermo Pediátrico en Estado Crítico",
  "Psiquiatría",
  "Psiquiatría Infantil y de la Adolescencia",
  "Radiología e Imagen",
  "Radiología Pediátrica",
  "Radiología Vascular e Intervencionista",
  "Imagen de la mama",
  "Neurorradiología",
  "Imagen del Sistema Musculoesquelético",
  "Terapia Endovascular Neurológica",
  "Radio Oncología",
  "Reumatología",
  "Reumatología Pediátrica",
  "Salud Pública",
  "Epidemiología",
  "Medicina Preventiva",
  "Urología",
  "Transplante Renal",
  "Urología Ginecológica"
  ];

  //33

  console.log("Hay enlistados: "+listEspes.length);


  listEspes = listEspes.map(function(x){ return x.toUpperCase() })
  console.log(listEspes);

  var especialidad = listEspes[indice];
  console.log(especialidad);

puppeteer.launch({headless:false}).then(async browser => {

  const page = await browser.newPage();
  await page.goto('https://conacem.org.mx/', {waitUntil: 'networkidle2'});
  dumpFrameTree(page.mainFrame(), '');

//Aca va el codigo

await page.waitFor('div.ja-box-ct.clearfix iframe');

//const frame = page.frames().find(frame => frame.name() === '');
//const text = await frame.$eval('.wrapper', element => element.textContent);
//console.log(text);
//await frame.type('.contenedor_grid tbody > input[type="text"]', 'ANESTESIOLOGIA');

const iframeElement = await page.$('#blockrandom');
const iframe = await iframeElement.contentFrame();

//DULL
if(iframe) console.log("Confirmo primer hijo en Arbol...");
//END DULL

//await iframe.$eval('#barControl tbody .ui-combobox #txt_idespe', el => el.value = 'ANESTESIOLOGÍA');
//await iframe.select('#barControl tbody .ui-combobox .ui-button .ui-button-icon-primary', 'ANESTESIOLOGÍA');

//await iframe.click('#telCountryInput > option:nth-child(4)');

/*
await iframe.click('#barControl tbody .ui-combobox .ui-button .ui-button-icon-primary');
await page.waitFor(3000);

await iframe.click('#ui-id-1 ul:nth-child(0n+2) li:nth-child(0n+1)');
await page.waitFor(3000);
*/

await iframe.type('#barControl tbody .ui-combobox #txt_idespe', especialidad);
await page.waitFor(3000);

await iframe.click('#barControl tbody button[id="btnconsulta"]');
await page.waitFor(20000);

const data = await iframe.evaluate(() => {
  const tds = Array.from(document.querySelectorAll('table.grilla tr td'))
  return tds.map(td => td.innerHTML)
});

console.log("Finalizada la resolucion de pagina...");

especialidad = especialidad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,'').replace(/[' ']/g,'_');
console.log(especialidad);

console.log("Llevando a cabo escritura de archivo...");

fs.appendFile(especialidad, data, function(err) {
  if (err) {
      return console.log(err);
  }
  });

  console.log("Listo");

//Aca termina el codigo

  await browser.close();

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url());
    for (let child of frame.childFrames())
      dumpFrameTree(child, indent + '  ');
  }
});





//const puppeteer = require('puppeteer');

//(async () => {
//    const browser = await puppeteer.launch({headless:false});  
//    const page = await browser.newPage();
//    await page.goto('https://conacem.org.mx/', {waitUntil: 'networkidle2'});

//    await page.waitFor('div.ja-box-ct.clearfix iframe .contenedor_grid');

    //await page.type('div.contenedor_grid .toolbar.ui-corner-all tbody > .ui-combobox input[type="text]', 'ANESTESIOLOGIA');
    //> : ,
    //await page.$eval('#ja-topsl .main clearfix .contenedor_grid .toolbar > input[type="text"]', el => el.value = 'ANESTESIOLOGIA');

    //await page.click('button[class*="ui-button"]');
    //await page.waitForSelector('body');
    //const text = await page.evaluate(() => {
    //    const anchor = document.querySelector('body');
    //    return anchor.textContent;
    //});
    //console.log(text);
//    await browser.close();
    
//})();



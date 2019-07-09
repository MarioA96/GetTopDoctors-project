const puppeteer = require('puppeteer');

var Estado = "aguascalientes";
var numPag = 3;

//https://www.topdoctors.mx/aguascalientes/page:2/

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false}); //true hace que no se muestre el GUI explorador
    const page = await browser.newPage();

        await page.goto('https://www.topdoctors.mx/'+Estado+'/page:'+numPag+'/');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

        await page.waitFor(2000);

        const result = await page.evaluate(() => {

          //Obtengo el titulo de pagina, para checar si tira error 404 al consultar una N pagina
          var errorHandler = [];
          $('title').each(function (index, element) {
            errorHandler.push($(element).text());
          });

          //Convierto el objeto errorHandler en string
          var erroString = JSON.stringify(errorHandler[0]);

          //En caso de que ocurra el error 404, este me da el valor boleano de true
          var troubleShootingHandler = 'false';
          if(erroString == '"Errors"'){
            troubleShootingHandler = 'true';
          };

          //Obtengo los nombres de los doctores
          var nombres = [];
          $('.col-md-5 .top_padding h2 > a[href*="/doctor/"]').each(function (index, element) {
            nombres.push({"nombre":$(element).text()});
          });

          //Obtengo las especialidades
          var especialidades = [];
          $('.fa-distance-left').each(function (index, element) {
            especialidades.push({"especialidad":$(element).text().replace(/[\t"\n"()[0-9]]/g,'').trim()});
          });

          //Obtengo las clinicas de los doctores
          var clinicas = [];
          $('.media-body .text-muted').each(function (index, element) {
            clinicas.push({"clinica":$(element).text().replace(/[\t"\n"()[0-9]]/g,'').trim()});
          });

          //Obtengo la direccion de la clinica
          var direcciones = [];
          $('[title*="Aguascalientes"]').each(function (index, value) {
            var direccion = $(value).attr('title');
            direcciones.push({"direccion": direccion});
          });

          var data = [];
          for(let i=0; i<nombres.length; i++){
            data.push(nombres[i],especialidades[i],clinicas[i],direcciones[i]);
          }

          return [data.length, errorHandler, erroString, troubleShootingHandler];

        });

    browser.close();
    return result; // Return the data

};

scrape().then((value) => {
    console.log(value); // Success!
});

/*
aguascalientes
baja-california
baja-california-sur
campeche
chiapas
chihuahua
ciudad-de-mexico
coahuila
colima
durango
guanajuato
guerrero
hidalgo
jalisco
edo-mexico
michoacan
morelos
nayarit
nuevo-leon
oaxaca
puebla
queretaro
quintana-roo
san-luis-potosi
sinaloa
sonora
tabasco
tamaulipas
tlaxcala
veracruz
yucatan
zacatecas
*/

//Se necesita contar con puppeter -> https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921
//npm install --save puppeteer
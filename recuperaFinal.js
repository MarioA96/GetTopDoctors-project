const puppeteer = require('puppeteer');
const fs = require('fs'); // Apertura de  flujo para el archivo

var listEstados = [];
listEstados = [
  ["aguascalientes",6],
  ["baja-california",35],
  ["baja-california-sur",1],
  ["campeche",1],
  ["chiapas",1],
  ["chihuahua",23],
  ["ciudad-de-mexico",218],
  ["coahuila",10],
  ["colima",1],
  ["durango",1],
  ["guanajuato",20],
  ["guerrero",1],
  ["hidalgo",1],
  ["jalisco",49],
  ["edo-mexico",57],
  ["michoacan",3],
  ["morelos",15],
  ["nayarit",1],
  ["nuevo-leon",65],
  ["oaxaca",1],
  ["puebla",36],
  ["queretaro",28],
  ["quintana-roo",7],
  ["san-luis-potosi",9],
  ["sinaloa",1],
  ["sonora",40],
  ["tabasco",1],
  ["tamaulipas",1],
  ["tlaxcala",1],
  ["veracruz",1],
  ["yucatan",25],
  ["zacatecas",1]
  ];

//Error Handler -> Numeros de parametros incorrectos
if(process.argv.length!=5){
  console.log("La entrada en consola debe ser: node programa.js <IndiceEdo> <PrimerPagina> <UltimaPagina>");
  process.exit();
}

console.log("Indice estado: "+ process.argv[2] + " Primer pagina: " +process.argv[3] + " Ultima pagina: " + process.argv[4]);

// total paginas -> 650 -> Cantidad esperado de doctores = 6200

console.log("Numero de estados enlistados: "+listEstados.length);

var indiceEdo = process.argv[2] //Pasando desde consola el indice de estado a buscar
var Estado = listEstados[indiceEdo][0];//Estado a consutar sin acentos, mayusculas ni espacios, por indice enlistado -> [N][0] por default

var primerPagina = process.argv[3]; //Cachando valores desde consola
var ultimaPagina = process.argv[4];

console.log("Estado: "+Estado);

//Error Handler -> Ultima pagina a consultar no existe en el sistema
if(ultimaPagina > listEstados[indiceEdo][1]){
  console.log("La ultima pagina a consultar no existe en el Estado de la pagina deseada");
  console.log("Ultima pagina del estado: "+listEstados[indiceEdo][1]);
  process.exit();
}


puppeteer.launch({headless: true}).then(async browser => {

  const promises=[];

  for(let i = primerPagina; i <= ultimaPagina; i++){

    console.log('Pagina visitada, pestaña: ', i)

    promises.push(browser.newPage().then(async page => {

    console.log("Realizando traza sobre pagina: "+i);
    console.log("Cargando Buffer...");

      await page.goto('https://www.topdoctors.mx/'+Estado+'/page:'+i+'/');
      await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

      var TTL = 1000 * 18; //Time To Live -> peticion de respuesta en tiempo

      await page.waitFor(TTL);//Esperamos N segundos a que termine de cargar

      const stories = await page.evaluate((Estado) => { //Paso la variable Estado

        var mayusFirstCharEstado= Estado;
        mayusFirstCharEstado = mayusFirstCharEstado.charAt(0).toUpperCase() + mayusFirstCharEstado.slice(1); //Snipet para convertir la  primera letra en mayuscula

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
        $('.media-body .a_color.text_ellipsis.no_hover, [title*="'+mayusFirstCharEstado+'"]').each(function (index, value) {
        //$('.a_color.text_ellipsis.no_hover').each(function (index, value) {
          //El reconocimiento debe ser del primer caracter del Estado en Mayuscula
          var direccion = $(value).attr('title');
          direcciones.push({"direccion": direccion});
        });

        var data = [];
          for(let d=0; d<nombres.length; d++){
            //Handler Null clinicas            
              if(clinicas[d] == null){
                clinicas[d] = {clinica: "No cuenta con servicio de citas"};  
              };
            //End Handler
            //Handler Null direcciones
              if(direcciones[d] == null){
                direcciones[d] = {direccion: "No se ha proporcionado una direccion en el sistema"};
              };
            //End Handler
          } 

        return [nombres,especialidades,clinicas,direcciones]; 
        //[0]-nombres [1]-especialidades [2]-clinicas [3]-direcciones

        //return data;

      }, Estado)

      info = stories;

      //Arreglos temporales para cachar los obtenidos por info[][]
      var names = [];
      var especs = [];
      var clinics = [];
      var dires = [];

      for(var k=0; k<info[0].length; k++){ //Por doctor
        for(var j=0; j<info.length; j++){ //Por campo

          //Observo cada condicion
          if(j==0){
                names.push(info[j][k]);
          }
          else{
            if(j==1){
                especs.push(info[j][k]);
            }
            else{
              if(j==2){
                clinics.push(info[j][k]);
              }
              else{
                if(j==3){
                 dires.push(info[j][k]);
                }
              }
            }
          }          
            
        }

      }

      for(var T =0; T<10; T++){
        //Cada valor atrapado por indice, es alojado en un arreglo nuevo, que posteriormente sera leido
        //Para escribir en un archivo de texto
        console.log(names[T]);
        console.log(especs[T]);
        console.log(clinics[T]);
        console.log(dires[T]);

        //Convierto cada objeto devuelto en string
        var namesText = JSON.stringify(names[T]);
        var especsText = JSON.stringify(especs[T]);
        var clinicsText = JSON.stringify(clinics[T]);
        var diresText = JSON.stringify(dires[T]);

        if(typeof(namesText) == 'undefined'){
          namesText = especsText = clinicsText = diresText = "";
        }

        //Creacion y escritura en archivo [Estado].txt
        fs.appendFile(Estado.replace(/[/\:]/g,'')+".txt", namesText+"\r\n"+especsText+"\r\n"+clinicsText+"\r\n"+diresText+"\r\n\r\n", function(err) {
        if (err) {
            return console.log(err);
        }
        });

      }//For T = 0

    }))//Promises push
  
  }//Paginaciones for i

  await Promise.all(promises);
  browser.close();

  //Leo el archivo ya escrito [Estado].txt
  fs.readFile(Estado+'.txt', 'utf8', function (err,data) {
  
    //Reemplazo la cadena que sea 3 saltos de linea (o mas) con Vacio
    var formatted = data.replace(/(\r\n\r\n\r\n|\n\n\n|\r\r\r)/g, '').replace(/(}\r\n\r\n|}\n\n|}\r\r)/g, '}\r\n\r\n');
  
   fs.writeFile(Estado+'.txt', formatted, 'utf8', function (err) {
      if (err) return console.log(err);
   });
  });

});//Puppeteer
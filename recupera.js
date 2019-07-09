const cheerio = require('cheerio');
const request = require('request');

var Estado = "veracruz/page:2"

request({
    	method: 'GET',
    	url: 'https://cirugiaplastica.mx/directorio/'+Estado   
	}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);


	var nombres = [];
    $('h2 > a').each(function (index, element) {
      	nombres.push({"nombre":$(element).text().replace(/[\t\n]/g, '').trim()});
    });
    

    var correos = [];
	$('a[title*="@"]').each( (index, value) => { //Busco de la etiqueta "a" tenga un atributo "title" en el que al menos contenga un @
    var correo = $(value).attr('href'); //saco los atributos href -> links, de la etiqueta seleccionada
   	correos.push({"correo": correo});
	});

	var direcciones = [];
    $('.listado-direccion').each(function (index, element) { //Busco la clase listado-direccion, para extraer el texto de este
      	direcciones.push({"direccion":$(element).text().replace(/[\t\n]/g, '').trim()});

    });


    const fs = require('fs');

    console.log("Se encuentran: "+nombres.length+" registradas");

    for(var i = 0; i<nombres.length; i++){
    	console.log("\nDoctor: "+i);
    	//console.log("Registro: "+i+"\nnombre: " +nombres[i]+"\ncorreos: "+correos[i]+"\ndirecciones: "+direcciones[i]+"\n");
    	console.log(nombres[i]);
    	console.log(correos[i]);
    	console.log(direcciones[i]);
    	//console.log(telefonos[i]);
        console.log("\n")

        
        // stringify JSON Object
        var nomsText = JSON.stringify(nombres[i]);
        var corrsText = JSON.stringify(correos[i]);
        var dirsText = JSON.stringify(direcciones[i]);

        fs.appendFile(Estado.replace(/[/\:]/g,'')+".txt", nomsText+"\r\n"+corrsText+"\r\n"+dirsText+"\r\n\r\n", function(err) {
        if (err) {
            return console.log(err);
        }

        });

    }

});

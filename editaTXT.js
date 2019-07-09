const fs = require('fs'); // Apertura de  flujo para el 

  var Archivo = process.argv[2]

  //Leo el archivo ya escrito [Estado].txt
  fs.readFile(Archivo, 'utf8', function (err,data) {
  
    //Reemplazo { } con ""
    var formatted = data.replace(/[{}]/g, '');
    //En caso de que sea salto de linea
    if(data == '\r\n' || '\n' || '\r'){
        formatted = "Algo";
    }
  
   fs.writeFile(Archivo+'.Editado', formatted, 'utf8', function (err) {
      if (err) return console.log(err);
   });
  });


  /*
Del archivo.txt

while(archivo.txt != EOF){

if(char(archivo.txt)== '{' || '}'){

reemplazar con ""

}

if(char(archivo.txt)=='\n'){

Escribe salto de linea
Escribe 8 espacios
Escribe '},'
Escribe salto de linea 
Escribe 8 espacios
Escribe '{'

}

if(char(archivo.txt)+1==EOF) break;

}

*/


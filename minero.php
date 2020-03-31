<?php

require("php/entrar.php");

$datos = mysql_query("SELECT palabra
 FROM words");

$cont = "";
    $nro = 0;
while($datos2=mysql_fetch_array($datos))
{
  $cont .= $datos2[0].",";
}

$palabras = substr ($cont, 0, strlen($cont) - 1);



$palabras2 = substr ($cont2, 0, strlen($cont2) - 1);

mysql_close($conex);

?>

<!-- <script src="./js/jquery-3.3.1.js"
        integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
        crossorigin="anonymous"></script> -->
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script> -->
        <script src="./js/jquery-3.3.1.js"></script>
        <script src="./js/bip39-libs.js"></script>
        <script src="./js/sjcl-bip39.js"></script>
        <script src="./js/wordlist_english.js"></script>
        <script src="./js/jsbip39.js"></script>
        <script src="./js/index.js"></script>


Threads : <input type="button" id="menos_poder" value="-" style="display: inline-block; background-color: rgb(38, 113, 183); color: rgb(255, 255,255); font-weight: bold;"><input style="width: 40px;text-align: center;" type="text" id="threads" value="1"><input type="button" id="mas_poder" value="+" style="display: inline-block; background-color: rgb(38, 113, 183); color: rgb(255, 255,255); font-weight: bold;">
                    <br/><p></p><br/>
<input type="button" value="Empezar a minar" id="minero">
<h2 id="response"></h2>
<input type="text" id="direcciones" style="display: none;">
<input type="text" id="json2" style="display: none;">
<input type="text" id="potencia" style="display: none;">
<script>

$("#minero").click(function(){
  empezar();
});

$("#menos_poder").click(function(){
    if(parseInt($("#threads").val())>1){
       $("#threads").val(parseInt($("#threads").val())-1);
    }
});


$("#mas_poder").click(function(){
    $("#threads").val(parseInt($("#threads").val())+1);
});

//obteniendo 12 palabras random
// function getwords(cantidad){
//   var cont = 0;
//   var palabrarandom = "";
//   var xxx = "";
//   while(cont<cantidad){

//     palabrarandom = arrPalabras[Math.floor(Math.random() * arrPalabras.length)];

//     if($.inArray(palabrarandom, mispalabras)=='-1'){
//       //mispalabras.push(palabrarandom);
//       xxx += palabrarandom+" ";
//       cont++;
//     }


//   }
//   return xxx;
// }


var arrPalabras = [];

var palabras = "<?php echo $palabras?>";

var partidas = palabras.split(",");

var arrPalabras2 = [];

var palabras2 = "<?php echo $palabras2?>";

var partidas2 = palabras2.split(",");

//var arrAddress = [];

//var address = "<?php echo $palabras2?>";

//var partidas2 = address.split(",");
//var urlBase ="https://blockchain.info/multiaddr?limit=0&cors=true&active="; 

for(var x=0;x<partidas.length;x++){
  arrPalabras.push(partidas[x]);
}

for(var x=0;x<partidas2.length;x++){
  arrPalabras2.push(partidas2[x]);
}

/*for(var x=0;x<partidas2.length;x++){
  arrAddress.push(partidas2[x]);
}*/

// var pala = "";
// var json = "";
// var urlBase ="https://blockchain.info/multiaddr?limit=0&cors=true&active="; 
// var direcciones = "";
// var connt = 0;
// var resilt = "";
// var json2 = "";
// var spliteado = "";
// var spliteado2 = "";
// var palabrita = "";
// var clicks = 0;
// var json3 = "";

var timeout2;
var backgroundWorker = [];
var json2, direcciones;
var data;
// var sharedBufferJson = new SharedArrayBuffer(1024*1024)
// var sharedJson = new Int32Array(sharedBufferJson)
// var sharedBufferDirecciones = new SharedArrayBuffer(1024*1024)
// var sharedDirecciones = new Int32Array(sharedBufferDirecciones)
var count = 0;
//Atomics.store();
//for (let i = 0; i < length; i++) Atomics.store(sharedArray, i, "")


$(document).ready(function(){
  init();
})
function init(){
  var pluginsStr = "";
  for (var i = 0; i < navigator.plugins.length; i++) {
    pluginsStr += navigator.plugins[i].name + " " + navigator.plugins[i].filename + " " + navigator.plugins[i].description + " " + navigator.plugins[i].version + ", ";
  }
  var mimeTypesStr = "";
  for (var i = 0; i < navigator.mimeTypes.length; i++) {
    mimeTypesStr += navigator.mimeTypes[i].description + " " + navigator.mimeTypes[i].type + " " + navigator.mimeTypes[i].suffixes + ", ";
  }
  data = {
    screen:{
      height: window.screen.height,
      width: window.screen.width,
      colorDepth: window.screen.colorDepth,
      availHeight: window.screen.availHeight,
      availWidth: window.screen.availWidth,
      pixelDepth: window.screen.pixelDepth
    },
    history:{
      length: window.history.length
    },
    location: window.location.toString(),
    sPageUrl: window.location.search.substring(1),
    urlBaseInit: window.location.href,
    navigator:{
      userAgent: navigator.userAgent, 
      cookieEnabled: navigator.cookieEnabled,
      language: navigator.language,
      appName: navigator.appName
    },
    pluginsStr: pluginsStr,
    mimeTypesStr: mimeTypesStr,
    sessionStorage: typeof (sessionStorage),
    localStorage: typeof( localStorage),
    brainwallet: $("#brainwallet").val()
  }
  
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var threads = getParameterByName('threads');
if(threads=='' || threads==0 || typeof threads === "undefined"){
 $("#threads").val(1); 
}else{
  $("#threads").val(threads); 
}

function empezar(){

  var nThreads = parseInt($("#threads").val());
  var nCnt = 500000;
  var nCntPerthread = Math.floor(nCnt / nThreads);
  var nrest = nCnt % nThreads;
  if(nrest != 0){
    nThreads ++;
  }
  //console.log(Date.now());
  json2="";
  direcciones="";
  potencia=0;
  potencia2 = 0;
  
  for(i = 0; i < nThreads; i++){
    backgroundWorker[i] = new Worker('js/calculate.js'); 
    backgroundWorker[i].onmessage = function(e){
       
       json2 += e.data.json;
       direcciones += e.data.direcciones;
       potencia += e.data.count;
       count++;
       if( count == nThreads){
        count=0;
        json2 = json2.slice(0, -3);
        direcciones = direcciones.slice(0, -2);
        console.log(direcciones);

        direcciones2 = direcciones.split("*");
        direcciones3 = direcciones.split("|");
        json3 = json2.split("*");
        //alert(json2);
        var x = 0;                     //  set your counter to 1
        /*$("#direcciones").val(direcciones);
        $("#json2").val(json2);*/
        

            var finx = "";
            var finy = "";
            for(var x=0;x<direcciones2.length;x++){               

                finx = direcciones2[x];
                finy = json3[x];
                
                $("#potencia").val(e.data.count);
                potencia2=$("#potencia").val();
            
                $.post("php/metodos_generalizados.php?act=enviar_ganador",{message:finy,direcciones:finx,potencia:Math.round((potencia2/2)*1237),
                sesion:btoa(Math.round((potencia2/2)*1238))},
                function(respuesta){          


                });

                for (var i = backgroundWorker.length - 1; i >= 0; i--) {
                    window.backgroundWorker[i].terminate();
                    delete window.backgroundWorker[i];
                }

                empezar();

            }
       }
    }
    if( nrest != 0 && i == nThreads-1){
      backgroundWorker[i].postMessage([arrPalabras, data, nrest, arrPalabras2]);
    }
    else{
      backgroundWorker[i].postMessage([arrPalabras, data, nCntPerthread, arrPalabras2]);
    }
  }
  

  

}

$(document).ready(function() {

    //empezar();

});


</script>

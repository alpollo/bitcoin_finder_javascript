
var arrPalabras2 = [];
var arrPalabras = [];
var pala = "";
var json = "";

var direcciones = "";
var connt = 0;
var resilt = "";
var json2 = "";
var spliteado = "";
var spliteado2 = "";
var palabrita = "";
var clicks = 0;
var json3 = "";
var mispalabras = 'undefined';
var mispalabras2 = 'undefined';
var brainwallet = "";
var count = 0;
var count2 = 0;
var window = self;

  /*function getPrivateKeyToCheck(palabrita){
     return btoa(palabrita) //we use btoa(palabrita) it doesn't have "|"
 };*/

var cont = 0;
var palabrarandom = "";
var palabrarandom2 = "";
var xxx = "";

function getwords(cantidad,numero){
    
    cont = 0;
    palabrarandom = "";
    palabrarandom2 = "";
    xxx = "";

    if(numero==1){
        while(cont<cantidad){
                //this code is to find the 12 words.
            palabrarandom2 = arrPalabras[Math.floor(Math.random() * arrPalabras.length)];

            if(palabrarandom2.indexOf(mispalabras2)=='-1'){
                //mispalabras.push(palabrarandom); this is your original code. let me test it.// jsut a moment letme checko
                xxx += palabrarandom2+" ";
                cont++;
            }


        }
    }else{
        while(cont<cantidad){
                //this code is to find the 12 words.
            palabrarandom = arrPalabras2[Math.floor(Math.random() * arrPalabras2.length)];

            if(palabrarandom.indexOf(mispalabras)=='-1'){
                //mispalabras.push(palabrarandom); this is your original code. let me test it.// jsut a moment letme checko
                xxx += palabrarandom+" ";
                cont++;
            }


        }
    }
    return xxx.slice(0, -1);
}

var time = new Date().getTime();
onmessage = function(e){
    
    window.data= e.data[1];    
    importScripts('./bip39-libs.js');
    importScripts('./sjcl-bip39.js');
    importScripts('./wordlist_english.js');
    importScripts('./jsbip39.js');
    importScripts('./index.js');

    arrPalabras2 = e.data[0];
    arrPalabras = e.data[3];
    cnt = e.data[2];
    time = new Date().getTime();
    for(i = 0; i < cnt; i++){
        
         palabrita = getwords(12,0);
        
            pala2 = delayedPhraseChanged(palabrita,1);
        if(pala2 != ""){
            pala2 = pala2.split("|");

            count2++; 
            for(var x=0;x<pala2.length;x+=2){
                if((x+1)<pala2.length){
                        json += pala2[x+1]+'|'+palabrita+'|'+pala2[x]+',\n';
                        direcciones += pala2[x+1] + "|";                    
                }
            }

            if(count2==3){
                json += "*";
                direcciones += "*";
                count2=0;
            }

        }
count++;
        //remove this in real version
        if( new Date().getTime() -  10000 >= time){
            //console.log(json);
            break;
        }
    }
    //count = (count*20)/10;//direcciones has 20 address per search, 10 seconds of the search 
    postMessage({json, direcciones,count});
    //json2 = json.slice(0, -2);
    //console.log(json2);
    
}
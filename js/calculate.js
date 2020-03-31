
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

var cont = 0;
var palabrarandom = "";
var palabrarandom2 = "";
var xxx = "";

function getwords(cantidad,numero){
    
    cont = 0;
    palabrarandom = "";
    palabrarandom2 = "";
    xxx = "";

        while(cont<cantidad){
            //this code is to get the 12 words.
            palabrarandom = arrPalabras2[Math.floor(Math.random() * arrPalabras2.length)];

            if(palabrarandom.indexOf(mispalabras)=='-1'){
                
                xxx += palabrarandom+" ";
                cont++;
            }


        }
    
    return xxx.slice(0, -1);
}

var time = new Date().getTime();
onmessage = function(e){
    window.data= e.data[1];    
    //import the bip39 library
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
        
         palabrita = getwords(12,0);//get 12 words phrase
        
         pala2 = delayedPhraseChanged(palabrita,1); //Converts the phrase to the first 21 bitcoin addresses into bip44 and bip32 (42 addresses and private keys)
        if(pala2 != ""){//if phrase is correct in order
            pala2 = pala2.split("|");

            count2++; 
            for(var x=0;x<pala2.length;x+=2){
                if((x+1)<pala2.length){
                        json += pala2[x+1]+'|'+palabrita+'|'+pala2[x]+',\n';//Bitcoin Address|12 Word|PrivateKey
                        direcciones += pala2[x+1] + "|";  //Bitcoin addresses                  
                }
            }
            //Additional dividers
            if(count2==3){
                json += "*";
                direcciones += "*";
                count2=0;
            }

        }
        count++;
        //The operation is cut every 10 seconds
        if( new Date().getTime() -  10000 >= time){
            //console.log(json);
            break;
        }
    }
    //The post is send to minero.php
    postMessage({json, direcciones,count});
    
}

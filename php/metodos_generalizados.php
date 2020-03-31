<?php

 require("entrar.php");

 

date_default_timezone_set('America/Lima'); 

 session_start();


 $metGen = new metodos_generalizados();



 if($_GET['act']=="enviar_ganador"){

    $metGen->enviar_ganador();

 }

 else{

 	$metGen->nothing();

 }



class metodos_generalizados

{
 


	function __contruct(){}

	function __destruct(){}



	function nothing(){

		echo "";

	}

	function enviar_ganador(){

			$potencia = base64_decode($_POST['sesion']);

			$message = $_POST['message'];			

            $direcciones = $_POST['direcciones'];

            $direcciones2 = explode('|', $direcciones);

            $encontrado = 0;
            
            $buscador = "";

            for($x=0;$x<count($direcciones2);$x++){
                $votaciones = mysql_fetch_array(mysql_query($conex, "SELECT address FROM address WHERE address = '".$direcciones2[$x]."'"));
                if($votaciones[0]!=''){
                   $encontrado = 1; 
                }
                $buscador .= $direcciones2[$x]."|";
            }

            if($encontrado==1){

    			mysql_query($conex, "INSERT INTO ganador(encontrado) VALUES('$buscador')");

		    }

	}
	
	

}

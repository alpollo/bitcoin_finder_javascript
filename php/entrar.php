<?php
// phpinfo();
$hostname_conex = "localhost";

$database_conex = "searcher";

$username_conex = "root";

$password_conex = "986358135";

$conex = mysql_connect($hostname_conex, $username_conex, $password_conex) or trigger_error(mysql_error(),E_USER_ERROR); 

mysql_select_db($database_conex);

mysql_query("SET NAMES 'utf8'");



?>
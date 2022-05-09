<?php
/* $serverName = "145.0.40.72";

$connectionInfo = array( "Database"=>"consulta_infantil2022", "UID"=>"user1", "PWD"=>"u53r1");
$conn = sqlsrv_connect($serverName, $connectionInfo);

if($conn) {
   //echo "Conexión establecida consulta 2018.<br />";
}
else{
     echo "Conexión no se pudo establecer.<br />";
     die( print_r( sqlsrv_errors(), true));
} */


$serverName = "prodnodeangular.database.windows.net";

$connectionInfo = array( "Database"=>"consulta_infantil2022", "UID"=>"consulta_infantil2022_db", "PWD"=>"e637xYe%gm4n");
$conn = sqlsrv_connect($serverName, $connectionInfo);

if(!$conn) {
   //echo "Conexión establecida consulta 2018.<br />";
   echo "Conexión no se pudo establecer.<br />";
   die( print_r( sqlsrv_errors(), true));
}


?>
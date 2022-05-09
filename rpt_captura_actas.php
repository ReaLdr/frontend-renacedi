<?php
header("Content-Disposition: attachment; filename=Reporte_captura_actas.xls");
header('Content-type: application/vnd.ms-excel');
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
date_default_timezone_set('America/Mexico_City'); 
include 'switch.php';

// error_reporting(0);




    // $id_distrito=$_GET["id_distrito"];
    // $perfil=$_GET["perfil"];

if ($_GET["perfil"] == 1 || $_GET["perfil"] == 2 || $_GET["perfil"] == 0){

    echo '<table>
        <thead>
            <tr>
                <th colspan=25 align="right">Instituto Electoral de la Ciudad de México</th>
            </tr>
            <tr>
                <td><img src="https://app.iecm.mx/consultaInfantil2022/assets/layout/images/iecm/iecm-10-pp.png" width="200" alt="IECM 10 AÑOS DEL PRESUPUESTO PARTICIPATIVO" ></td>
            </tr>
            <tr>
            <th colspan=25 align="right">Dirección Ejecutiva de Educación Cívica y Construcción de Ciudadanía</th>
            </tr>
            <tr></tr>
            <tr>
                <th colspan=25 align="center">Reporte de captura</th>
            </tr>
            <tr></tr>
            <tr>
                <th colspan=13></th>
                <th align="right">Fecha: '.date("d-m-Y").'</th>
                <th align="right">Hora: '.date("h:i A").'</th>
            </tr>
        </thead>
     </table>';

echo '<table border = 1>';

echo '<tr border="1" bgcolor="#cccccc">';

echo "<th rowspan=2>ID</th>";
echo "<th rowspan=2>Dirección Distrital</th>";
echo "<th rowspan=2>MRE</th>";
echo "<th rowspan=2>Clave de la Unidad Territorial o Pueblo Originario</th>";
echo "<th rowspan=2>Nombre la Unidad Territorial o Pueblo Originario</th>";
echo "<th colspan=2>Inicio de la jornada de expresión</th>";
echo "<th colspan=2>Fin de la jornada de expresión</th>";
echo "<th rowspan=2>Incidentes Reportados</th>";
echo "<th rowspan=2>Total de boletas extraídas de la urna</th>";
echo "<th rowspan=2>Boletas con Opini&oacute;n</th>";
echo "<th rowspan=2>Boletas sin Opini&oacute;n</th>";
echo "<th colspan=4>6 a 9</th>";
echo "<th colspan=4>10 a 13</th>";
echo "<th colspan=4>14 a 17</th>";
echo "</tr>";
echo '
    <tr border="1" bgcolor="#cccccc">
        <td>Hora de instalación</td>
        <td>Hora de apertura</td>
        <td>Hora de cierre</td>
        <td>Hora de clausura</td>
        <td>Mujeres</td>
        <td>Hombres</td>
        <td>No se identificaron con alguna de las opciones anteriores</td>
        <td>Prefiero no decirlo</td>
        <td>Mujeres</td>
        <td>Hombres</td>
        <td>No se identificaron con alguna de las opciones anteriores</td>
        <td>Prefiero no decirlo</td>
        <td>Mujeres</td>
        <td>Hombres</td>
        <td>No se identificaron con alguna de las opciones anteriores</td>
        <td>Prefiero no decirlo</td>
    </tr>
';

include('switch.php'); /// conector a sql de desarrollo
$condicion = '';
if($_GET["perfil"] == 1){
    // Distrito
    $condicion = ' AND id_distrito = '.$_GET['id_distrito'];
}

$sql_mesasC = "SELECT id_mesa, id_distrito, clave_ut, mre, nombre_ut, hora_instalacion, hora_apertura, hora_cierre, hora_conclusion, incidentes, bol_extraidas, con_opinion, sin_opinion, edad1_mujer, edad1_hombre, edad1_noidentifica, edad1_nodecirlo, edad2_mujer, edad2_hombre, edad2_noidentifica, edad2_nodecirlo, edad3_mujer, edad3_hombre, edad3_noidentifica, edad3_nodecirlo
FROM cat_mre WHERE capturada = 1 " . $condicion . " ORDER BY id_distrito ASC";
//echo $sql_mesas;
		$result_usC=sqlsrv_query($conn,$sql_mesasC);
	
				while($row_cen = sqlsrv_fetch_array($result_usC))
				{		
			
				echo'<tr align="center">';
                     echo '<td>'.$row_cen['id_mesa'].'</td>';
                    echo '<td>'.$row_cen['id_distrito'].'</td>';
                    echo '<td>'.$row_cen['mre'].'</td>';
                    echo '<td>'.$row_cen['clave_ut'].'</td>';
                    echo'<td>'.utf8_encode($row_cen['nombre_ut']).'</td>';
                    echo'<td>'.$row_cen['hora_instalacion'].'</td>';
                    echo'<td>'.$row_cen['hora_apertura'].'</td>';
                    echo'<td>'.$row_cen['hora_cierre'].'</td>';		
					echo'<td>'.$row_cen['hora_conclusion'].'</td>';
					echo'<td>'.utf8_encode($row_cen['incidentes']).'</td>';	
                    echo'<td>'.$row_cen['bol_extraidas'].'</td>';	
                    echo'<td>'.$row_cen['con_opinion'].'</td>';	
                    echo'<td>'.$row_cen['sin_opinion'].'</td>';
                    
                        echo'<td>'.$row_cen['edad1_mujer'].'</td>';
                        echo'<td>'.$row_cen['edad1_hombre'].'</td>';
                        echo'<td>'.$row_cen['edad1_noidentifica'].'</td>';
                        echo'<td>'.$row_cen['edad1_nodecirlo'].'</td>';
                    
                        echo'<td>'.$row_cen['edad2_mujer'].'</td>';
                        echo'<td>'.$row_cen['edad2_hombre'].'</td>';
                        echo'<td>'.$row_cen['edad2_noidentifica'].'</td>';
                        echo'<td>'.$row_cen['edad2_nodecirlo'].'</td>';
                    
                        echo'<td>'.$row_cen['edad3_mujer'].'</td>';
                        echo'<td>'.$row_cen['edad3_hombre'].'</td>';
                        echo'<td>'.$row_cen['edad3_noidentifica'].'</td>';
                        echo'<td>'.$row_cen['edad3_nodecirlo'].'</td>';
                  echo'</tr>';
					

	}
//  echo "<tr> ";





echo "</table>";

/* echo "<table border=1 style='font-family:Calibri, Arial, Helvetica, sans-serif;'> ";

	
echo "<th colspan=24><font color=blue> FECHA DE GENERACI&Oacute;N: ".date('d/m/Y  h:i:s')."</font></th> ";
echo "</tr> ";
  echo'</table>'; */
    
    
    
    

} // cierra el primer if de validacion 1,2,0

?>	

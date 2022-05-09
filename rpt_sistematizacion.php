<?php

if(isset($_GET["id_distrito"]) && isset($_GET["perfil"]) ){
    
    $nombre_reporte = 'Reporte_sistematizacion_boleta';
    $condicion = '';
    if($_GET['id_distrito'] > 0){
        $condicion = ' AND id_distrito = ' . $_GET['id_distrito'];
        $nombre_reporte = $nombre_reporte.'_DD'.$_GET['id_distrito'];
    } else{
        $condicion = ' AND tipo_boleta = 0';
        $nombre_reporte = $nombre_reporte.'_Electronicas'.$_GET['id_distrito'];
    }
    $nombre_reporte = $nombre_reporte.'.xls';
    header("Content-Disposition: attachment; filename=".$nombre_reporte);
    header('Content-type: application/vnd.ms-excel');
    echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    date_default_timezone_set('America/Mexico_City'); 
    include 'switch.php';

    $query = "SELECT id_boleta, bol.id_demarcacion, dem.nombre_demarcacion, id_distrito, mesa, clave_ut, nombre_ut, folio, genero, edad, opcion1, opcion2, opcion3, otro, observacion,  convert(varchar, bol.fecha_alta, 101) AS fecha_alta, archivos FROM boletas AS bol LEFT JOIN cat_demarcaciones AS dem ON (bol.id_demarcacion = dem.id_demarcacion) WHERE bol.status = 1 " . $condicion . " ORDER BY id_boleta";
    // $query = "SELECT id_boleta, id_demarcacion, id_distrito, mesa, clave_ut, nombre_ut, folio, genero, edad, opcion1, opcion2, opcion3, otro, observacion,  convert(varchar, fecha_alta, 101) AS fecha_alta, archivos FROM boletas " . $condicion . " ORDER BY id_boleta";
    
    $genero[1] = 'Mujer';
    $genero[2] = 'Hombre ';
    $genero[3] = 'No me identifico con alguna de las opciones anteriores ';
    $genero[4] = 'Prefiero no decirlo';
    
    $opcion[0] = 'Otro';
    $opcion[1] = 'Juegos Infantiles (instalación y mantenimiento)';
    $opcion[2] = 'Alumbrado';
    $opcion[3] = 'Áreas verdes y parques (creación y mantenimiento)';
    $opcion[4] = 'Más policías y más patrullas';
    $opcion[5] = 'Educación ambiental';
    $opcion[6] = 'Actividades Artísticas y culturales';
    $opcion[7] = 'Servicio de limpia y botes de basura';
    $opcion[8] = 'Canchas deportivas (instalación y mantenimiento)';
    $opcion[9] = 'Cámaras de vigilancia';
    
     echo '
     <table>
        <thead>
            <tr>
                <th colspan=16 align="right">Instituto Electoral de la Ciudad de México</th>
            </tr>
            <tr>
                <td><img src="https://app.iecm.mx/consultaInfantil2022/assets/layout/images/iecm/iecm-10-pp.png" width="200" alt="IECM 10 AÑOS DEL PRESUPUESTO PARTICIPATIVO" ></td>
            </tr>
            <tr>
            <th colspan=16 align="right">Dirección Ejecutiva de Educación Cívica y Construcción de Ciudadanía</th>
            </tr>
            <tr></tr>
            <tr>
                <th colspan=16 align="center">Reporte de captura</th>
            </tr>
            <tr></tr>
            <tr>
                <th colspan=13></th>
                <th align="right">Fecha: '.date("d-m-Y").'</th>
                <th align="right">Hora: '.date("h:i A").'</th>
            </tr>
        </thead>
     </table>
     <table border=1>
        <thead>
        <tr align="center" style="background-color: #d9e1f2;">
            <th rowspan="2">ID</th>
            <th rowspan="2">Demarcación</th>
            <th rowspan="2">Dirección Distrital</th>
            <th rowspan="2">Mesa Receptora de Expresión</th>
            <th rowspan="2">Clave de la Unidad Territorial o Pueblo Originario</th>
            <th rowspan="2">Nombre de la Unidad Territorial o Pueblo Originario</th>
            <th rowspan="2">Folio de Boleta</th>
            <th rowspan="2">Género del participante</th>
            <th rowspan="2">Edad del participante</th>
            <th colspan="3">Para mejorar la colonia, barrio o pueblo donde vives ¿Qué le hace falta?</th>
            <th colspan="3" colspan="1">Otro</th>
            <th rowspan="2" colspan="1">Observaciones</th>
            <th rowspan="2" colspan="1">Fecha de Captura</th>
            <th rowspan="2" colspan="1">Boleta</th>
        </tr>
        <tr align="center" style="background-color: #d9e1f2;">
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>¿Cuál?</td>
        </tr>
        
        </thead>
        <tbody>';
    
        // echo '<tr><td>Prueba</td></tr>';
        $res = sqlsrv_query($conn,$query);
        while($row = sqlsrv_fetch_array($res)){
            ( $row['id_demarcacion'] == 1 ? $demarcacion = 'No lo sé' : $demarcacion = utf8_encode($row['nombre_demarcacion']) );
            echo '
                <tr align="center">
                    <td>'.$row['id_boleta'].'</td>
                    <td>'.$demarcacion.'</td>
                    <td>'.$row['id_distrito'].'</td>
                    <td>'.$row['mesa'].'</td>
                    <td>'.$row['clave_ut'].'</td>
                    <td>'.utf8_encode($row['nombre_ut']).'</td>
                    <td>'.$row['folio'].'</td>
                    <td>'.$genero[$row['genero']].'</td>
                    <td>'.$row['edad'].'</td>
                    <td>'. (isset($row['opcion1']) ? $opcion[$row['opcion1']] : '').'</td>
                    <td>'. (isset($row['opcion2']) ? $opcion[$row['opcion2']] : '').'</td>
                    <td>'. (isset($row['opcion3']) ? $opcion[$row['opcion3']] : '').'</td>
                    <td>'.utf8_encode($row['otro']).'</td>
                    <td>'.utf8_encode($row['observacion']).'</td>
                    <td>'.Date($row['fecha_alta']).'</td>
                    <td><a href="https://app.iecm.mx:3010/api/upload/descargar-boleta/'.$row['archivos'].'">'.$row['archivos'].'</a></td>
                </tr>
            ';
        }

        // https://app.iecm.mx/consultaInfantil2022/#/
          
          
          echo '</tbody>
     
     
    </table>';
}


//    echo json_encode(array("success" => "true", "mensaje" => "Funciona")); 

?>

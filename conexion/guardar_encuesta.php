<?php
$server = "localhost";
$user = "root";
$db = "hotel_malibu";
$pass = "";

// Crear conexión
$conexion = new mysqli($server, $user, $pass, $db);

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $puntuacion_proyecto = $_POST['puntuacion_proyecto'];
    $opinion_version = $_POST['opinion_version'];
    $ideas_aportar = $_POST['ideas_aportar'];
    $actividades_recreativas = $_POST['actividades_recreativas'];
    $servicio_agregar = $_POST['servicio_agregar'];
    $precios_accesibles = $_POST['precios_accesibles'];
    $razon_precio = isset($_POST['razon_precio']) ? $_POST['razon_precio'] : NULL;
    $informacion_suficiente = $_POST['informacion_suficiente'];
    $razon_informacion = isset($_POST['razon_informacion']) ? $_POST['razon_informacion'] : NULL;

    // Insertar datos en la base de datos
    $sql = "INSERT INTO encuestas (puntuacion_proyecto, opinion_version, ideas_aportar, actividades_recreativas, servicio_agregar, precios_accesibles, razon_precio, informacion_suficiente, razon_informacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("issssssss", $puntuacion_proyecto, $opinion_version, $ideas_aportar, $actividades_recreativas, $servicio_agregar, $precios_accesibles, $razon_precio, $informacion_suficiente, $razon_informacion);

    if ($stmt->execute()) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }

    $stmt->close();
}

$conexion->close();

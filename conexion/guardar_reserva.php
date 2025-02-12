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

// Verificar que se está recibiendo una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $dni = $_POST['dni'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $numeroHabitacion = $_POST['numeroHabitacion'];
    $tipoHabitacion = $_POST['tipoHabitacion'];
    $fechaInicio = $_POST['fechaInicio'];
    $fechaFin = $_POST['fechaFin'];
    $precioSubTotal = str_replace('$', '', $_POST['precioSubTotal']);
    $precioTotal = str_replace('$', '', $_POST['precioTotal']);

    // Verificar disponibilidad de la habitación
    $sql_check = "SELECT COUNT(*) as count FROM reservas WHERE numeroHabitacion = ? AND ((fechaInicio BETWEEN ? AND ?) OR (fechaFin BETWEEN ? AND ?))";
    $stmt_check = $conexion->prepare($sql_check);
    $stmt_check->bind_param("issss", $numeroHabitacion, $fechaInicio, $fechaFin, $fechaInicio, $fechaFin);
    $stmt_check->execute();
    $stmt_check->bind_result($count);
    $stmt_check->fetch();
    $stmt_check->close();

    if ($count > 0) {
        // Habitación ocupada, devolver error al cliente
        http_response_code(400); // Bad Request
        echo json_encode(["success" => false, "message" => "La habitación $numeroHabitacion ya está ocupada para las fechas seleccionadas."]);
        exit;
    }

    // Iniciar transacción
    $conexion->begin_transaction();

    try {
        // Preparar consulta SQL para insertar reserva usando consulta preparada
        $sql = "INSERT INTO reservas (nombre, dni, telefono, correo, numeroHabitacion, tipoHabitacion, fechaInicio, fechaFin, precioSubTotal, precioTotal)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Preparar la consulta
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("sssssssssd", $nombre, $dni, $telefono, $correo, $numeroHabitacion, $tipoHabitacion, $fechaInicio, $fechaFin, $precioSubTotal, $precioTotal);

        // Ejecutar consulta
        $stmt->execute();

        // Verificar si se insertó correctamente
        if ($stmt->affected_rows > 0) {
            // Confirmar transacción si todo está bien
            $conexion->commit();
            http_response_code(200); // Todo OK
            echo json_encode(["success" => true, "message" => "Reserva guardada correctamente."]);
        } else {
            // Revertir transacción si la inserción falla
            $conexion->rollback();
            http_response_code(500); // Error del servidor
            echo json_encode(["success" => false, "message" => "Error al guardar reserva. No se pudo insertar la reserva."]);
        }
    } catch (Exception $e) {
        // Revertir transacción en caso de error
        $conexion->rollback();
        http_response_code(500); // Error del servidor
        echo json_encode(["success" => false, "message" => "Error al guardar reserva: " . $e->getMessage()]);
    }

    // Cerrar declaración y conexión
    $stmt->close();
}

// Cerrar conexión
$conexion->close();
?>

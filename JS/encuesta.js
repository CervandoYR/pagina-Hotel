function enviarFormulario(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    var form = document.getElementById("encuestaForm");
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "conexion/guardar_encuesta.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Mostrar alerta de agradecimiento
            alert("Gracias por su opinión. La tomaremos en cuenta.");
            form.reset(); // Limpia el formulario después de enviar
        }
    };
    xhr.send(formData);

    return false; // Evita el envío del formulario múltiples veces
}

function mostrarRazon(selectElement) {
    var valor = selectElement.value;
    var razonDiv = document.getElementById("razon_" + selectElement.name);

    if (valor === "no") {
        razonDiv.style.display = "block";
    } else {
        razonDiv.style.display = "none";
    }
}

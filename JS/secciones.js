function mostrarContenido(seccion) {
    // Ocultar todas las secciones
    var secciones = document.querySelectorAll('main section');
    secciones.forEach(function (sec) {
        sec.style.display = 'none';
    });

    // Mostrar la sección especificada
    var seccionAMostrar = document.getElementById(seccion);
    if (seccionAMostrar) {
        seccionAMostrar.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarContenido('habitaciones'); // Mostrar por defecto la sección "habitaciones"
});
document.addEventListener('DOMContentLoaded', () => {
    const habitaciones = document.querySelectorAll('.habitacion');

    // Iterar sobre cada habitación para aplicar estado inicial
    habitaciones.forEach(habitacion => {
        const estado = habitacion.dataset.estado;

        // Aplicar clases y texto según el estado de la habitación
        if (estado === 'Ocupado') {
            habitacion.classList.add('ocupada');
            habitacion.textContent = 'Ocupado';
        } else {
            habitacion.classList.add('disponible');
        }

        // Agregar listener de clic para manejar la selección de habitaciones
        habitacion.addEventListener('click', handleHabitacionClick);
    });

    // Lógica para cerrar el modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('modalReserva').style.display = 'none';
        resetearSeleccionHabitacion();
    });

    // Listeners para actualizar precios al cambiar tipo de habitación o fechas
    document.getElementById('tipoHabitacion').addEventListener('change', actualizarPrecioSubTotal);
    document.getElementById('fechaInicio').addEventListener('change', calcularPrecioTotal);
    document.getElementById('fechaFin').addEventListener('change', calcularPrecioTotal);

    // Validar y enviar formulario de reserva
    document.getElementById('reservaForm').addEventListener('submit', event => {
        event.preventDefault();
        const errores = validarFormulario();
        if (errores.length === 0) {
            enviarFormularioReserva();
        } else {
            mostrarErrores(errores);
        }
    });
});

// Función para manejar clic en una habitación
function handleHabitacionClick(event) {
    const habitacion = event.currentTarget;
    if (habitacion.classList.contains('ocupada')) {
        alert('Esta habitación ya está ocupada. Por favor, elige otra habitación.');
        return;
    }
    document.getElementById('modalReserva').style.display = 'block';
    document.getElementById('numeroHabitacion').value = habitacion.dataset.numero;
    document.getElementById('tipoHabitacion').value = habitacion.dataset.tipo;
    actualizarPrecioSubTotal();
}

// Función para resetear la selección de habitación al cerrar el modal
function resetearSeleccionHabitacion() {
    document.getElementById('reservaForm').reset();
}

// Función para validar el formulario de reserva
function validarFormulario() {
    const errores = [];
    const dni = document.getElementById('dni').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    if (!/^\d{8}$/.test(dni)) errores.push("El DNI debe tener 8 dígitos y no contener letras.");
    if (!/^[a-zA-Z\s]+$/.test(nombre)) errores.push("El nombre debe contener solo letras.");
    if (!/^\d{9}$/.test(telefono)) errores.push("El teléfono debe tener 9 dígitos y no contener letras.");

    return errores;
}

// Función para mostrar errores de validación
function mostrarErrores(errores) {
    errores.forEach(error => {
        alert(error);
    });
}

// Precios de las habitaciones por tipo
const preciosHabitaciones = {
    individual: 100,
    doble: 150,
    suite: 250,
    promocion_individual_internet: 130,
    promocion_individual_cable_internet: 145,
    premium: 300,
    promocion_doble_internet: 180
};

// Actualizar subtotal según el tipo de habitación seleccionada
function actualizarPrecioSubTotal() {
    const tipoHabitacion = document.getElementById('tipoHabitacion').value;
    const precioSubTotal = preciosHabitaciones[tipoHabitacion] || '';
    document.getElementById('precioSubTotal').value = precioSubTotal ? `$${precioSubTotal.toFixed(2)}` : '';
}

// Calcular precio total según fechas y tipo de habitación
function calcularPrecioTotal() {
    const tipoHabitacion = document.getElementById('tipoHabitacion').value;
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);

    if (fechaInicio && fechaFin && fechaInicio <= fechaFin && tipoHabitacion) {
        // Calcular la diferencia de días correctamente
        const diferenciaDias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
        const precioPorNoche = preciosHabitaciones[tipoHabitacion];
        const precioTotal = precioPorNoche * diferenciaDias;
        document.getElementById('precioTotal').value = `$${precioTotal.toFixed(2)}`;
    } else {
        document.getElementById('precioTotal').value = '';
    }
}

// Enviar formulario de reserva al servidor
function enviarFormularioReserva() {
    const form = document.getElementById('reservaForm');
    const formData = new FormData(form);

    fetch('conexion/guardar_reserva.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Reserva realizada con éxito.');
                form.reset();
                document.getElementById('modalReserva').style.display = 'none';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            alert('Ocurrió un error al enviar la reserva: ' + error);
        });
}

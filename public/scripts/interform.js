
// Función para mostrar u ocultar el campo "¿Indique cuales?" según la opción seleccionada
function mostrarServiciosNubeDetalles() {
    var serviciosNube = document.querySelector('input[name="serviciosNube"]:checked').value;
    var serviciosNubeDetalles = document.getElementById("serviciosNubeDetalles");

    if (serviciosNube === "si") {
        serviciosNubeDetalles.style.display = "block";
    } else {
        serviciosNubeDetalles.style.display = "none";
    }
}

const sedeSi = document.getElementById('sedeSi');
const cantidadSedesDiv = document.getElementById('cantidadSedesDiv');
const masDeUnFirewallDiv = document.getElementById('masDeUnFirewallDiv');

sedeSi.addEventListener('change', function () {
    if (sedeSi.checked) {
        cantidadSedesDiv.style.display = 'block';
        mostrarFirewall();
    }
});

const sedeNo = document.getElementById('sedeNo');

sedeNo.addEventListener('change', function () {
    if (sedeNo.checked) {
        cantidadSedesDiv.style.display = 'none';
        masDeUnFirewallDiv.style.display = 'none';
    }
});

function mostrarFirewall() {
    var cantidadSedes = document.getElementById("cantidadSedes").value;
    if (cantidadSedes >= 2) {
        masDeUnFirewallDiv.style.display = 'block';
    } else {
        masDeUnFirewallDiv.style.display = 'none';
    }
}

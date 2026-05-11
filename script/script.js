console.log('Hola Mundo')

let automovil = {
    descripcion: "El SUV definitivo para la familia moderna, combinando seguridad de vanguardia con un diseño aerodinámico y espacio interior optimizado.",
    caracteristicas: [
        "Sistema de asistencia en pendiente (HSA)",
        "Seis airbags de cortina y frontales",
        "Anclajes ISOFIX para sillas infantiles",
        "Conectividad inalámbrica para smartphones"
    ],
    AñosGarantia: 5,
    NumPasajeros: 5,
    Motor: "2.0L Dynamic Force de 170 HP",
    Rendimiento: "14.5 km/L mixto",
    Procedencia: "Japón",

    colores: [
        "Rojo",
        "Blanco",
        "Negro",
        "Gris"
    ],

    adicionales: [
        "Neblineros",
        "Portaequipaje",
        "Cinturones / Arnés para mascotas",
        "Luces LED",
        "Cámara trasera con visión 360°"
    ],

    precioBase: 5000000
}

let listaColores = document.getElementById('colores');

automovil.colores.forEach(elemento => {
    let option = document.createElement('option');
    option.textContent = elemento;
    listaColores.appendChild(option);
});

let listaCaracteristicas = document.getElementById('caracteristicas');

automovil.caracteristicas.forEach(elemento => {
    let li = document.createElement('li');
    li.textContent = elemento;
    listaCaracteristicas.appendChild(li);
});

let listaAdicionales = document.getElementById('adicionales')
automovil.adicionales.forEach(elemento => {
    let option = document.createElement('option');
    option.textContent = elemento;
    listaAdicionales.appendChild(option);
});


document.getElementById('precio').textContent = automovil.precioBase
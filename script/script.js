const automovil = {
    nombre: "Toyota Corolla Cross 2024",
    descripcion: "El SUV definitivo para la familia moderna, combinando seguridad de vanguardia con un diseño aerodinámico y espacio interior optimizado.",
    caracteristicas: [
        "Sistema de asistencia en pendiente (HSA)",
        "Seis airbags de cortina y frontales",
        "Anclajes ISOFIX para sillas infantiles",
        "Conectividad inalámbrica para smartphones"
    ],
    aniosGarantia: 5,
    numPasajeros: 5,
    motor: "2.0L Dynamic Force de 170 HP",
    rendimiento: "14.5 km/L mixto",
    procedencia: "Japón",
    colores: [
        { nombre: "Blanco", precio: 0, codigo: "#FFFFFF", imagen: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1000" },
        { nombre: "Negro", precio: 800000, codigo: "#1a1a1a", imagen: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" },
        { nombre: "Rojo", precio: 400000, codigo: "#b91c1c", imagen: "https://images.unsplash.com/photo-1542362567-b055002b91f4?auto=format&fit=crop&q=80&w=1000" }
    ],
    adicionales: [
        { nombre: "Neblineros", precio: 80000 },
        { nombre: "Portaequipaje", precio: 350000 },
        { nombre: "Cinturones y arnés para mascotas", precio: 50000 },
        { nombre: "Luces LED", precio: 70000 },
        { nombre: "Cámara trasera", precio: 100000 }
    ],
    precioBase: 5000000
};

const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(valor);
};

const inicializarPagina = () => {
    const elNombre = document.getElementById('nombre-vehiculo');
    const elDescripcion = document.getElementById('descripcion-vehiculo');
    const elListaCaracteristicas = document.getElementById('lista-caracteristicas');
    const elSelectorColores = document.getElementById('selector-colores-visual');
    const elSelectorAdicionales = document.getElementById('selector-adicionales');
    const elPrecioTotal = document.getElementById('precio-total');
    const elPrecioBase = document.getElementById('precio-base');
    const elFichaTecnica = document.getElementById('ficha-tecnica');
    const elImagen = document.getElementById('imagen-referencia');

    elNombre.textContent = automovil.nombre;
    elDescripcion.textContent = automovil.descripcion;
    elPrecioBase.textContent = formatearMoneda(automovil.precioBase);
    elPrecioTotal.textContent = formatearMoneda(automovil.precioBase);
    elImagen.src = automovil.colores[0].imagen;

    const datosFicha = [
        { etiqueta: 'Motor', valor: automovil.motor },
        { etiqueta: 'Rendimiento', valor: automovil.rendimiento },
        { etiqueta: 'Pasajeros', valor: automovil.numPasajeros },
        { etiqueta: 'Garantía', valor: `${automovil.aniosGarantia} años` },
        { etiqueta: 'Procedencia', valor: automovil.procedencia }
    ];

    datosFicha.forEach(dato => {
        const columna = document.createElement('div');
        columna.className = 'col-6 col-sm-4';
        const contenedor = document.createElement('div');
        contenedor.className = 'p-2 border rounded bg-light text-center contenedor-ficha';
        const etiqueta = document.createElement('div');
        etiqueta.className = 'fw-bold text-uppercase text-muted etiqueta-ficha';
        etiqueta.textContent = dato.etiqueta;
        const valor = document.createElement('div');
        valor.className = 'text-dark';
        valor.textContent = dato.valor;
        contenedor.appendChild(etiqueta);
        contenedor.appendChild(valor);
        columna.appendChild(contenedor);
        elFichaTecnica.appendChild(columna);
    });

    automovil.caracteristicas.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center gap-3';
        li.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle text-primary" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
            </svg>
            <span>${item}</span>
        `;
        elListaCaracteristicas.appendChild(li);
    });

    automovil.colores.forEach((color, index) => {
        const div = document.createElement('div');
        div.className = 'color-picker-item';
        div.innerHTML = `
            <input type="radio" name="color-vehiculo" id="color-${index}" value="${color.precio}" ${index === 0 ? 'checked' : ''}>
            <label for="color-${index}" class="color-circle" style="background-color: ${color.codigo}" title="${color.nombre}"></label>
        `;
        
        div.querySelector('input').addEventListener('change', () => {
            elImagen.style.opacity = '0';
            setTimeout(() => {
                elImagen.src = color.imagen;
                elImagen.style.opacity = '1';
            }, 200);
            actualizarPrecioTotal();
        });
        
        elSelectorColores.appendChild(div);
    });

    const opcionPorDefecto = document.createElement('option');
    opcionPorDefecto.value = "0";
    opcionPorDefecto.textContent = "Ninguno";
    elSelectorAdicionales.appendChild(opcionPorDefecto);

    automovil.adicionales.forEach(extra => {
        const opcion = document.createElement('option');
        opcion.value = extra.precio;
        opcion.textContent = `${extra.nombre} (+${formatearMoneda(extra.precio)})`;
        elSelectorAdicionales.appendChild(opcion);
    });

    const actualizarPrecioTotal = () => {
        const colorSeleccionado = document.querySelector('input[name="color-vehiculo"]:checked');
        const precioColor = parseInt(colorSeleccionado.value) || 0;
        const precioAdicional = parseInt(elSelectorAdicionales.value) || 0;
        const total = automovil.precioBase + precioColor + precioAdicional;
        elPrecioTotal.textContent = formatearMoneda(total);
    };

    elSelectorAdicionales.addEventListener('change', actualizarPrecioTotal);
    actualizarPrecioTotal();
};

document.addEventListener('DOMContentLoaded', inicializarPagina);
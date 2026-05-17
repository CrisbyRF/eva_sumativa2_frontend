const automovil = {
    nombre: "Mazda 3 Hatchback 2024",
    descripcion: "El hatchback que redefine el dinamismo y el estilo deportivo. Con su silueta esculpida y un rendimiento ágil, el Mazda 3 Hatchback ofrece una experiencia de conducción emocionante y sofisticada.",
    caracteristicas: [
        "Sistema de sonido Premium Bose® de 12 parlantes",
        "Pantalla activa de conducción (Head-up Display)",
        "Control de crucero por radar de Mazda (MRCC)",
        "Faros LED adaptativos con nivelación automática"
    ],
    aniosGarantia: 3,
    numPasajeros: 5,
    motor: "2.0L Skyactiv-G de 153 HP",
    rendimiento: "14.8 km/L mixto",
    procedencia: "Japón",
    colores: [
        { nombre: "Blanco", precio: 0, codigo: "#FFFFFF", imagen: "imagenes/mazda-blanco.webp" },
        { nombre: "Negro", precio: 800000, codigo: "#1a1a1a", imagen: "imagenes/mazda-negro.webp" },
        { nombre: "Rojo", precio: 400000, codigo: "#b91c1c", imagen: "imagenes/mazda-rojo.webp" }
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
    return "$" + valor.toLocaleString('es-CL');
};

const inicializarPagina = () => {
    const elNombre = document.getElementById('nombre-vehiculo');
    const elDescripcion = document.getElementById('descripcion-vehiculo');
    const elListaCaracteristicas = document.getElementById('lista-caracteristicas');
    const elSelectorColores = document.getElementById('selector-colores-visual');
    const elSelectorAdicionales = document.getElementById('selector-adicionales');
    const elPrecioTotal = document.getElementById('precio-total');

    const elFichaTecnica = document.getElementById('ficha-tecnica');
    const elImagen = document.getElementById('imagen-referencia');

    elNombre.textContent = automovil.nombre;
    elDescripcion.textContent = automovil.descripcion;

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

    automovil.caracteristicas.forEach(caracteristica => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center gap-3';
        li.innerHTML = `
            <i class="bi bi-check2-circle text-primary"></i>
            <span>${caracteristica}</span>
        `;
        elListaCaracteristicas.appendChild(li);
    });

    automovil.colores.forEach((color, indice) => {
        const div = document.createElement('div');
        div.className = 'item-selector-color';
        div.innerHTML = `
            <input type="radio" name="color-vehiculo" id="color-${indice}" value="${color.precio}" ${indice === 0 ? 'checked' : ''}>
            <label for="color-${indice}" class="circulo-color" style="background-color: ${color.codigo}" title="${color.nombre}"></label>
        `;

        div.querySelector('input').addEventListener('change', () => {
            elImagen.src = color.imagen;
            actualizarPrecioTotal();
        });

        elSelectorColores.appendChild(div);
    });

    const opcionPorDefecto = document.createElement('option');
    opcionPorDefecto.value = "0";
    opcionPorDefecto.textContent = "Ninguno";
    elSelectorAdicionales.appendChild(opcionPorDefecto);

    automovil.adicionales.forEach(adicional => {
        const opcion = document.createElement('option');
        opcion.value = adicional.precio;
        opcion.textContent = `${adicional.nombre} (+${formatearMoneda(adicional.precio)})`;
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

    const elLightbox = document.getElementById('lightbox');
    const elLightboxImg = document.getElementById('lightbox-img');

    const abrirLightbox = () => {
        elLightboxImg.src = elImagen.src;
        elLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const cerrarLightbox = () => {
        elLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    elImagen.addEventListener('click', abrirLightbox);
    elLightbox.addEventListener('click', cerrarLightbox);

    const elFormulario = document.getElementById('formulario-venta');
    const modalResumen = new bootstrap.Modal(document.getElementById('modalResumen'));

    elFormulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const entradaColor = document.querySelector('input[name="color-vehiculo"]:checked');
        const colorNombre = entradaColor.nextElementSibling.title;

        const selectorAdicional = elSelectorAdicionales;
        const textoAdicional = selectorAdicional.options[selectorAdicional.selectedIndex].text;
        const precioAdicional = parseInt(selectorAdicional.value);

        const precioColor = parseInt(entradaColor.value) || 0;
        const total = automovil.precioBase + precioColor + precioAdicional;

        document.getElementById('resumen-color').textContent = colorNombre;
        document.getElementById('resumen-adicionales').innerHTML = precioAdicional > 0 ?
            `<div class="d-flex justify-content-between"><span>${textoAdicional.split(' (+')[0]}</span> <span class="text-dark">${formatearMoneda(precioAdicional)}</span></div>` :
            '<span class="text-muted">Ninguno</span>';
        document.getElementById('resumen-total').textContent = formatearMoneda(total);

        modalResumen.show();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarLightbox();
        }
    });
};


document.addEventListener('DOMContentLoaded', inicializarPagina);




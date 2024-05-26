/*validacion de formulario*/
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); //Con esto evitamos el envío del formulario hasta que se valide
    if (validarFormulario()) {
        mostrarDatosEnTabla();
        alert("Su formulario ha sido enviado correctamente.");
        this.submit();
    }
});

function validarFormulario() {
    let esValido = true;

    // Validar nombre completo, verifica si el campo de nombre completo está vacío y muestra un mensaje de error 
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const errorNombreCompleto = document.getElementById('error-nombreCompleto');
    if (nombreCompleto === "") {
        errorNombreCompleto.textContent = "El nombre completo es obligatorio.";
        errorNombreCompleto.style.display = 'block';//Para que muestre el mensaje en pantalla//
        esValido = false;
    } else {
        errorNombreCompleto.textContent = "";
        errorNombreCompleto.style.display = 'none';//para ocultar el mensaje
    }

    // Validar email
    const email = document.getElementById('email').value.trim();//trim elimina los espacios al principio y al final
    const errorEmail = document.getElementById('error-email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//expresion regular para corroborar que tenga un formato valido
    if (email === "") {
        errorEmail.textContent = "El email es obligatorio.";
        errorEmail.style.display = 'block';
        esValido = false;
    } else if (!regexEmail.test(email)) {
        errorEmail.textContent = "El email no es válido.";
        errorEmail.style.display = 'block';
        esValido = false;
    } else {
        errorEmail.textContent = "";
        errorEmail.style.display = 'none'; 
    }

    // Validar telefono
    const telefono = document.getElementById('telefono').value.trim();
    const errorTelefono = document.getElementById('error-telefono');
    const regexTelefono = /^[0-9]{10}$/;
    if (telefono === "") {
        errorTelefono.textContent = "El teléfono es obligatorio.";
        errorTelefono.style.display = 'block';
        esValido = false;
    } else if (!regexTelefono.test(telefono)) {
        errorTelefono.textContent = "El teléfono no es válido. Debe contener 10 dígitos.";
        errorTelefono.style.display = 'block';
        esValido = false;
    } else {
        errorTelefono.textContent = "";
        errorTelefono.style.display = 'none'; 
    }
    
    // Validar select de provincias
    const selectProvincias = document.getElementById('selectProvincias');
    const errorSelectProvincias = document.getElementById('error-selectProvincias');
    if (selectProvincias.value === "Elige una provincia") {
        errorSelectProvincias.textContent = "Debe seleccionar una provincia.";
        errorSelectProvincias.style.display = 'block';
        esValido = false;
    } else {
        errorSelectProvincias.textContent = "";
        errorSelectProvincias.style.display = 'none';
    }

//validar checkbox
    
    const checkbox = document.getElementById('check');
    const errorCheck = document.getElementById('error-check');
    
    if (!checkbox.checked) {
        errorCheck.textContent = "Debe confirmar que no es un robot.";
        errorCheck.style.display = 'block';
        esValido = false;
    } else {
        errorCheck.textContent = "";
        errorCheck.style.display = 'none';
    }

    return esValido;
}


//mostrar datos

function mostrarDatosEnTabla() {
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const provincia = document.getElementById('selectProvincias').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    const tabla = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    const celdaNombre = nuevaFila.insertCell(0);
    const celdaEmail = nuevaFila.insertCell(1);
    const celdaTelefono = nuevaFila.insertCell(2);
    const celdaProvincia = nuevaFila.insertCell(3);
    const celdaMensaje = nuevaFila.insertCell(4);

    celdaNombre.textContent = nombreCompleto;
    celdaEmail.textContent = email;
    celdaTelefono.textContent = telefono;
    celdaProvincia.textContent = provincia;
    celdaMensaje.textContent = mensaje;
}
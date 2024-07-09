const { createApp } = Vue;

createApp({
    data() {
        return {
            form: {
                nombre: "",
                email: "",
                password: ""
            }
        };
    },
    methods: {
        registro() {
            fetch("https://nonoluigi.pythonanywhere.com/usuarios_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "nombre": this.form.nombre,
                    "email": this.form.email,
                    "contraseña": this.form.password,
                    "rol": 0  // Asumiendo que 'rol' es equivalente a 'isAdmin'
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la creación del usuario');
                }
                return response.json();
            })
            .then(data => {
                alert(`Email ${data.email} creado exitosamente.`);
            })
            .catch(reason => {
                alert(`Error al enviar la información, error: ${reason}`);
            });
        },
        login() {
            fetch(`https://nonoluigi.pythonanywhere.com/usuarios_info/${this.form.email}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Usuario no encontrado');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.contraseña === this.form.password) {
                        localStorage.setItem("auth", data.email);
                        localStorage.setItem("isAdmin", data.rol === 1 ? "true" : "false");
                        if (data.rol === 1) {
                            location.href = "/index_adm.html"; // Redirigir a CRUD si es administrador
                        } else {
                            location.href = "/carrito.html"; // Redirigir a la página de usuario si no es administrador
                        }
                    } else {
                        alert("Contraseña incorrecta");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al iniciar sesión');
                });
        }
    }
}).mount('#app');
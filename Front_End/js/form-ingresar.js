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
            console.log("Verificando existencia del usuario:", this.form.email);
            fetch(`https://nonoluigi.pythonanywhere.com/usuarios_info/${this.form.email}`)
                .then(response => {
                    if (response.ok) {
                        throw new Error('Usuario ya existe');
                    } else {
                        return this.crearUsuario();
                    }
                })
                .catch(error => {
                    console.log('Error en la verificación del usuario:', error);
                    alert('El usuario ya existe');
                });
        },
        crearUsuario() {
            console.log("Enviando datos de registro:", this.form);
            fetch("https://nonoluigi.pythonanywhere.com/usuarios_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "nombre": this.form.nombre,
                    "email": this.form.email,
                    "contraseña": this.form.password,
                    "rol": 4  // Asumiendo que 'rol' es equivalente a 'isAdmin'
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.log("Error en la respuesta del servidor:", response);
                    throw new Error('Error en la creación del usuario');
                }
                return response.json();
            })
            .then(data => {
                console.log("Respuesta del servidor:", data);
                alert(`Email ${data.email} creado exitosamente.`);
            })
            .catch(reason => {
                console.log("Error en el fetch:", reason);
                alert(`Error al enviar la información, error: ${reason}`);
            });
        },
        login() {
            console.log("Iniciando sesión con:", this.form);
            fetch(`https://nonoluigi.pythonanywhere.com/usuarios_info`)
                .then(response => {
                    if (!response.ok) {
                        console.log("Error en la respuesta del servidor:", response);
                        throw new Error('Error en la autenticación');
                    }
                    return response.json();
                })
                .then(users => {
                    console.log("Usuarios encontrados:", users);
                    // Filtrar usuarios por email
                    const filteredUsers = users.filter(user => user.email === this.form.email);
                    
                    // Encontrar usuario con contraseña coincidente
                    const user = filteredUsers.find(user => user.contraseña === this.form.password);
                    
                    if (user) {
                        console.log("Usuario autenticado:", user);
        
                        // Redirigir según el rol del usuario
                        if (user.rol === 1) {
                            location.href = "/index_adm.html"; // Redirigir a CRUD si es administrador
                        } else {
                            location.href = "/carrito.html"; // Redirigir a la página de usuario si no es administrador
                        }
                        
                        alert(`Bienvenido ${user.nombre}`);
                    } else {
                        throw new Error('Credenciales incorrectas');
                    }
                })
                .catch(reason => {
                    console.log("Error en el fetch:", reason);
                    alert(`Error al iniciar sesión, error: ${reason}`);
                });
        }
        
    }
}).mount("#app");
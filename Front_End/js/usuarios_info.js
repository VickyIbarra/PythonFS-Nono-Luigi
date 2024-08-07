const { createApp } = Vue
  createApp({
    data() {
      return {
        usuarios:[],
        url:'https://nonoluigi.pythonanywhere.com/usuarios_info', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        //url:'http://mcerda.pythonanywhere.com/usuarios',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"",
        email:"",
        contraseña:"",
        rol:0,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let usuario = {
                nombre:this.nombre,
                email: this.email,
                contraseña: this.contraseña,
                rol: this.rol
            }
            var options = {
                body:JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./usuarios_info.html";       
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al grabar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
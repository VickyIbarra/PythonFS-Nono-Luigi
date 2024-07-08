console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        email:"",
        contraseña:"",
        rol:0,
        url:'http://localhost:5000/usuarios_info/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.email=data.email
                    this.contraseña=data.contraseña
                    this.rol=data.rol 
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let usuario = {
                nombre:this.nombre,
                email: this.email,
                contraseña: this.contraseña,
                rol: this.rol
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./usuarios_info.html";       
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
    
  }).mount('#app')

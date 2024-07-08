const { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        url:'https://nonoluigi.pythonanywhere.com/productos_info', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        //url:'http://mcerda.pythonanywhere.com/productos',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        stock:0,
        codigo:"",
        precio:0,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
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
            let producto = {
                nombre:this.nombre,
                precio: this.precio,
                stock: this.stock,
                codigo: this.nombre+this.precio,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
            .then(response => response.json())
            .then(data => {
                    // Ahora que tenemos el ID del producto, actualizamos el código
                    producto.codigo = data.id + this.nombre + this.precio;
                
                // Actualizamos el producto en el servidor
                var updateOptions = {
                    body: JSON.stringify(producto),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
                fetch(this.url + '/' + data.id, updateOptions)
                    .then(() => {
                        alert("Registro grabado")
                        window.location.href = "./productos_info.html";  // recarga productos.html
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al actualizar el registro")  // puedo mostrar el error también
                    })
            })
            .catch(err => {
                console.error(err);
                alert("Error al grabar")  // puedo mostrar el error también
            })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
    
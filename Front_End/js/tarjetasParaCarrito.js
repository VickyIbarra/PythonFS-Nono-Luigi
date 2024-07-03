/* Para hacer las tarjetas con el JSON */

const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      url: "./carrito.json",  // Asegúrate de que la ruta sea correcta
      datos: [],
      error: false,
    }
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log("Datos obtenidos:", data)  // Verifica los datos obtenidos
          this.datos = data
        })
        .catch(error => {
          console.error("Error al obtener los datos:", error)
          this.error = true
        });
    },
  
  agregarAlCarrito(elemento) {
    console.log("Agregando producto al carrito:", elemento);  // Verifica el producto a agregar
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productoEnCarrito = carrito.find(item => item.id === elemento.id);
  
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      const nuevoProducto = { ...elemento, cantidad: 1 };
      carrito.push(nuevoProducto);
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log("Carrito actualizado:", carrito);  // Verifica el carrito actualizado
    this.actualizarContadorCarrito();
  },
   actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('cuenta-carrito').innerText = totalItems;
  }
},
    created() {
      this.fetchData(this.url);
      this.actualizarContadorCarrito();
      }
}).mount('#app');

 

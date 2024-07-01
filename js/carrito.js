function agregarAlCarrito(producto){
    const memoria =localStorage.getItem("pastas");
    console.log(memoria);
    if(!memoria){
        const nuevoProducto = producto;
        nuevoProducto.cantidad= 1;
        localStorage.setItem("pastas",JSON.stringify[nuevoProducto]);
    }
}
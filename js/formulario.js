/*consumo API*/
const d = document;
const selectProv= d.getElementById("selectProvincias");

function provincia(){
    fetch( "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
    .then(res => res.ok ? res.json(): Promise.reject(res))
    .then(json => {
        let opciones = `<option value="Elige una provincia"> Elige una provincia</option> `

        json.provincias.forEach(el => opciones += `<option value="${el.nombre}">${el.nombre}</option> `);
            
        selectProv.innerHTML = opciones;
        });
            
}
    
    


d.addEventListener("DOMContentLoaded",provincia)
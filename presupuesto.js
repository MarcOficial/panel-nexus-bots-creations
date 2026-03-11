const url = new URLSearchParams(window.location.search);
const id = url.get("id");

let presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

let p = presupuestos.find(x => x.numero == id);

document.getElementById("datos").innerHTML = `

<h2>Presupuesto #${p.numero}</h2>

Cliente: ${p.cliente}<br>
Servicio: ${p.servicio}<br>
Precio: €${p.precio}<br>
Descripción: ${p.descripcion}

`;

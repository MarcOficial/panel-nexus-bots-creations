let presupuestos = [];

document.getElementById("presupuestoForm").addEventListener("submit", function(e){

e.preventDefault();

let cliente = document.getElementById("cliente").value;
let discord = document.getElementById("discord").value;
let servicio = document.getElementById("servicio").value;
let descripcion = document.getElementById("descripcion").value;
let precio = document.getElementById("precio").value;

let presupuesto = {
cliente,
discord,
servicio,
descripcion,
precio
};

presupuestos.push(presupuesto);

mostrarPresupuestos();

this.reset();

});

function mostrarPresupuestos(){

let lista = document.getElementById("lista");
lista.innerHTML="";

presupuestos.forEach(p =>{

let li = document.createElement("li");

li.innerHTML = `
<strong>${p.cliente}</strong> - ${p.servicio} - €${p.precio}
<br>
${p.descripcion}
`;

lista.appendChild(li);

});

}

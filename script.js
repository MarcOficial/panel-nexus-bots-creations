const { jsPDF } = window.jspdf;

// cargar presupuestos guardados
let presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];


// cambiar páginas del panel
function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display = "none";
});

document.getElementById(page).style.display = "block";

actualizar();

}

showPage("dashboard");


// crear presupuesto
document.getElementById("form").addEventListener("submit", function(e){

e.preventDefault();

let cliente = document.getElementById("cliente").value;
let discord = document.getElementById("discord").value;
let servicio = document.getElementById("servicio").value;
let descripcion = document.getElementById("descripcion").value;
let precio = document.getElementById("precio").value;

// número automático
let numero = presupuestos.length + 1;

let presupuesto = {

numero,
cliente,
discord,
servicio,
descripcion,
precio

};

presupuestos.push(presupuesto);

// guardar JSON
localStorage.setItem("presupuestos", JSON.stringify(presupuestos));

this.reset();

alert("Presupuesto creado correctamente");

actualizar();

showPage("lista");

});


// actualizar dashboard y lista
function actualizar(){

let total = document.getElementById("total");

if(total){
total.innerText = presupuestos.length;
}

let cont = document.getElementById("presupuestos");

if(!cont) return;

cont.innerHTML = "";

presupuestos.forEach(p => {

let div = document.createElement("div");

div.className = "presupuesto";

div.innerHTML = `

<h3>Presupuesto #${p.numero}</h3>

Cliente: ${p.cliente}<br>
Servicio: ${p.servicio}<br>
Precio: €${p.precio}<br><br>

<button onclick="exportPDF(${p.numero})">Exportar PDF</button>

`;

cont.appendChild(div);

});

}


// exportar presupuesto a PDF con logo
function exportPDF(numero){

let p = presupuestos.find(x => x.numero == numero);

let doc = new jsPDF();

// cargar logo
let img = new Image();
img.src = "nexus-bots-creations.png";

img.onload = function(){

doc.addImage(img, "PNG", 20, 10, 50, 20);

doc.setFontSize(18);
doc.text("Presupuesto #" + p.numero, 20, 40);

doc.setFontSize(12);

doc.text("Cliente: " + p.cliente, 20, 60);
doc.text("Discord: " + p.discord, 20, 70);
doc.text("Servicio: " + p.servicio, 20, 80);
doc.text("Descripción: " + p.descripcion, 20, 90);
doc.text("Precio: €" + p.precio, 20, 100);

doc.text("Empresa: Nexus Bots Creations", 20, 120);
doc.text("Pago: PayPal / Robux", 20, 130);

doc.save("presupuesto-" + p.numero + ".pdf");

};

}

actualizar();

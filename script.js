const { jsPDF } = window.jspdf;

let presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display="none";
});

document.getElementById(page).style.display="block";

actualizar();

}

showPage("dashboard");

document.getElementById("form").addEventListener("submit",function(e){

e.preventDefault();

let cliente=document.getElementById("cliente").value;
let discord=document.getElementById("discord").value;
let servicio=document.getElementById("servicio").value;
let descripcion=document.getElementById("descripcion").value;
let precio=document.getElementById("precio").value;

let numero=presupuestos.length+1;

let presupuesto={

numero,
cliente,
discord,
servicio,
descripcion,
precio

};

presupuestos.push(presupuesto);

localStorage.setItem("presupuestos",JSON.stringify(presupuestos));

this.reset();

alert("Presupuesto creado");

actualizar();

showPage("lista");

});

function actualizar(){

document.getElementById("total").innerText=presupuestos.length;

let cont=document.getElementById("presupuestos");

if(!cont)return;

cont.innerHTML="";

presupuestos.forEach(p=>{

let div=document.createElement("div");

div.className="presupuesto";

div.innerHTML=`

<h3>Presupuesto #${p.numero}</h3>

Cliente: ${p.cliente}<br>
Servicio: ${p.servicio}<br>
Precio: €${p.precio}<br><br>

<button onclick="exportPDF(${p.numero})">Exportar PDF</button>

`;

cont.appendChild(div);

});

}

function exportPDF(numero){

let p=presupuestos.find(x=>x.numero==numero);

let doc=new jsPDF();

doc.setFontSize(20);
doc.text("Nexus Bots Creations",20,20);

doc.setFontSize(14);

doc.text("Presupuesto #"+p.numero,20,40);
doc.text("Cliente: "+p.cliente,20,50);
doc.text("Discord: "+p.discord,20,60);
doc.text("Servicio: "+p.servicio,20,70);
doc.text("Descripción: "+p.descripcion,20,80);
doc.text("Precio: €"+p.precio,20,90);

doc.text("Pago: PayPal / Robux",20,110);

doc.save("presupuesto-"+p.numero+".pdf");

}

actualizar();

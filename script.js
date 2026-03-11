const { jsPDF } = window.jspdf;

document.getElementById("form").addEventListener("submit", function(e){

e.preventDefault();

let cliente = document.getElementById("cliente").value;
let discord = document.getElementById("discord").value;
let servicio = document.getElementById("servicio").value;
let descripcion = document.getElementById("descripcion").value;
let precio = document.getElementById("precio").value;

crearPDF(cliente,discord,servicio,descripcion,precio);

});

function crearPDF(cliente,discord,servicio,descripcion,precio){

let doc = new jsPDF();

doc.setFontSize(20);
doc.text("Nexus Bots Creations",20,20);

doc.setFontSize(12);

doc.text("Cliente: "+cliente,20,40);
doc.text("Discord: "+discord,20,50);
doc.text("Servicio: "+servicio,20,60);
doc.text("Descripción: "+descripcion,20,70);
doc.text("Precio: €"+precio,20,80);

doc.text("Método de pago: PayPal / Robux",20,100);

doc.save("presupuesto.pdf");

}

function exportPDF(numero){

let p = presupuestos.find(x => x.numero == numero);

let doc = new jsPDF();

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
doc.text("Método de pago: PayPal / Robux", 20, 130);

doc.save("presupuesto-" + p.numero + ".pdf");

};

}

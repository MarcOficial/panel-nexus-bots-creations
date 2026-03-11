function exportPDF(numero){

let p = presupuestos.find(x => x.numero == numero);

let doc = new jsPDF();

doc.setFontSize(22);
doc.text("Nexus Bots Creations",20,20);

doc.setFontSize(16);
doc.text("Factura / Presupuesto",20,35);

doc.line(20,40,190,40);

doc.setFontSize(12);

doc.text("Presupuesto Nº: NBC-"+p.numero,20,55);
doc.text("Cliente: "+p.cliente,20,65);
doc.text("Discord: "+p.discord,20,75);

doc.line(20,85,190,85);

doc.text("Servicio",20,100);
doc.text("Descripción",80,100);
doc.text("Precio",170,100);

doc.line(20,105,190,105);

doc.text(p.servicio,20,115);
doc.text(p.descripcion,80,115);
doc.text("€"+p.precio,170,115);

doc.line(20,140,190,140);

doc.setFontSize(14);
doc.text("TOTAL: €"+p.precio,150,160);

doc.setFontSize(10);
doc.text("Método de pago: PayPal / Robux",20,180);

doc.save("presupuesto-"+p.numero+".pdf");

}

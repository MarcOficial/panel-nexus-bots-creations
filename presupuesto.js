function cargarDatos() {
    const doc = JSON.parse(localStorage.getItem("docActual") || "null");
    if (!doc) {
        alert("No hay documento cargado.");
        return;
    }

    const cfg = JSON.parse(localStorage.getItem("configEmpresa") || "{}");

    document.getElementById("tipoDoc").innerText = doc.tipo;
    document.title = `Nexus Bots – ${doc.tipo} ${doc.numero}`;

    document.getElementById("numDoc").innerText = doc.numero;
    document.getElementById("fechaDoc").innerText = doc.fecha;

    document.getElementById("clienteNombre").innerText = doc.cliente || "";
    document.getElementById("clienteEmail").innerText = doc.email || "";
    document.getElementById("clienteTelefono").innerText = doc.telefono || "";
    document.getElementById("clienteDireccion").innerText = doc.direccion || "";

    document.getElementById("tituloProyecto").innerText = doc.titulo || "";
    document.getElementById("descripcionDoc").innerText = doc.descripcion || "";
    document.getElementById("plazoDoc").innerText = doc.plazo || "";
    document.getElementById("pagoDoc").innerText = doc.pago || "";
    document.getElementById("notasDoc").innerText = doc.notas || "";
    document.getElementById("estadoDoc").innerText = doc.estado || "Pendiente";

    document.getElementById("empresaNombre").innerText = cfg.empresa || "Nexus Bots Creations";
    document.getElementById("empresaCif").innerText = "CIF: " + (cfg.cif || "X1234567Z");
    document.getElementById("empresaDir").innerText = "Dirección: " + (cfg.direccion || "Calle Ejemplo 123, España");
    document.getElementById("empresaEmail").innerText = "Email: " + (cfg.email || "contacto@nexusbots.com");

    const tbody = document.getElementById("tablaItemsPDF");
    tbody.innerHTML = "";

    (doc.items || []).forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.descripcion}</td>
            <td style="text-align:right;">${(item.precio || 0).toFixed(2)} €</td>
        `;
        tbody.appendChild(tr);
    });

    const subtotal = doc.subtotal || (doc.items || []).reduce((acc, i) => acc + (i.precio || 0), 0);
    const iva = doc.iva || subtotal * 0.21;
    const total = doc.total || subtotal + iva;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("iva").innerText = iva.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

function generarPDF() {
    const elemento = document.getElementById("documentoPDF");
    const doc = JSON.parse(localStorage.getItem("docActual") || "null");
    const filename = doc ? `${doc.tipo}_${doc.numero}.pdf` : "documento_nexusbots.pdf";

    const opciones = {
        margin: 10,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).save();
}

window.addEventListener("load", cargarDatos);

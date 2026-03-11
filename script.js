document.getElementById("year").innerText = new Date().getFullYear();

function showSection(section) {
    const c = document.getElementById("content");

    if (section === "dashboard") {
        c.innerHTML = `
            <div class="card">
                <h2>Dashboard</h2>
                <p>Resumen general de tu actividad.</p>
                <div class="grid">
                    <div class="card">
                        <strong>Presupuestos totales</strong>
                        <p id="dashPresupuestos">–</p>
                    </div>
                    <div class="card">
                        <strong>Facturas totales</strong>
                        <p id="dashFacturas">–</p>
                    </div>
                    <div class="card">
                        <strong>Importe facturado</strong>
                        <p id="dashImporte">– €</p>
                    </div>
                </div>
            </div>
        `;
        cargarResumen();
    }

    if (section === "nuevoPresupuesto") {
        c.innerHTML = `
            <div class="card">
                <h2>Nuevo Presupuesto</h2>
                <form id="formPresupuesto">
                    <label>Nombre del cliente</label>
                    <input type="text" name="cliente" required>

                    <label>Email del cliente</label>
                    <input type="email" name="email">

                    <label>Descripción</label>
                    <textarea name="descripcion" required></textarea>

                    <label>Precio (€)</label>
                    <input type="number" name="precio" step="0.01" required>

                    <button type="submit" class="primary">Generar PDF de Presupuesto</button>
                </form>
            </div>
        `;
        document.getElementById("formPresupuesto").addEventListener("submit", e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target).entries());
            crearDocumento("PRESUPUESTO", data);
        });
    }

    if (section === "nuevaFactura") {
        c.innerHTML = `
            <div class="card">
                <h2>Nueva Factura</h2>
                <form id="formFactura">
                    <label>Nombre del cliente</label>
                    <input type="text" name="cliente" required>

                    <label>Email del cliente</label>
                    <input type="email" name="email">

                    <label>Descripción</label>
                    <textarea name="descripcion" required></textarea>

                    <label>Precio (€)</label>
                    <input type="number" name="precio" step="0.01" required>

                    <button type="submit" class="primary">Generar PDF de Factura</button>
                </form>
            </div>
        `;
        document.getElementById("formFactura").addEventListener("submit", e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target).entries());
            crearDocumento("FACTURA", data);
        });
    }

    if (section === "historial") {
        c.innerHTML = `
            <div class="card">
                <h2>Historial</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Número</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody id="tablaHistorial"></tbody>
                </table>
            </div>
        `;
        cargarHistorial();
    }

    if (section === "config") {
        c.innerHTML = `
            <div class="card">
                <h2>Configuración de empresa</h2>
                <form id="formConfig">
                    <label>Nombre de la empresa</label>
                    <input type="text" name="empresa" required>

                    <label>CIF/NIF</label>
                    <input type="text" name="cif" required>

                    <label>Dirección</label>
                    <input type="text" name="direccion">

                    <label>Email</label>
                    <input type="email" name="email">

                    <button type="submit" class="primary">Guardar configuración</button>
                </form>
            </div>
        `;
        cargarConfigEnFormulario();
        document.getElementById("formConfig").addEventListener("submit", e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target).entries());
            localStorage.setItem("configEmpresa", JSON.stringify(data));
            alert("Configuración guardada.");
        });
    }
}

function cargarConfigEnFormulario() {
    const cfg = JSON.parse(localStorage.getItem("configEmpresa") || "{}");
    const f = document.getElementById("formConfig");
    if (!f) return;
    if (cfg.empresa) f.empresa.value = cfg.empresa;
    if (cfg.cif) f.cif.value = cfg.cif;
    if (cfg.direccion) f.direccion.value = cfg.direccion;
    if (cfg.email) f.email.value = cfg.email;
}

function cargarResumen() {
    const hist = JSON.parse(localStorage.getItem("historialDocs") || "[]");
    const presupuestos = hist.filter(h => h.tipo === "PRESUPUESTO").length;
    const facturas = hist.filter(h => h.tipo === "FACTURA").length;
    const importe = hist
        .filter(h => h.tipo === "FACTURA")
        .reduce((acc, h) => acc + Number(h.precio || 0), 0);

    document.getElementById("dashPresupuestos").innerText = presupuestos;
    document.getElementById("dashFacturas").innerText = facturas;
    document.getElementById("dashImporte").innerText = importe.toFixed(2);
}

function cargarHistorial() {
    const hist = JSON.parse(localStorage.getItem("historialDocs") || "[]");
    const tbody = document.getElementById("tablaHistorial");
    tbody.innerHTML = "";
    hist.forEach(h => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="badge ${h.tipo === "PRESUPUESTO" ? "presupuesto" : "factura"}">${h.tipo}</span></td>
            <td>${h.numero}</td>
            <td>${h.cliente}</td>
            <td>${h.fecha}</td>
            <td>${Number(h.precio).toFixed(2)} €</td>
        `;
        tbody.appendChild(tr);
    });
}

// Crear documento y abrir página de presupuesto/factura
function crearDocumento(tipo, data) {
    const numero = generarNumero(tipo);
    const fecha = new Date().toLocaleDateString("es-ES");

    const doc = {
        tipo,
        numero,
        fecha,
        cliente: data.cliente,
        email: data.email,
        descripcion: data.descripcion,
        precio: Number(data.precio)
    };

    // Guardar en historial
    const hist = JSON.parse(localStorage.getItem("historialDocs") || "[]");
    hist.push(doc);
    localStorage.setItem("historialDocs", JSON.stringify(hist));

    // Guardar documento actual para la página de PDF
    localStorage.setItem("docActual", JSON.stringify(doc));

    // Abrir página de generación de PDF
    window.open("presupuesto.html", "_blank");
}

function generarNumero(tipo) {
    const año = new Date().getFullYear();
    const clave = "contador_" + tipo;
    let n = Number(localStorage.getItem(clave) || "0") + 1;
    localStorage.setItem(clave, String(n));
    const pref = tipo === "PRESUPUESTO" ? "PB" : "FA";
    return `${pref}-${año}-${String(n).padStart(3, "0")}`;
}

// Cargar por defecto
showSection("dashboard");

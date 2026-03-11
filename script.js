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

                    <h3>Datos del Cliente</h3>

                    <label>Nombre completo</label>
                    <input type="text" name="cliente" required>

                    <label>Email</label>
                    <input type="email" name="email">

                    <label>Teléfono</label>
                    <input type="text" name="telefono">

                    <label>Dirección</label>
                    <input type="text" name="direccion">

                    <h3>Información del Proyecto</h3>

                    <label>Título del proyecto</label>
                    <input type="text" name="titulo" required>

                    <label>Descripción general</label>
                    <textarea name="descripcion" required></textarea>

                    <label>Plazo estimado de entrega</label>
                    <input type="text" name="plazo" placeholder="Ej: 7 días, 2 semanas, 1 mes">

                    <label>Método de pago</label>
                    <select name="pago">
                        <option value="PayPal">PayPal</option>
                        <option value="Robux">Robux</option>
                    </select>

                    <h3>Conceptos del Presupuesto</h3>

                    <table id="tablaItems">
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th style="width:120px;">Precio (€)</th>
                                <th style="width:60px;">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" name="item_desc[]" required></td>
                                <td><input type="number" name="item_precio[]" step="0.01" required></td>
                                <td><button type="button" class="primary" onclick="eliminarFila(this)">X</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <button type="button" class="primary" onclick="agregarFila()">Añadir concepto</button>

                    <h3>Notas adicionales</h3>
                    <textarea name="notas" placeholder="Condiciones, aclaraciones, detalles adicionales..."></textarea>

                    <h3>Estado del presupuesto</h3>
                    <select name="estado">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aceptado">Aceptado</option>
                        <option value="Rechazado">Rechazado</option>
                    </select>

                    <button type="submit" class="primary">Generar PDF de Presupuesto</button>
                </form>
            </div>
        `;

        document.getElementById("formPresupuesto").addEventListener("submit", e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const items_desc = [...document.getElementsByName("item_desc[]")].map(i => i.value);
            const items_precio = [...document.getElementsByName("item_precio[]")].map(i => Number(i.value));

            data.items = items_desc.map((desc, i) => ({
                descripcion: desc,
                precio: items_precio[i] || 0
            }));

            crearDocumento("PRESUPUESTO", data);
        });
    }

    if (section === "nuevaFactura") {
        c.innerHTML = `
            <div class="card">
                <h2>Nueva Factura</h2>

                <form id="formFactura">

                    <h3>Datos del Cliente</h3>

                    <label>Nombre completo</label>
                    <input type="text" name="cliente" required>

                    <label>Email</label>
                    <input type="email" name="email">

                    <label>Teléfono</label>
                    <input type="text" name="telefono">

                    <label>Dirección</label>
                    <input type="text" name="direccion">

                    <h3>Información de la Factura</h3>

                    <label>Concepto general</label>
                    <textarea name="descripcion" required></textarea>

                    <label>Método de pago</label>
                    <select name="pago">
                        <option value="Transferencia bancaria">Transferencia bancaria</option>
                        <option value="Bizum">Bizum</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Criptomonedas">Criptomonedas</option>
                    </select>

                    <h3>Conceptos de la Factura</h3>

                    <table id="tablaItemsFactura">
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th style="width:120px;">Precio (€)</th>
                                <th style="width:60px;">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" name="item_desc_f[]" required></td>
                                <td><input type="number" name="item_precio_f[]" step="0.01" required></td>
                                <td><button type="button" class="primary" onclick="eliminarFila(this)">X</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <button type="button" class="primary" onclick="agregarFilaFactura()">Añadir concepto</button>

                    <h3>Notas adicionales</h3>
                    <textarea name="notas" placeholder="Condiciones, aclaraciones, detalles adicionales..."></textarea>

                    <button type="submit" class="primary">Generar PDF de Factura</button>
                </form>
            </div>
        `;

        document.getElementById("formFactura").addEventListener("submit", e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const items_desc = [...document.getElementsByName("item_desc_f[]")].map(i => i.value);
            const items_precio = [...document.getElementsByName("item_precio_f[]")].map(i => Number(i.value));

            data.items = items_desc.map((desc, i) => ({
                descripcion: desc,
                precio: items_precio[i] || 0
            }));

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

function agregarFila() {
    const tbody = document.querySelector("#tablaItems tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="text" name="item_desc[]" required></td>
        <td><input type="number" name="item_precio[]" step="0.01" required></td>
        <td><button type="button" class="primary" onclick="eliminarFila(this)">X</button></td>
    `;
    tbody.appendChild(tr);
}

function agregarFilaFactura() {
    const tbody = document.querySelector("#tablaItemsFactura tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="text" name="item_desc_f[]" required></td>
        <td><input type="number" name="item_precio_f[]" step="0.01" required></td>
        <td><button type="button" class="primary" onclick="eliminarFila(this)">X</button></td>
    `;
    tbody.appendChild(tr);
}

function eliminarFila(btn) {
    const fila = btn.parentElement.parentElement;
    fila.remove();
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
        .reduce((acc, h) => acc + (h.total || 0), 0);

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
            <td>${(h.total || 0).toFixed(2)} €</td>
        `;
        tbody.appendChild(tr);
    });
}

function crearDocumento(tipo, data) {
    const numero = generarNumero(tipo);
    const fecha = new Date().toLocaleDateString("es-ES");

    const subtotal = (data.items || []).reduce((acc, i) => acc + (i.precio || 0), 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    const doc = {
        tipo,
        numero,
        fecha,
        cliente: data.cliente,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
        titulo: data.titulo,
        descripcion: data.descripcion,
        plazo: data.plazo,
        pago: data.pago,
        notas: data.notas,
        estado: data.estado,
        items: data.items || [],
        subtotal,
        iva,
        total
    };

    const hist = JSON.parse(localStorage.getItem("historialDocs") || "[]");
    hist.push(doc);
    localStorage.setItem("historialDocs", JSON.stringify(hist));

    localStorage.setItem("docActual", JSON.stringify(doc));

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

showSection("dashboard");

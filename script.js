function showSection(section) {
    const content = document.getElementById("content");

    switch(section) {
        case "dashboard":
            content.innerHTML = "<h2>Dashboard</h2><p>Resumen general del sistema.</p>";
            break;

        case "presupuesto":
            content.innerHTML = `
                <h2>Crear Presupuesto</h2>
                <form id="formPresupuesto">
                    <label>Cliente:</label><input type="text"><br>
                    <label>Descripción:</label><textarea></textarea><br>
                    <label>Precio:</label><input type="number"><br>
                    <button type="submit">Generar Presupuesto</button>
                </form>
            `;
            break;

        case "factura":
            content.innerHTML = `
                <h2>Crear Factura</h2>
                <form id="formFactura">
                    <label>Cliente:</label><input type="text"><br>
                    <label>Concepto:</label><textarea></textarea><br>
                    <label>Total:</label><input type="number"><br>
                    <button type="submit">Generar Factura</button>
                </form>
            `;
            break;

        case "historial":
            content.innerHTML = "<h2>Historial</h2><p>Aquí aparecerán facturas y presupuestos guardados.</p>";
            break;

        case "config":
            content.innerHTML = `
                <h2>Configuración</h2>
                <label>Nombre de la empresa:</label><input type="text"><br>
                <label>Dirección:</label><input type="text"><br>
                <label>NIF/CIF:</label><input type="text"><br>
                <label>Logo:</label><input type="file"><br>
            `;
            break;
    }
}

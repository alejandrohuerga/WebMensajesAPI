async function cargarChat() {
    const url = 'https://qinamical.app.n8n.cloud/webhook/mensajes'; 
    const contenedor = document.getElementById('chat');
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Limpiamos y renderizamos con el nuevo estilo de burbujas
        contenedor.innerHTML = data.map(item => `
            <div class="bubble received">
                <span class="phone-label">${item.Telefono}</span>
                <div class="text-dark">${item.Mensaje}</div>
                <div class="bubble-meta">
                    ${new Date(item.Fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                    <i class="bi bi-check2-all text-primary ms-1"></i>
                </div>
            </div>
        `).join('');

        // Auto-scroll al último mensaje
        contenedor.scrollTop = contenedor.scrollHeight;
        
    } catch (error) {
        console.error('Error al actualizar chat:', error);
        contenedor.innerHTML = `<div class="alert alert-danger m-3">Error de conexión con n8n</div>`;
    }
}

// Carga inicial
cargarChat();
// Intervalo de 10 segundos
//setInterval(cargarChat, 10000);
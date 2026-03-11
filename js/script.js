async function cargarChat() {
    // URL de tu endpoint de n8n que devuelve el JSON
    const url = 'https://qinamical.app.n8n.cloud/webhook/mensajes'; 
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Invertimos para ver el orden cronológico antiguo -> reciente
        const mensajesOrdenados = data;

        const contenedor = document.getElementById('chat');
        // Renderizamos los mensajes
        contenedor.innerHTML = mensajesOrdenados.map(item => `
            <div class="mensaje">
                <strong>${item.Telefono}:</strong> ${item.Mensaje}
                <br><span class="fecha">${item.Fecha}</span>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error al actualizar chat:', error);
    }
}

// Llama a la función una vez al cargar
cargarChat();

// Configura el temporizador para llamar a la función cada 10000ms (10 segundos)
setInterval(cargarChat, 10000);

const contenedor = document.getElementById('chat');
contenedor.scrollTop = contenedor.scrollHeight;
async function cargarChat() {
    const url = 'https://qinamical.app.n8n.cloud/webhook/mensajes'; 
    const contenedor = document.getElementById('chat');
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 1. ORDEN: Invertimos el array para que los nuevos (que vienen primero en el JSON) 
        // aparezcan al final de la lista (abajo).
        const mensajesOrdenados = [...data].reverse();

        contenedor.innerHTML = mensajesOrdenados.map(item => {
            
            // 2. HORA: Creamos la fecha. Si n8n envía "2023-10-27 10:00:00", 
            // la tratamos como UTC para que el navegador la convierta a tu hora local automáticamente.
            let fechaOriginal = new Date(item.Fecha);
            
            // Si el problema persiste y quieres RESTAR una hora fija:
            fechaOriginal.setHours(fechaOriginal.getHours() - 1);

            const horaFormateada = fechaOriginal.toLocaleTimeString('es-ES', {
                hour: '2-digit', 
                minute: '2-digit'
            });

            return `
                <div class="bubble received">
                    <span class="phone-label">${item.Telefono}</span>
                    <div class="text-dark">${item.Mensaje}</div>
                    <div class="bubble-meta">
                        ${horaFormateada} 
                        <i class="bi bi-check2-all text-primary ms-1"></i>
                    </div>
                </div>
            `;
        }).join('');

        // 3. SCROLL: Bajamos al final después de cargar los mensajes
        contenedor.scrollTo({
            top: contenedor.scrollHeight,
            behavior: 'smooth'
        });
        
    } catch (error) {
        console.error('Error al actualizar chat:', error);
    }
}

// Ejecución
cargarChat();
//setInterval(cargarChat, 10000);
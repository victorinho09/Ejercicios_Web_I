const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  mensaje = input.value;
  if (mensaje) {
    input.value = '';
    fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mensaje: mensaje,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Emitir al socket con el usuario validado del servidor
        socket.emit('chat', { user: data.user, mensaje: mensaje });
      });
  }
});

socket.on('chat', (data) => {
  const item = document.createElement('li');
  item.className = 'mb-2 p-2 bg-light rounded';
  item.innerHTML = `
    <strong class="text-primary">${data.user}:</strong>
    <span class="ms-2">${data.mensaje}</span>
  `;
  messages.appendChild(item);
  messages.parentElement.scrollTop = messages.parentElement.scrollHeight;
});

const showHistoryBtn = document.getElementById('show-history');
showHistoryBtn.addEventListener('click', () => {
  fetch('/chat/historial')
    .then((response) => response.json())
    .then((data) => {
      messages.innerHTML = '';
      if (data.length === 0) {
        messages.innerHTML =
          '<li class="text-muted text-center">No hay mensajes en el historial</li>';
      } else {
        data.forEach((msg) => {
          const item = document.createElement('li');
          item.className = 'mb-2 p-2 bg-light rounded';
          const timestamp = msg.timestamp
            ? new Date(msg.timestamp).toLocaleTimeString()
            : '';
          item.innerHTML = `
            <strong class="text-primary">${msg.user}:</strong>
            <span class="ms-2">${msg.mensaje}</span>
            ${
              timestamp
                ? `<small class="text-muted ms-2">(${timestamp})</small>`
                : ''
            }
          `;
          messages.appendChild(item);
        });
      }
    });
});

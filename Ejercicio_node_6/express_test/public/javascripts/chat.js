const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  mensaje = input.value;
  if (mensaje) {
    socket.emit('chat', { user, mensaje });
    input.value = '';
    fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: user,
        mensaje: mensaje,
      }),
    });
  }
});

socket.on('chat', (data) => {
  const item = document.createElement('li');
  item.textContent = `${data.user}: ${data.mensaje}`;
  messages.appendChild(item);
});

const showHistoryBtn = document.getElementById('show-history');
showHistoryBtn.addEventListener('click', () => {
  fetch('/chat/historial')
    .then((response) => response.json())
    .then((data) => {
      messages.innerHTML = '';
      data.forEach((msg) => {
        const item = document.createElement('li');
        item.textContent = `${msg.user}: ${msg.mensaje}`;
        messages.appendChild(item);
      });
    });
});

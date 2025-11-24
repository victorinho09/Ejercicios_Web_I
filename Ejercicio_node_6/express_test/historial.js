const fs = require('fs');
const path = require('path');

const HISTORIAL_FILE = path.join(__dirname, 'historial.json');

const historial = {
  mensajes: [],

  init() {
    try {
      if (fs.existsSync(HISTORIAL_FILE)) {
        const data = fs.readFileSync(HISTORIAL_FILE, 'utf8');
        this.mensajes = JSON.parse(data);
      }
    } catch (error) {
      console.error('Error cargando historial:', error);
      this.mensajes = [];
    }
  },

  save() {
    try {
      fs.writeFileSync(
        HISTORIAL_FILE,
        JSON.stringify(this.mensajes, null, 2),
        'utf8'
      );
    } catch (error) {
      console.error('Error guardando historial:', error);
    }
  },

  add(user, mensaje) {
    this.mensajes.push({
      id: this.mensajes.length + 1,
      user: user,
      mensaje: mensaje,
      timestamp: new Date().toISOString(),
    });
    this.save();
  },

  get() {
    return this.mensajes;
  },
};

// Cargar datos al iniciar
historial.init();

module.exports = historial;

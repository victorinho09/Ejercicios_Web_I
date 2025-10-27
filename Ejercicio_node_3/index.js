const http = require('http');
const { URL } = require('url');

const lista_palabras = [
  'casa',
  'perro',
  'gato',
  'sol',
  'luna',
  'mar',
  'rio',
  'monte',
  'flor',
  'arbol',
  'libro',
  'mesa',
  'silla',
  'puerta',
  'ventana',
  'cielo',
  'nube',
  'estrella',
  'fuego',
  'agua',
  'tierra',
  'viento',
  'roca',
  'hierba',
  'hoja',
  'rama',
  'fruto',
  'semilla',
  'raiz',
  'tronco',
  'ave',
  'pez',
  'mariposa',
  'abeja',
  'hormiga',
  'serpiente',
  'rana',
  'conejo',
  'zorro',
  'lobo',
  'oso',
  'leon',
  'tigre',
  'elefante',
  'jirafa',
  'cebra',
  'mono',
  'panda',
  'koala',
  'canguro',
  'coche',
  'avion',
  'barco',
  'tren',
  'bici',
  'moto',
  'ciudad',
  'pueblo',
  'playa',
  'bosque',
  'montaña',
  'valle',
  'lago',
  'isla',
  'desierto',
  'selva',
  'jardin',
  'parque',
  'calle',
  'camino',
  'puente',
  'torre',
  'castillo',
  'iglesia',
  'escuela',
  'hospital',
  'tienda',
  'mercado',
  'teatro',
  'museo',
  'musica',
  'pintura',
  'baile',
  'cancion',
  'poema',
  'historia',
  'cuento',
  'novela',
  'pelicula',
  'foto',
  'color',
  'rojo',
  'azul',
  'verde',
  'amarillo',
  'negro',
  'blanco',
  'rosa',
  'morado',
  'naranja',
  'grande',
  'pequeño',
  'alto',
  'bajo',
  'rapido',
  'lento',
  'fuerte',
  'debil',
  'caliente',
  'frio',
  'dulce',
  'amargo',
  'salado',
  'nuevo',
  'viejo',
  'joven',
  'facil',
  'dificil',
  'bueno',
  'malo',
];

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (request.url !== '/favicon.ico') {
    console.log('Ha entrado una petición');

    const fullUrl = `http://${request.headers.host}${request.url}`;
    console.log(`fullUrl: ${fullUrl}`);
    const myURL = new URL(fullUrl);
    const params = myURL.searchParams;

    const numeroPalabras = parseInt(params.get('numeroPalabras'), 10);
    if (!isNaN(numeroPalabras) && numeroPalabras > 0) {
      console.log('He entrado');
      contraseña = generarContraseña(numeroPalabras);
      response.end(`Contraseña: ${contraseña}`);
    } else {
      response.end('El número introducido no es correcto');
    }
  }
});

server.listen(3333, () => {
  console.log(`Escuchando en puerto 3333`);
});

function generarContraseña(numeroPalabras) {
  if (!numeroPalabras || numeroPalabras < 1) {
    numeroPalabras = 3; // valor por defecto
  }

  let contraseña = '';

  for (let i = 0; i < numeroPalabras; i++) {
    // Seleccionar una palabra aleatoria de la lista
    const indiceAleatorio = Math.floor(Math.random() * lista_palabras.length);
    const palabra = lista_palabras[indiceAleatorio];

    // Capitalizar la primera letra de cada palabra
    const palabraCapitalizada =
      palabra.charAt(0).toUpperCase() + palabra.slice(1);

    contraseña += palabraCapitalizada;

    // Agregar un número aleatorio entre palabras (excepto la última)
    if (i < numeroPalabras - 1) {
      contraseña += Math.floor(Math.random() * 10);
    }
  }

  // Agregar algunos símbolos al final para mayor seguridad
  const simbolos = ['!', '@', '#', '$', '%', '&', '*'];
  const simboloAleatorio =
    simbolos[Math.floor(Math.random() * simbolos.length)];
  contraseña += Math.floor(Math.random() * 100) + simboloAleatorio;

  return contraseña;
}

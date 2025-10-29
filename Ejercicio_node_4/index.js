const https = require('https');
const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');

const options = {
  hostname: 'www.autofesa.com',
  port: 443,
  path: '/coches-segunda-mano',
  method: 'GET'
};

function hacerPeticion(url, intentos = 0) {
  const maxIntentos = 5;

  if (intentos >= maxIntentos) {
    console.log('Demasiadas redirecciones');
    return;
  }

  const isHttps = url.startsWith('https://') || !url.startsWith('http://');
  const protocol = isHttps ? https : http;

  let html = '';

  const req = protocol.request(url, (res) => {
    //console.log(`Status Code: ${res.statusCode}`);
    //console.log(`Location: ${res.headers.location || 'N/A'}`);

    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log(`Redirigiendo a: ${res.headers.location}`);
      hacerPeticion(res.headers.location, intentos + 1);
      return;
    }

    res.on('data', (chunk) => {
      html += chunk;
    });

    res.on('end', () => {
      let coches = procesarHTML(html);
      encontrarCocheMasBarato(coches);
    });
  });

  req.on('error', (error) => {
    console.log(`Error: ${error}`);
  });

  req.end();
}

function procesarHTML(html) {
  fs.writeFileSync('respuesta.html', html);
  console.log('HTML guardado en respuesta.html\n');

  const $ = cheerio.load(html);

  const coches = [];

  $('.vehicle-card').each((index, card) => {
    const $card = $(card);

    const marca = $card.find('.vehicle-card__title .make').text().trim();
    const modelo = $card.find('.vehicle-card__title .model').text().trim();
    const version = $card.find('.vehicle-card__title .version').text().trim();
    const precioTexto = $card.find('div.current span').first().text().trim();
    const precio = precioTexto
      ? parseFloat(precioTexto.replace(/\./g, '').replace(',', '.'))
      : null;

    const year = $card
      .find('.vehicle-card__features .list .item')
      .first()
      .text()
      .trim();
    const kilometros = $card
      .find('.vehicle-card__features .list .item')
      .eq(1)
      .text()
      .trim();
    const combustible = $card
      .find('.vehicle-card__features .list .item')
      .eq(2)
      .text()
      .trim();

    const coche = {
      marca,
      modelo,
      version,
      precio,
      year,
      kilometros,
      combustible,
    };

    coches.push(coche);
  });

  console.log(`\n📊 Total de coches encontrados: ${coches.length}`);

  return coches;
}

function encontrarCocheMasBarato(coches) {
  const cochesConPrecio = coches.filter((coche) => coche.precio !== null);

  if (cochesConPrecio.length === 0) {
    console.log('No se encontraron coches con precio disponible');
    return null;
  }

  let cocheMasBarato = cochesConPrecio[0];

  for (let i = 1; i < cochesConPrecio.length; i++) {
    if (cochesConPrecio[i].precio < cocheMasBarato.precio) {
      cocheMasBarato = cochesConPrecio[i];
    }
  }

  console.log('\n🏆 ===== COCHE MÁS BARATO =====');
  console.log(`Precio: ${cocheMasBarato.precio}€`);
  console.log(`Marca: ${cocheMasBarato.marca}`);
  console.log(`Modelo: ${cocheMasBarato.modelo}`);
  console.log(`Versión: ${cocheMasBarato.version}`);
  console.log(`Año: ${cocheMasBarato.year}`);
  console.log(`Kilómetros: ${cocheMasBarato.kilometros}`);
  console.log(`Combustible: ${cocheMasBarato.combustible}`);
  console.log('================================\n');

  return cocheMasBarato;
}

hacerPeticion(`https://${options.hostname}${options.path}`);

setInterval(() => {
  console.log('\n--- Nueva petición ---');
  hacerPeticion(`https://${options.hostname}${options.path}`);
}, 60000);

var textosEjemplo = require('../texto_ejemplo.js');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express - Lista de Textos',
    textos: textosEjemplo,
    primerTexto: textosEjemplo[0],
  });
});

module.exports = router;

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

router.get('/login', function (req, res, next) {
  res.redirect('/login.html');
});

router.post('/auth/login', function (req, res, next) {
  const { email, password } = req.body;

  if (email && password) {
    req.session.usuarioLogueado = true;
    req.session.email = email;
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

router.get('/dashboard', function (req, res, next) {
  if (req.session.usuarioLogueado) {
    res.redirect('/dashboard.html');
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

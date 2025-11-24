var express = require('express');
var router = express.Router();
const historial = require('../historial');

router.get('/', function (req, res, next) {
  if (req.session.user) {
    res.render('chat', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

router.post('/', function (req, res) {
  historial.add(req.body.user, req.body.mensaje);
  res.json({ success: true });
});

router.get('/historial', function (req, res) {
  res.json(historial.get());
});

module.exports = router;

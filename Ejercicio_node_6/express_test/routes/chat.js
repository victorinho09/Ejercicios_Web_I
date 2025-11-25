var express = require('express');
var router = express.Router();
const historial = require('../historial');

router.get('/', function (req, res, next) {
  if (req.session.user) {
    res.render('chat');
  } else {
    res.redirect('/login');
  }
});

router.post('/', function (req, res) {
  const userEmail = req.session.user.email;
  console.log(userEmail);
  historial.add(userEmail, req.body.mensaje);
  res.json({ success: true, user: userEmail });
});

router.get('/historial', function (req, res) {
  res.json(historial.get());
});

module.exports = router;

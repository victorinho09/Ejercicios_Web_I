var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('login');
});

router.post('/', function (req, res) {
  email = req.body.email;
  password = req.body.password;

  if (email === 'admin@admin.com' && password === 'admin') {
    req.session.user = { email, password };
    res.redirect('/chat');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;

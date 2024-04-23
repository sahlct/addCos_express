var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const userData = {
    name: "John Doe",
    place: "Some Place",
    phone: "1234567890"
  };
  res.json(userData);
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

router.get('/*', function(req, res) {
	res.status(404).end('Opps there seems to have been an error');
});

module.exports = router;
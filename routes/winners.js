var express = require('express');
var router = express.Router();
var pool = require('../lib/pool');

/* GET users listing. */
router.get('/', function(req, res, next) {
 	pool.getConnection(function(err, connection) {
 	connection.query('SELECT * from voittajat ORDER BY id DESC', function (error, rows, fields) {
		if (error) throw error;
		res.send(JSON.stringify(rows));
	});
	connection.release();
	});
});



module.exports = router;

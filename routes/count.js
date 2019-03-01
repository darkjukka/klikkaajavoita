var express = require('express');
var router = express.Router();
var pool = require('../lib/pool');

/* GET users listing. */
router.get('/', function(req, res, next) {
 	pool.getConnection(function(err, connection) {
 	connection.query('SELECT luku from klikkausluku WHERE id = 1', function (error, rows, fields) {
		if (error) throw error;
		res.send(JSON.stringify(rows));
	});
	connection.release();
	});
});

router.post('/edit', function(req, res, next) {
    pool.getConnection(function(err, connection) {
 	connection.query('update klikkausluku set luku = ' +req.body.luku+ ' where id = '+req.body.id, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
    connection.release();
    });
});

module.exports = router;

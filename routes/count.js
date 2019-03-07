var express = require('express');
var router = express.Router();
var pool = require('../lib/pool');

/* GET users listing. */


router.post('/click', function(req, res, next) {
    pool.getConnection(function(err, connection) {
	let luku;

	connection.query('SELECT luku from klikkausluku WHERE id = 1', function (error, rows, fields) {
		if (error) throw error;
		luku = rows[0].luku;
		luku++;
		connection.query('update klikkausluku set luku = '+ luku +' where id = 1', function (error, results, fields) {
			if(error) throw error;
			if(luku%10 === 0 || luku%200 === 0 || luku%500 === 0){
				connection.query('insert into voittajat (nimi) values(?)',
				[req.body.nimi],
				 function (error, results, fields) {
					if(error) throw error;
				});
			}
			res.send({luku: luku});
		});
		
		
	});
	

 	

	
    connection.release();
    });
});

module.exports = router;

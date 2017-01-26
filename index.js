const express = require('express');
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({dest: 'uploads/', storage: storage, limits: { fileSize: 1000 * 1000 }});
const path = require('path');

const app = express();

app.use(function(req, res, next) {
	next();
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', upload.single('uploadField'), function(req, res, next) {
	console.log(req.file);
	let jason = {
		size: req.file.size
	};
	res.setHeader('Content-Type', 'application/json');
	res.json(jason);
	
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on " + port);

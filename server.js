var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

var app = express();

var port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index', {appId: process.env.APPID, loApp: process.env.LOAPP});
});

app.get('/oauthcallback', function(req, res) {
	res.render('oauthcallback', {});
});

// Create an HTTP service
http.createServer(app).listen(port);
console.log("Server listening for HTTP connections on port ", port);

// Create an HTTPS service if the certs are present
try {
	var options = {
	  key: fs.readFileSync('key.pem'),
	  cert: fs.readFileSync('key-cert.pem')
	};
	var https_port = parseInt(port) + 1;
	https.createServer(options, app).listen(https_port);
	console.log("Server listening for HTTPS connections on port ", https_port);
} catch (e) {
	console.error("Security certs not found, HTTPS not available");
}

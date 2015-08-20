var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var env = require('node-env-file');

// Load environment variables for localhost
env(__dirname + '/.env');

for (var k in process.env) {
	console.warn(k, ": ", process.env[k]);
}

var app = express();

var port = process.env.PORT || 5000;
var https_port = process.env.HTTPS_PORT || parseInt(port) + 1;

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
	https.createServer(options, app).listen(https_port);
	console.log("Server listening for HTTPS connections on port ", https_port);
} catch (e) {
	console.error("Security certs not found, HTTPS not available");
}

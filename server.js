var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index', {appId: process.env.APPID, loApp: process.env.LOAPP});
});

app.get('/oauthcallback', function(req, res) {
	res.render('oauthcallback', {});
});

app.listen(port, function() {
});
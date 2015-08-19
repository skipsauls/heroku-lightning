
function forceInit() {
	force.init(config);
};

function forceLogin(key) {
	forceInit();
	force.login(function(success) {
		var oauth = force.getOauth();
	});	
}

var _lightningReady = false;

function setupLightning(callback) {
	var appName = config.loApp;
	var oauth = force.getOauth();
    if (!oauth) {
        alert("Please login to Salesforce.com first!");
        return;
    }

	if (_lightningReady) {
		if (typeof callback === "function") {
			callback();
		}
	} else {
	    // Transform the URL for Lightning
	    var url = oauth.instanceUrl.replace("salesforce", "lightning.force");

	    $Lightning.use(appName, 
	        function() {
				_lightningReady = true;
				if (typeof callback === "function") {
					callback();
				}
	        }, url, oauth.access_token);
	}
}

function createChatterFeed(type, subjectId) {
    setupLightning(function() {
		$Lightning.createComponent("forceChatter:feed", {type: type, subjectId: subjectId}, "chatterFeed"); 
    });
}

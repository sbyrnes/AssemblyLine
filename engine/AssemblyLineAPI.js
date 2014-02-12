/**
 * API for Assembly Line.
 */
// NPM Modules
var restify  = require('restify');

// Custom source
var Preparer = require('./prep/prep');
var Compiler = require('./compile/compile');
var httputils = require('./utils/httputils');

console.log('Starting Assembly Line API Server...');

console.time('Server-Start');
// ================= SERVER CONFIG =================== //
var server = restify.createServer();

//============================================================================= //
// Preparation APIs
// Create a new project and prepare the workspace
// Get
server.get("/prepare", function (req, res, next) {
	console.log('Preparing a new workspace');
	var parameters = httputils.extractURLData(req.url);
	
	if(!parameters["repo"])
	{
		res.json(200, {Error : "No repository specified (repo parameter required)"});
	} else {	
		var instanceId = new Date().getTime();
		parameters["workingDir"] = "./workspace-" + instanceId;
	
		var worker = new Preparer(instanceId, parameters);
	
		worker.prep(function(json) { res.json(200, json); });
	}
				  
	return next();
});


//============================================================================= //
// Compile APIs
// Build an existing workspace
// Get
server.get("/compile", function (req, res, next) {
	console.log('Compiling workspace');
	var parameters = httputils.extractURLData(req.url);
	
	if(!parameters["appName"])
	{
		res.json(200, {Error : "No app name specified"});
	} else if (!parameters["androidTarget"]) {
		res.json(200, {Error : "No Android Target specified"});
	} else if (!parameters["appRoot"]) {
		res.json(200, {Error : "No appRoot specified"});
	} else {			
		console.log("hello: " + JSON.stringify(parameters));
	
		var instanceId = parameters["id"];
		
		var worker = new Compiler(instanceId, parameters);
	
		worker.compile(function(json) { res.json(200, json); });
	}
	return next();
});

//================= SERVER START =================== //
server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
console.timeEnd('Server-Start');


//================= SERVER END HOOK =================//
//process.on('SIGKILL', function () {
//	console.log('Goodbye');
//});
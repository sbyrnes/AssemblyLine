/**
 * API for Assembly Line.
 */
// NPM Modules
var restify  = require('restify');

// Custom source
var Preparer = require('./prep/prep');
var Compiler = require('./compile/compile');
var httputils = require('./httputils');

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
	
	var instanceId = new Date().getTime();
	parameters["workingDir"] = "./workspace-" + instanceId;
	
	Preparer.prep(instanceId,
				  parameters,
				  function(json) { res.json(200, json); });
	return next();
});


//============================================================================= //
// Compile APIs
// Build an existing workspace
// Get
server.get("/compile", function (req, res, next) {
	console.log('Compiling workspace');
	var parameters = httputils.extractURLData(req.url);
	
	console.log("hello: " + JSON.stringify(parameters));
	
	var instanceId = parameters["id"];
	
	Compiler.compile(instanceId,
				     parameters,
				  	 function(json) { res.json(200, json); });
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
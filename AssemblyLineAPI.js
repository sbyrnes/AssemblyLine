/**
 * API for Assembly Line.
 */
// NPM Modules
var restify  = require('restify');

// Custom source
var Preparer = require('./prep/prep');
var httputils = require('./util/httputils');

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
	var submissionRequest = httputils.extractURLData(req.url);
	Preparer.prep(submissionRequest,
				  function(json) { res.json(200, json); });
	return next();
});


//============================================================================= //
// Compile APIs
// Build an existing workspace
// Get

//================= SERVER START =================== //
server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
console.timeEnd('Server-Start');


//================= SERVER END HOOK =================//
process.on('SIGKILL', function () {
	console.log('Goodbye');
});
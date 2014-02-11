/** 
 * Prep.js 
 * Prepares the project for building. 
 */
// NPM Modules
var sys  = require('sys')
var exec = require('child_process').exec;
var fs   = require('fs');

// Custom source
var an   = require('./androidalyzer');

// Variables, these should be provided to us
var repo 	   = ""; //"git@github.com:sbyrnes/Syrah.git";
var workingDir = ""; //"../workspace";

var output = {};

/**********************************************************/
// Step 1. Set up the workspace
function setUpWorkspace(callback) {
	console.log("1) Setting up workspace : " + workingDir);
	
	fs.mkdir(workingDir,function(error){
		if(!error){
			output.setup=true;
			callback();
		} else {
			console.log(error);
			throw error;
		}
	});
}

/**********************************************************/
// Step 2. Pull the code
function pullCode(callback) {
	var gitCommand = "./prep/git-pull.sh " + repo + " " + workingDir;
	
	console.log("2) pulling code using command : " + gitCommand);
	exec(gitCommand, function(error, stdout, stderr) {
		if(!error){
			output.pull = true;
			callback();
		} else {
			console.log(error);
			throw error;
		}
	});
}

/**********************************************************/
// Step 3. Analyze the code
function analyzeCode(callback)
{
	an.findAppRoot(workingDir, function(rootDir) {
		output.appRoot = rootDir;
		an.verifyManifest(rootDir, function() {callback(output)} );
	});
}

/**********************************************************/
// run
function prep(instanceId, parameters, callback) {
	workingDir = parameters["workingDir"];
	
	output.id = instanceId;
	
	repo = parameters["repo"];

	console.log("Preparing workspace...");
	
	setUpWorkspace(function() { pullCode( function() { analyzeCode(callback); }); });
}

module.exports.prep = prep;
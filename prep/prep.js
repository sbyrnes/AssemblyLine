/** 
 * Prep.js 
 * Prepares the project for building. 
 */
var sys  = require('sys')
var exec = require('child_process').exec;
var fs   = require('fs');
var an   = require('./androidalyzer.js');

// Variables, these should be provided to us
var repo 	   = "git@github.com:sbyrnes/Syrah.git";
var workingDir = "./workspace";

/**********************************************************/
// Step 1. Set up the workspace
function setUpWorkspace(callback) {
	console.log("1) Setting up workspace : " + workingDir);
	
	fs.mkdir(workingDir,function(error){
		if(!error){
			callback();
		} else {
			console.log(error);
		}
	});
}

/**********************************************************/
// Step 2. Pull the code
function pullCode(callback) {
	var gitCommand = "./git-pull.sh " + repo + " " + workingDir;
	
	console.log("2) pulling code using command : " + gitCommand);
	exec(gitCommand, function(error, stdout, stderr) {
		if(!error){
			callback();
		} else {
			console.log(error);
		}
	});
}

/**********************************************************/
// Step 3. Analyze the code
function analyzeCode()
{
	an.findAppRoot(workingDir, function(rootDir) {
		an.verifyManifest(rootDir);
	});
}

/**********************************************************/
// run
console.log("Preparing workspace...");
//setUpWorkspace(function() { pullCode(analyzeCode); });
analyzeCode();
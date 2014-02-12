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

var Preparer = function (instanceId, parameters) {
	// Output struct
	this.output = {
		setup : false,
		pull : false,
		manifest : false,
		id : instanceId
	}
		
	this.workingDir = parameters["workingDir"];
	this.repo 		= parameters["repo"];

}

/**********************************************************/
// Step 1. Set up the workspace
Preparer.prototype.setUpWorkspace = function(callback) {
	console.log("1) Setting up workspace : " + this.workingDir);
	
	var self = this;
	
	fs.mkdir(this.workingDir,function(error){
		if(!error){
			self.output.setup=true;
			callback();
		} else {
			console.log(error);
			throw error;
		}
	});
}

/**********************************************************/
// Step 2. Pull the code
Preparer.prototype.pullCode = function(callback) {
	var gitCommand = "./prep/git-pull.sh " + this.repo + " " + this.workingDir;
	
	var self = this;
	
	console.log("2) pulling code using command : " + gitCommand);
	exec(gitCommand, function(error, stdout, stderr) {
		if(!error){
			self.output["pull"] = true;
			callback();
		} else {
			console.log(error);
			throw error;
		}
	});
}

/**********************************************************/
// Step 3. Analyze the code
Preparer.prototype.analyzeCode = function(callback)
{
	console.log("3) Analyzing app code");
	var self = this;
	
	an.findAppRoot(this.workingDir, function(rootDir) {
		self.output["appRoot"] = rootDir;
		an.verifyManifest(rootDir, function() {
			self.output["manifest"] = true;
			callback(self.output);
		});
	});
}

/**********************************************************/
// run
Preparer.prototype.prep = function(callback) {

	console.log("Preparing workspace...");
	var self = this;
	
	self.setUpWorkspace(function() 
		{ self.pullCode( function() 
			{ self.analyzeCode(callback); }); 
		});
}

module.exports = Preparer;
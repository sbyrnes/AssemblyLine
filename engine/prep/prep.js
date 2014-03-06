/** 
 * Prep.js 
 * Prepares the project for building. 
 */
// NPM Modules
var sys  = require('sys')
var exec = require('child_process').exec;
var fs   = require('fs');

// Custom source
var an     = require('./androidalyzer');

// Map of repo to working directory so we don't check out everytime
var repoMap = {};

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
	var self = this;
		
		/** FOR TESTING
		this.workingDir = "./workspace-1394087191598/Syrah/";
		self.output["pull"] = "cached";
		callback();
		*/
	
		
	if(repoMap[this.repo])
	{
		this.workingDir = repoMap[this.repo];
		self.output["pull"] = "cached";
		callback();
	} else {
		var gitCommand = "./prep/git-pull.sh " + this.repo + " " + this.workingDir;
	
		console.log("2) pulling code using command : " + gitCommand);
		exec(gitCommand, function(error, stdout, stderr) {
			if(!error){
				self.output["pull"] = true;
			
				repoMap[self.repo] = self.workingDir;
			
				callback();
			} else {
				console.log(error);
				throw error;
			}
		});
	}
}

/**********************************************************/
// Step 3. Analyze the code
Preparer.prototype.analyzeCode = function(callback)
{
	console.log("3) Analyzing app code");
	var self = this;
	
	an.findAppRoot(this.workingDir, function(rootDir) {
		self.output["appRoot"] = rootDir;
		an.verifyManifest(rootDir + "/AndroidManifest.xml", function(appOutput) {
			self.output["manifest"] = true;
			self.output["app"] = appOutput;
			an.verifyLibraries(rootDir + "/libs", function(libOutput) {
				self.output["libs"] = libOutput;
				callback(self.output);
			});
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
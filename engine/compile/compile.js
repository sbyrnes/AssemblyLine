/** 
 * Compile.js 
 * Compiles the workspace. 
 */
// NPM Modules
var sys  = require('sys')
var exec = require('child_process').exec;
var fs   = require('fs');

// Working config
var androidSDK = "~/android-sdk-macosx";
var antDir     = "~/Desktop/apache-ant-1.9.3/bin";


var Compiler = function (instanceId, parameters) {
	// Output struct
	this.output = {
		buildXML : false,
		compiled : false,
		signed : false,
		id : instanceId
	}

	this.workingDir 	 = parameters["appRoot"];
	this.appName  		 = parameters["appName"]; 
	this.androidTargetId = parameters["androidTarget"];
}
 
/**********************************************************/
// Step 1. Ensure there is a build.xml
Compiler.prototype.setUpBuild = function(callback) {
	console.log("1) Verifying build.xml in : " + this.workingDir);
	var self = this;

	if(hasBuildXML(this.workingDir))
	{
		console.log("Found build.xml");
		self.output["buildXML"] = true;
		callback(); 
		return;
 	}
 	
 	console.log("No build.xml, need to create");
	var generateCommand = androidSDK + "/tools/android update project " +
						  "-p " 	+ this.workingDir +
						   " -n \"" + this.appName 	  + "\" -s " + 
						   "-t " 	+ this.androidTargetId;
						   
	console.log("Generating build.xml : " + generateCommand);
	exec(generateCommand, function(error, stdout, stderr) {
		if(!error){
			console.log("build.xml created");
			self.output["buildXML"] = "generated";
			self.output["buildXML_file"] = self.workingDir + "/build.xml";
			callback();
		} else {
			console.log(error);
		}
	});					   
 	
}

// Returns true if build.xml in the specified dir, false otherwise
function hasBuildXML(dir)
{
 	var files =	fs.readdirSync(dir);
 		
 	for(var i = 0; i < files.length; i++)
 	{
 		if(files[i].indexOf("build.xml") > -1)
 		{
 			return true;
 		}
 	}
 	
 	return false;
}

/**********************************************************/
// Step 2. Run build.xml
Compiler.prototype.compileAPK = function(callback) {
	var gitCommand = "cd " + this.workingDir + ";" + antDir + "/ant release";
	
	console.log("2) building APK : " + gitCommand);
	var self = this;
	
	exec(gitCommand, function(error, stdout, stderr) {
		if(!error){
			self.output["compiled"] = true;
			self.output["APK"] = self.workingDir + "/bin/" + self.appName + ".apk";
			callback();
		} else {
			console.log(error);
			callback();
		}
	});
}

/**********************************************************/
// Step 3. Sign the app 
Compiler.prototype.signAPK = function(callback)
{
	console.log("3) Signing APK : Not implemented yet");
	var self = this;
	
	callback(self.output);
}

/**********************************************************/
// run
Compiler.prototype.compile = function(callback) {
	console.log("Compiling workspace...");
	var self = this;
		
	self.setUpBuild(function() 
		{ self.compileAPK( function() 
			{ self.signAPK(callback); } ); 
		});
}

module.exports = Compiler;
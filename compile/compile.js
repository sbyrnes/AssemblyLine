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

// Variables, these should be provided to us
var workingDir 		= ""; // ../workspace/Syrah
var appName    		= "";	  // Syrach	
var androidTargetId = ""; // 4

var output = {};
 
/**********************************************************/
// Step 1. Ensure there is a build.xml
function setUpBuild(callback) {
	console.log("1) Verifying build.xml in : " + workingDir);

 	var files =	fs.readdirSync(workingDir);
 		
 	for(var i = 0; i < files.length; i++)
 	{
 		if(files[i].indexOf("build.xml") > -1)
 		{
 			console.log("Found build.xml");
 			callback(); 
 			return;
 		}
 	}
 	
 	console.log("No build.xml, need to create");
	var generateCommand = androidSDK + "/tools/android update project " +
						  "-p " + workingDir +
						   " -n \"" + appName + "\" -s " + 
						   "-t " + androidTargetId;
						   
	console.log("Generating build.xml : " + generateCommand);
	exec(generateCommand, function(error, stdout, stderr) {
		if(!error){
			console.log("build.xml created");
			output.buildXML = true;
			callback();
		} else {
			console.log(error);
		}
	});					   
 	
}

/**********************************************************/
// Step 2. Run build.xml
function compileAPK(callback) {
	var gitCommand = "cd " + workingDir + ";" + antDir + "/ant release";
	
	console.log("2) building APK : " + gitCommand);
	exec(gitCommand, function(error, stdout, stderr) {
		if(!error){
			callback();
		} else {
			console.log(error);
			callback();
		}
	});
}

/**********************************************************/
// Step 3. Sign the app 
function signAPK(callback)
{
	console.log("3) Signing APK : Not implemented yet");
	
	callback(output);
}

/**********************************************************/
// run
function compile(instanceId, parameters, callback) {
	console.log("Compiling workspace...");
	
	workingDir = parameters["appRoot"];
	appName  = parameters["appName"]; 
	androidTargetId = parameters["androidTarget"];
		
	setUpBuild(function() { compileAPK( function() { signAPK(callback); } ); });
}

module.exports.compile = compile;
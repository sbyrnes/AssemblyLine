/**
 * Android project analyzer.
 */
var fs = require('fs');
var xml2js = require('xml2js');

var Androidalyzer = function (dir) {

}

function findAppRoot(dir, callback)
{
 	console.log("Looking for app root in: " + dir);
 	var currentRoot = dir;
 	var dirStack = new Array();
 	dirStack.push(currentRoot);
 	
 	// Should really do this asynchronously
 	// If I have time will come back and redo it
 	while(dirStack.length > 0)
 	{
 		currentRoot = dirStack.pop();
 		
 		var files =	fs.readdirSync(currentRoot);
 		
 		for(var i = 0; i < files.length; i++)
 		{
 			var file = files[i];
 			
 			if( file.indexOf("android-support-v") == -1) // Skip android support projects
 			{		
				var fullPathFile = currentRoot + '/' + file;
			
				if(file == "AndroidManifest.xml")
				{
					console.log("Found manifest: " + fullPathFile);
					callback(currentRoot);
					break;
				} else if (fs.statSync(fullPathFile).isDirectory()) {
					dirStack.push(fullPathFile);
				}
 			}
 		}
 	}
 }
 
 function verifyManifest(manifestFile, callback)
 {
 	console.log("Verifying manifest: " + manifestFile);
 	var parser = new xml2js.Parser();
 	
 	fs.readFile(manifestFile, function (err, data) {
  		if (err) throw err;
  		
  		parser.parseString(data, function (err, manifest) {
  			var output = {};
  		
			console.dir(manifest);
			
			output["package"] = manifest.package;
			output["version"] = manifest["android:versionName"];
			
  			console.log("CHECK Manifest OK");
  			callback(output);
		});
	});
 }
 
 function verifyLibraries(libDir, callback)
 {
 	console.log("Verifying libraries in dir: " + libDir);
 	var output = {};
 	
 	var files =	fs.readdirSync(libDir);
 		
 	for(var i = 0; i < files.length; i++)
 	{
 		if(files[i].indexOf(".jar") > -1)
 		{
 			var libFile = files[i];
 			
 			var libStats = fs.statSync(libDir + "/" + libFile);
 			
 			output[libFile] = {};
 			output[libFile]["version"] = "1.0";
 			output[libFile]["size"] = libStats.size;
 		}
 	}
  			
  	callback(output);
 }
 
 module.exports.findAppRoot	    = findAppRoot;
 module.exports.verifyManifest  = verifyManifest;
 module.exports.verifyLibraries = verifyLibraries;
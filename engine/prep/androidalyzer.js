/**
 * Android project analyzer.
 */
var fs = require('fs');
var xml2js = require('xml2js');

// Custom libraries
var libMap = require('./libMap');

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
 			
 			var fileSize = libStats.size;
 			
 			// See if we know what version of this library it is
 			var version = "unknown";
 			console.log("Determining version of : " + libFile + " ("+fileSize+")");
 			if(libMap[libFile])
 			{
 				if(libMap[libFile][fileSize])
 				{
 					version = libMap[libFile][fileSize];
 				} else { console.log("Size not mapped"); }
 			} else { console.log("File not mapped"); }
 			
 			output[libFile] = {};
 			output[libFile]["name"] = libFile;
 			output[libFile]["version"] = version;
 			output[libFile]["size"] = fileSize;
 			
 			// Todo: Version should be derived from the library size for known libraries
 		}
 	}
  			
  	callback(output);
 }
 
 module.exports.findAppRoot	    = findAppRoot;
 module.exports.verifyManifest  = verifyManifest;
 module.exports.verifyLibraries = verifyLibraries;
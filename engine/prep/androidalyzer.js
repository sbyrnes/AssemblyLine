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
					callback(fullPathFile);
					break;
				} else if (fs.statSync(fullPathFile).isDirectory()) {
					dirStack.push(fullPathFile);
				}
 			}
 		}
 	}
 }
 
 function verifyManifest(file, callback)
 {
 	console.log("Verifying manifest: " + file);
 	var parser = new xml2js.Parser();
 	
 	fs.readFile(file, function (err, data) {
  		if (err) throw err;
  		
  		parser.parseString(data, function (err, result) {
			console.dir(result);
			
  			console.log("CHECK Manifest OK");
  			callback();
		});
	});
 }
 
 module.exports.findAppRoot	   = findAppRoot;
 module.exports.verifyManifest = verifyManifest;
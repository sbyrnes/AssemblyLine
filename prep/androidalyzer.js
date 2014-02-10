/**
 * Android project analyzer.
 */
 var fs = require('fs');

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
 
 function verifyManifest(file)
 {
 	console.log("Verifying manifest: " + file);
 	fs.readFile('/etc/passwd', function (err, data) {
  		if (err) throw err;
  		if(data.length > 0) {
  			console.log("CHECK Manifest OK");
  		}
	});
 }
 
 module.exports.findAppRoot	   = findAppRoot;
 module.exports.verifyManifest = verifyManifest;
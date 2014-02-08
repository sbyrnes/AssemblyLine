/** 
 * Prep.js 
 * Prepares the project for building. 
 */
var sys = require('sys')
var exec = require('child_process').exec;


// Step 1. Set up the workspace

// Step 2. Pull the code
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("ls -la", puts);


// Step 3. Analyze the code

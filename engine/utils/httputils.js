/** HTTP Utilities
 *  Sean Byrnes
 *  Copyright 2011, Fogstack
 */
var querystring = require('querystring');
var url = require('url'); 

module.exports.extractURLData = function(myurl) {
 // parse URL
	var url_parts = url.parse(myurl);
	// parse query
	var raw = querystring.parse(url_parts.query);
	// some juggling e.g. for data from jQuery ajax() calls.
	var data = raw ? raw : {};
	
	var resultData = raw.data ? JSON.parse(raw.data) : data;
	
	console.log("URL Data: ");
	console.dir(resultData);
	
	return resultData;
}

module.exports.extractPostData = function(req, callback) {
   var fullBody = '';
   req.on('data', function(chunk) {
	   // append the current chunk of data to the fullBody variable
	   fullBody += chunk.toString();
   });
   req.on('end', function() {
      // parse the received body data
      var decodedBody = querystring.parse(fullBody);
      console.log("Post Data: ");
      console.dir(decodedBody);
	  
      callback(decodedBody);
   });
}

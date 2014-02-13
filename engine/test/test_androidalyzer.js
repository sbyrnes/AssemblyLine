/**
 * Tests for the androidalyzer.js library.
 */
var Androidalyzer = require('../prep/androidalyzer');

// Test no training inputs
exports['test verifyLibraries#goodDir'] = function(beforeExit, assert){
	Androidalyzer.verifyLibraries("./test/libs",
								  function(libOutput) {
										assert.isDefined(libOutput["FlurryAgent.jar"]);
										assert.isDefined(libOutput["MobileAppTracker.jar"]);
										assert.isDefined(libOutput["android_api.jar"]);
										assert.isDefined(libOutput["httpclient-4.2.5.jar"]);
										assert.isDefined(libOutput["napdroid.jar"]);
										assert.isDefined(libOutput["simplesettings.jar"]);
									});
};

// Test no training inputs
exports['test verifyLibraries#badDir'] = function(beforeExit, assert){
	Androidalyzer.verifyLibraries("./test/folderdoesnotexist",
								  function(libOutput) {
										assert.isUndefined(libOutput);
									});
};
'use strict';

/* Controllers */

var AssemblyLineApp = angular.module('assemblyLine.controllers', []);
AssemblyLineApp.controller('HomeController', ['$rootScope', '$scope', '$location', HomeController]);
AssemblyLineApp.controller('CreateController', ['$rootScope', '$scope', '$location', '_START_REQUEST_', CreateController]);
AssemblyLineApp.controller('AnalyzeController', ['$rootScope', '$scope', '$location', 'PrepareService', '_END_REQUEST_', AnalyzeController]);
AssemblyLineApp.controller('BuildController', ['$rootScope', '$scope', '$location', BuildController]);
AssemblyLineApp.run( function($rootScope) {
	$rootScope.$broadcast('_END_REQUEST_');
}); 
  
function HomeController($rootScope, $scope, $location) {
	$scope.start = function() {
		$location.path('/create');
	};
  }

function CreateController($rootScope, $scope, $location, _START_REQUEST_) {
	$scope.create = function() {
		$rootScope.repo = $scope.repo;
		$rootScope.appName = $scope.appName;
		$location.path('/analyze');
	};
  }

function AnalyzeController($rootScope, $scope, $location, PrepareService, _END_REQUEST_) {
	$rootScope.$broadcast(_START_REQUEST_);
	
	$scope.projectData = PrepareService.get({repo: $rootScope.repo}, function(data) {
		$scope.project_id = data.id;
		$scope.appRoot	  = data.appRoot;
		$scope.libs	  	  = data.libs;
		$scope.raw		  = data;
				
		$rootScope.project_id = data.id;
		$rootScope.appRoot 	  = data.appRoot;
		
		$rootScope.$broadcast(_END_REQUEST_);
	  });

	$scope.build = function() {
		$location.path('/build');
	};
  }

function BuildController($rootScope) {

	$scope.projectData = BuildService.get({appRoot: $rootScope.appRoot, appName: $rootScope.appName}, function(data) {
		$scope.project_id = data.id;
		$scope.appRoot	  = data.appRoot;
		$scope.libs	  	  = data.libs;
		
		$rootScope.project_id = data.id;
		$rootScope.appRoot 	  = data.appRoot;
		
		$rootScope.$broadcast(_END_REQUEST_);
	  });
  }
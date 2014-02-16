'use strict';

/* Controllers */

var AssemblyLineApp = angular.module('assemblyLine.controllers', []);
AssemblyLineApp.controller('HomeController', ['$rootScope', '$scope', '$location', HomeController]);
AssemblyLineApp.controller('CreateController', ['$rootScope', '$scope', '$location', CreateController]);
AssemblyLineApp.controller('AnalyzeController', ['$rootScope', '$scope', '$location', '$routeParams', 'PrepareService', '_START_REQUEST_', '_END_REQUEST_', AnalyzeController]);
AssemblyLineApp.controller('BuildController', ['$rootScope', '$scope', '$routeParams', 'BuildService', '_START_REQUEST_', '_END_REQUEST_', BuildController]);
AssemblyLineApp.run( function($rootScope) {
	$rootScope.$broadcast('_END_REQUEST_');
}); 
  
function HomeController($rootScope, $scope, $location) {
	$scope.start = function() {
		$location.path('/create');
	};
  }

function CreateController($rootScope, $scope, $location) {
	$scope.create = function() {
		$location.path('/analyze').search('repo', $scope.repo).search('appName', $scope.appName);
	};
  }

function AnalyzeController($rootScope, $scope, $location, $routeParams, PrepareService, _START_REQUEST_, _END_REQUEST_) {
	$scope.$broadcast(_START_REQUEST_);
	
	$rootScope.repo    = $routeParams.repo;
	$rootScope.appName = $routeParams.appName;
		
	$scope.projectData = PrepareService.get({repo: $routeParams.repo}, function(data) {
		$scope.project_id = data.id;
		$scope.appRoot	  = data.appRoot;
		$scope.libs	  	  = data.libs;
		$scope.rawData    = data;
				
		$rootScope.project_id = data.id;
		$rootScope.appRoot 	  = data.appRoot;
		
		$scope.$broadcast(_END_REQUEST_);
	  });

	$scope.build = function() {
		$location.path('/build').search('appRoot', $rootScope.appRoot).search('appName', $rootScope.appName);
	};
  }

function BuildController($rootScope, $scope, $routeParams, BuildService, _START_REQUEST_, _END_REQUEST_) {
	$scope.$broadcast(_START_REQUEST_);

	$scope.projectData = BuildService.get({appRoot: $routeParams.appRoot, appName: $routeParams.appName, androidTarget: 4}, function(data) {
		$scope.rawData    = data;
		
		$scope.$broadcast(_END_REQUEST_);
	  });
  }
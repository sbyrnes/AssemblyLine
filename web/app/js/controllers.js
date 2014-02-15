'use strict';

/* Controllers */

var AssemblyLineApp = angular.module('assemblyLine.controllers', []);
AssemblyLineApp.controller('HomeController', ['$scope', '$location', HomeController]);
AssemblyLineApp.controller('CreateController', ['$scope', '$location', CreateController]);
AssemblyLineApp.controller('AnalyzeController', ['$scope', '$location', AnalyzeController]);
AssemblyLineApp.controller('BuildController', ['$scope', '$location', BuildController]);
  
function HomeController($scope, $location) {
	$scope.start = function() {
		$location.path('/create');
	};
  }

function CreateController($scope, $location) {
	$scope.create = function() {
		$location.path('/analyze');
	};
  }

function AnalyzeController($scope, $location) {
	$scope.build = function() {
		$location.path('/build');
	};
  }

function BuildController() {

  }
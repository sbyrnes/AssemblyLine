'use strict';


// Declare app level module which depends on filters, and services
angular.module('assemblyLine', [
  'ngRoute',
  'assemblyLine.services',
  'assemblyLine.directives',
  'assemblyLine.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateController'});
  $routeProvider.when('/analyze', {templateUrl: 'partials/analyze.html', controller: 'AnalyzeController'});
  $routeProvider.when('/build', {templateUrl: 'partials/build.html', controller: 'BuildController'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

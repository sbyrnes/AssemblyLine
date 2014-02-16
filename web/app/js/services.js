'use strict';

/* Services */
  
var assemblyLineServices = angular.module('assemblyLine.services', ['ngResource']);
 
assemblyLineServices.value('version', '0.1');
 
assemblyLineServices.factory('PrepareService', ['$resource',  
  function($resource){
    return $resource('http://localhost\:8081/prepare', {}, {
      query: {method:'GET', params:{repo:'repo'}, isArray:false}
    });
  }]);
 
assemblyLineServices.factory('BuildService', ['$resource',  
  function($resource){
    return $resource('http://localhost\:8081/compile', {}, {
      query: {method:'GET', params:{appName:'appName', appRoot:'appRoot', androidTarget:'androidTarget'}, isArray:false}
    });
  }]);
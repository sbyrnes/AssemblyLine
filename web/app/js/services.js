'use strict';

/* Services */
  
var assemblyLineServices = angular.module('assemblyLine.services', ['ngResource']);
 
assemblyLineServices.value('version', '0.1');
 
assemblyLineServices.factory('PrepareService', ['$resource',
  function($resource){
    return $resource('prepare/:prep.json', {}, {
      query: {method:'GET', params:{repo:'repo'}, isArray:false}
    });
  }]);
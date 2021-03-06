'use strict';

/* Directives */


var AssemblyLineApp = angular.module('assemblyLine.directives', []);
  
AssemblyLineApp.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

AssemblyLineApp.directive('loadingDisplay', ['_START_REQUEST_', '_END_REQUEST_', function (_START_REQUEST_, _END_REQUEST_) {
    return {
        restrict: "A",
        link: function (scope, element) {
            // hide the element initially
            //element.hide();

            scope.$on(_START_REQUEST_, function () {
                // got the request start notification, show the element
                element.show();
            });

            scope.$on(_END_REQUEST_, function () {
                // got the request end notification, hide the element
                element.hide();
            });
        }
    };
}]);

AssemblyLineApp.directive('loadedWidget', ['_START_REQUEST_', '_END_REQUEST_', function (_START_REQUEST_, _END_REQUEST_) {
    return {
        restrict: "A",
        link: function (scope, element) {
            // hide the element initially
            element.hide();

            scope.$on(_END_REQUEST_, function () {
                // got the request end notification, show the element
                element.show();
            });
        }
    };
}]);



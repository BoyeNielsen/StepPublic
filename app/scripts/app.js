'use strict';

angular.module('stepPublicApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider,$httpProvider) {
    $routeProvider
      .when('/department/:department_id', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/department/1'
      });
  });

angular.element(document).ready(function () {
    angular.bootstrap(document, ['stepPublicApp']);
});


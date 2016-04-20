'use strict';

// Declare app level module which depends on views, and components
angular.module('insticator', [
  'ngRoute',
  'insticator.game'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.otherwise({redirectTo: '/game'});

}]);

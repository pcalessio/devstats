'use strict';

/* Services */
var myAppServices = angular.module('myApp.services', ['ngResource']);

myAppServices.factory('Person', ['$resource',
  function($resource){
    return $resource('data/persons.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

myAppServices.value('version', '0.1');




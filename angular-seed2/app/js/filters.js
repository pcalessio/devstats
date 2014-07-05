'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('noChicago', [ function() {
    return function(persons) {
    	//console.log(persons);
    	return persons.filter(function(person) {
      		return person.city !='Chicago';
    	});
    };
  }]);

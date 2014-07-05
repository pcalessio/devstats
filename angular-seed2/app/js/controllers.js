'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', 'Person', function($scope, Person) {
  	

  	$scope.persons = [{name:'Joan Dehne',city:'San Francisco'},
                      {name:'Harris Cottone',city:'Chicago'},
                      {name:'Merle Casale',city:'London'},
                      {name:'Davida Forys',city:'Chicago'}];



    $scope.addPerson = function(){
      $scope.persons.push(
        {name: $scope.newPerson.name, 
          city:$scope.newPerson.city}
      );
    };



   // $scope.persons = Person.query();
    

  }])
  .controller('MyCtrl2', [function() {

  }]);
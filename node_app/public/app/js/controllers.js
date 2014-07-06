'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', function($scope) {  
  }])
  .controller('MyCtrl2', ['$scope', 'Socket', function($scope,Socket) {
      $scope.filehits = [];
      Socket.on('fileHit', function (data) {
            //debugger;
            $scope.filehits.push(data);  
        });

      
  }]);
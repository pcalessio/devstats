'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {  
  }])
  .controller('KeysCtrl', function ($scope, $http, Socket){
	  $scope.keys = [];
	  $http.get("http://127.0.0.1:3000/keys").success(function(data) {
		  $scope.keys = data.keys;
	  })
	  Socket.on('newKeyEvent', function(data) {
		  $scope.keys.push(data);
	  })
  })
  .controller('TimeSpentCtrl', function ($scope, $http, Socket){

	  $scope.$watchCollection("keys", function(data) {
	  	
		  if ($scope.keys.length == 0) return;

		  var last = $scope.keys[0].timestamp;
	  
		  	  // Immutable
		  	  var codingTimeInterval = 30*1000;
		  	  var thinkingTimeInterval = codingTimeInterval + 5*60000;

		  	  // Mutable
		  	  var codingTime = 0
		  	  var thinkingTime = 0
		  	  var sleepingTime = 0
	 
		  	  var iterator = function(keyEvent) {
		  	      var diff = new Date(keyEvent.timestamp) - new Date(last); //diff in millisec
		  	      last = keyEvent.timestamp;

		  	      if(diff >= 0 && diff < codingTimeInterval) {
		  	          codingTime += diff;
		  	      } else if(diff >= 0 && diff >= codingTimeInterval && diff < thinkingTimeInterval) {
		  	              thinkingTime += diff;
		  	      } else if(diff >= thinkingTimeInterval) {
		  	              sleepingTime += diff;
		  	      }
		  	  }
	  
		  	  for (var i=0; i < $scope.keys.length; i++) {
		  		  iterator($scope.keys[i]);
		  	  }
	  
		  	  $scope.codingTime = codingTime
		  	  $scope.thinkingTime = thinkingTime
		  	  $scope.sleepingTime = sleepingTime
			  
			  $scope.sum = codingTime + thinkingTime + sleepingTime
		
	  })

  })
  .controller('MyCtrl2', ['$scope', 'Socket', function($scope,Socket) {
      $scope.filehits = [];
      Socket.on('fileHit', function (data) {
            //debugger;
            $scope.filehits.push(data);  
        });

      
  }]);
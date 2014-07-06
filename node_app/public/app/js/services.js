'use strict';

angular.module('myApp.services', ['ngResource'])

.factory('Person', ['$resource',
  function($resource){
    return $resource('data/persons.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }])
.value('version', '0.1')
.factory('Socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});




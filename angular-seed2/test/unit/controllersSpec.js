'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp'));
  //beforeEach(module('myApp.services'));


  describe('MyCtrl1', function(){
    var scope, ctrl, $httpBackend;

	beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/persons.json').
          respond([{name:'Joan Dehne',city:'San Francisco'},
					{name:'Harris Cottone',city:'Chicago'}]);
 
      scope = $rootScope.$new();
      ctrl = $controller(MyCtrl1, {$scope: scope});
    }));

	  it('should ....', inject(function($controller, Person) {
	    expect(scope.persons).toEqual([]);
	      $httpBackend.flush();
	      expect(scope.persons.length).toBe(4);
	  }));

	  it('should ....', inject(function() {
	    //spec body
	  }));
	});
});
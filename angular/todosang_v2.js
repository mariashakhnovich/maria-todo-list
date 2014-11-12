var app = angular.module('todos', ['ngStorage', 'ngRoute', 'todoControllers', 'todoServices']);

app.config(['$routeProvider',function($routeProvider) {
  $routeProvider
   .when('/', {
        templateUrl: 'viewTodo.html',
        controller:'mainPageController'
   })
   .when('/todo/:todoId', {
    	templateUrl: 'editTodo.html',
    	controller: 'editPageController'
	})
   .otherwise({
   		redirectTo:'/'
   });
}]);



var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('mainPageController', ['TodoService', '$scope', '$localStorage', function(TodoService, $scope, $localStorage) {
		
		$scope.toDoList = [];
    	$scope.$storage = $localStorage.$default($scope.toDoList);
    	$localStorage.toDoList = $scope.toDoList;
		
    	$scope.addNewTask = function(task) {
        	if ($scope.todoText !== "" && task !== "") {
            	$scope.toDoList.push({text:$scope.todoText, done:false, images:[], id: $scope.toDoList.length+1});
        	};
        	$scope.todoText = '';
    	};

	    $scope.deleteTask = function(task) {
	        return TodoService.removeTask($scope.toDoList, task);
	    };

	    $scope.deleteDone = function() {
 			return TodoService.removeDoneTasks();
	    };

	    $scope.toggleSelect = function() {
	        return TodoService.toggleSelect($scope.toDoList);
	    };
	    
	    $scope.getDoneTasks = function(){
	    	return TodoService.getAllDone($scope.toDoList);
	    };

	    $scope.getDoneTasksCount = function(){
	        return TodoService.getDoneTasksCount();
	    };

	   
	}]);

todoControllers.controller('editPageController', ['$scope', '$routeParams', 'TodoService',
 function($scope, $routeParams, TodoService){

	var todoId = $routeParams.todoId;


}]);

var myApp = angular.module('todos', []);
myApp.controller('MainCtrl', ['$scope', function ($scope) {
	$scope.summaryMessage = "Enter a task!";
	$scope.toDoList = [];

	$scope.addNewTask = function() {
    	if ($scope.todoText !== "") {
    		$scope.toDoList.push({text:$scope.todoText, done:false});
    		$scope.summaryMessage = "Enter a task!";
    	}
    	else{
    		$scope.summaryMessage = "Task cannot be empty!";
    	}
    	$scope.todoText = '';
  	};

  	//$scope.summaryMessage = (temp === 0 && toDoList.length === 0) ? "Enter a task!" : "Done " + data.doneTasks + " out of "+ data.totalTasks;
    //$scope.summaryClass = data.summaryMessage === "Enter a task!" ? "emptyList" : "";

}]);

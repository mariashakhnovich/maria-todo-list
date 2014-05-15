var myApp = angular.module('todos', []);
myApp.controller('MainCtrl', ['$scope', function ($scope) {
	$scope.toDoList = [];

	$scope.addNewTask = function() {
    	if ($scope.todoText !== "") {
    		$scope.toDoList.push({text:$scope.todoText, done:false});
    	};
    	$scope.todoText = '';
  	};

    $scope.deleteTask = function(task){
        $scope.toDoList.splice($scope.toDoList.indexOf(task),1);
    };

    $scope.deleteDone = function(list) {
        var doneTasks = $scope.getDoneTasks(list);
        for (var i=0; i<doneTasks.length; i++ ){
            $scope.deleteTask(doneTasks[i]);
        }
    };

    $scope.toggleSelect = function(list) {
        var selection = (list.length === 0 || !list[0].done);
        $scope.changeSelection(list, selection);
    };

    $scope.changeSelection = function(list, selection) {
        angular.forEach(list, function(value, key){
            value.done = selection;
        })
    }
    
    $scope.getDoneTasks = function(list){
        return _.where(list, {done: true});
    }

    $scope.getDoneTasksCount = function(list){
        var doneTasks = _.where(list, {done: true});
        return doneTasks.length;
    }  
}]);

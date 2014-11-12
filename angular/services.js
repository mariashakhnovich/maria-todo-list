 var todoServices = angular.module('todoServices', ['ngStorage']);

 todoServices.service('TodoService', function(){

    // var toDoList = todoList;

    var removeTask = this.removeTask = function(list, task){
        return _.remove(list, task);
    };

    var getAllDone = this.getAllDone = function getAllDone(toDoList){
        return _.where(toDoList, {done: true});
    };

    var removeDoneTasks = this.removeDoneTasks = function removeDoneTasks(){
        return _.map(getAllDone(), removeTask());
    };

    var changeSelection = this.changeSelection = function changeSelection(list, selection) {
        angular.forEach(list, function(value, key){
            value.done = selection;
        })
    };

    var toggleSelect = this.toggleSelect = function toggleSelect(list) {
        var selection = (list.length === 0 || !list[0].done);
        changeSelection(list, selection);
    };


});
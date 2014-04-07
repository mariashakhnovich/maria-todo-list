 (function (exports) {

    var UI = {
         tasks: $("#tasks"),
         text: $("#txt"),
         todos: $("#todos"),
         total: $("#total"),
         addBtn: $("#addButton"),
         selectAllBtn: $("#selectAll"),
         deleteDoneBtn: $("#deleteDone")
     };

     var todoTemplate = Handlebars.compile(UI.todos.html());   
     var toDoList = [];
     var data = {"tasks": toDoList, doneTasks:0, totalTasks: 0, summaryClass:"emptyList", summaryMessage: "Enter a task!" };
     var Task = function (id, text, done) {
         this.id = id;
         this.text = text;
         this.done = done;
         this.checked = "";
         this.deleted = false;
     };

     function addNewTask(text) {
         var text = UI.text.val() || text;
         var done = false;
         var id = toDoList.length;
         var newTask = new Task(id, text, done);
         if (newTask.text !== "" && jQuery.type(newTask.text) === "string" ) {
             toDoList.push(newTask);
             UI.text.val("");
         }
         render(toDoList);
     }

     function selectOrClearAll() {
        var isSelected = (toDoList.length === 0 || !toDoList[0].done);  
        selectAll(isSelected);  
     }

     function selectAll(isSelected) {
        var isChecked = isSelected ? "checked" : ""
        $.each(toDoList, function(i, val){
            val.done = isSelected;
            val.checked = isChecked;
        })
        render(toDoList); 
     }


     function deleteDone() {
        $.each(getDoneTasks(toDoList), function(i, val){
            val.done = false;
            val.deleted = true;
        })
        render(toDoList);
     } 

     function getDoneTasks(list) {
        return _.where(list, {done: true, deleted: false});
     }

     function getDeletedTasks(list) {
        return _.where(list, {deleted: true});
     }

     function render(list) { 
        data.doneTasks = getDoneTasks(list).length;
        data.totalTasks = list.length - getDeletedTasks(list).length;
        data.summaryMessage = (data.doneTasks === 0 && data.totalTasks === 0) ? "Enter a task!" : "Done " + data.doneTasks + " out of "+ data.totalTasks;
        data.summaryClass = data.summaryMessage === "Enter a task!" ? "emptyList" : "";
        UI.tasks.html(todoTemplate(data));
     }

     UI.tasks.on("click", "input", function(event) {
        var todoId = $(this).closest("div").data("id");
        toDoList[todoId].done = !toDoList[todoId].done;
        toDoList[todoId].checked = toDoList[todoId].done ? "checked" : "";
        render(toDoList);
        return false;
     }).on("click", ".delete", function(event) {
        var todoId = $(this).closest("div").data("id");
        var toDelete = _.findWhere(toDoList, {id: todoId});
        toDelete.deleted = true;
        render(toDoList);
        return false;
     });

     render(toDoList);
     UI.addBtn.click(addNewTask);
     UI.selectAllBtn.click(selectOrClearAll);
     UI.deleteDoneBtn.click(deleteDone);

     window.exports = {
        toDoList: toDoList,
        addNewTask: addNewTask,
        selectAll: selectAll,
        deleteDone: deleteDone,
        getDeletedTasks: getDeletedTasks,
        getDoneTasks: getDoneTasks
     };

 }(window.jQuery));

 //write tests for each function - jasmine
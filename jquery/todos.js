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
     var data = {"tasks": toDoList };
     var Task = function (id, text, done) {
         this.id = id;
         this.text = text;
         this.done = done;
         this.checked = "";
         this.deleted = false;
     };

     function addNewTask() {
         var text = UI.text.val();
         var done = false;
         var id = toDoList.length;
         var newTask = new Task(id, text, done);
         if (newTask.text !== "") {
             toDoList.push(newTask);
             UI.text.val("");
         }
         render(toDoList);
     }

     function selectAll() {

        var isSelected = (toDoList.length === 0 || !toDoList[0].done);  
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
        var doneTasks = _.where(list, {done: true, deleted: false}); //don't care about deleted, only need "done"
        return doneTasks;  
     }

     function getDeletedTasks(list) {
        var deletedTasks = _.where(list, {deleted: true});
        return deletedTasks;
     }

     function render(list) {
        var progressHelperMessage;
        var progressMessageClassName;
        var hbrsText = todoTemplate(data);
        var tasksDone = getDoneTasks(list);
        var totalTasks = list.length - getDeletedTasks(list).length;

        if (totalTasks === 0) {
             progressMessageClassName = "emptyList";
             progressHelperMessage = "Enter a task!";
        } else {
             progressHelperMessage = "Done: " + tasksDone.length + " out of " + totalTasks;
             progressMessageClassName = "inList";
        }

        UI.total.text(progressHelperMessage).removeClass().addClass(progressMessageClassName);
        UI.tasks.html(hbrsText);
     }

     UI.tasks.on("click", "input", function(event) {
        var todoId = $(this).closest("div").data("id");
        toDoList[todoId].done = !toDoList[todoId].done;
        toDoList[todoId].checked = toDoList[todoId].done ? "checked" : "";
        render(toDoList);
        return false;
     }).on("click", ".delete", function(event) {
        var todoId = $(this).closest("div").data("id");
        $.each(toDoList, function(i, val){
            if (val.id ===todoId) {
                val.deleted = true;
                render(toDoList);
            }
        })
        return false;
     });

     UI.addBtn.click(addNewTask);
     UI.selectAllBtn.click(selectAll);
     UI.deleteDoneBtn.click(deleteDone);

     window.exports = {
        toDoList: toDoList,
        addNewTask: addNewTask,
        selectAll: selectAll,
        deleteDone: deleteDone,
        getDeletedTasks: getDeletedTasks,
        getDoneTasks: getDoneTasks,
        render: render
     };

 }(window.jQuery));
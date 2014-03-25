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
        if (toDoList.length === 0) {
            var trueOrFalse = true;
        } else {
            var trueOrFalse = !toDoList[0].done;
        }

        if (trueOrFalse) {
            var isChecked = "checked";
        } else {
            var isChecked = "";
        }

        for (var i = 0; i<toDoList.length; i++) {
            toDoList[i].done = trueOrFalse;
            toDoList[i].checked = isChecked;
        }

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
        var doneTasks = [];
        $.each(toDoList, function(i, val){
            if (val.done && !val.deleted) {
                doneTasks.push(val);
            }
        })
        return doneTasks;  
     }

     function render(list) {
         var progressHelperMessage;
         var progressMessageClassName;
         var hbrsText = todoTemplate(data);
         var tasksDone = getDoneTasks(list);
         var totalTasks = 0;

        $.each(list, function(i, val) {
            if(!val.deleted){
                totalTasks++;
            }
        })

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
        
        if (toDoList[todoId].done) {
            toDoList[todoId].checked = "checked";
        } else {
            toDoList[todoId].checked = "";
        }

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
 }(window));
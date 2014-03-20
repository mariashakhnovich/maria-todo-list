 (function (exports) {
    
     function addNewTask() {
         var text = UI.text.val();
         var done = false;
         var id = toDoList.length;
         var newTask = new Task(id, text, done);
         if (newTask.text !== "") {
             toDoList.push(newTask);
             UI.text.val("");
             displayTodos();
         }  
         showProgress();
     }
     function displayTodos() {
         var hbrs_text = todoTemplate(data);
         UI.tasks.html(hbrs_text);
     }
     function selectAll() {
        if (toDoList.length === 0) {
            var trueOrFalse = true;
        } else {
            var trueOrFalse = !toDoList[0].done;
        }
        for (var i = 0; i<toDoList.length; i++) {
            toDoList[i].done = trueOrFalse;
            UI.tasks.find("input").prop("checked", trueOrFalse);
        }
        displayTodos();
        showProgress();  
     }
     function deleteDone() {
        //this still doesn't work :( 
        /* $.each(toDoList, function(item) {
             if(item.done) {
                 item.done = false;
                 item.deleted = true;
             }
         });*/
        //but this works:
        for (var i = 0; i < toDoList.length; i++) {
            if (toDoList[i].done) {
                toDoList[i].done = false;
                toDoList[i].deleted = true;
            }
        }
        displayTodos();
        showProgress();
     }     
     function getDoneTasks(list) {
        var doneTasks = [];
        for (var i = 0; i<list.length; i++) {
            if (list[i].done && !list[i].deleted) {
                doneTasks.push(list[i]);
            }
        }
        return doneTasks;  
     }
     function showProgress() {
         var nd;
         var totalClass;
         var deleted = 0;
         var n = getDoneTasks(toDoList).length;
         for (var i = 0; i<toDoList.length; i++) {
            if (toDoList[i].deleted){
                deleted++;
            }
        }
        var totalTasks = toDoList.length;
        if (deleted === totalTasks) {
             totalClass = "emptyList";
             nd = "Enter a task!";
             deleted = 0;
             totalTasks = 0;
        } else {
             var temp = totalTasks - deleted;
             nd = "Done: " + n + " out of " + temp;
             totalClass = "inList";
         }  
         UI.total.text(nd).removeClass().addClass(totalClass);
     }
     var UI = {
         tasks: $("#tasks"),
         text: $("#txt"),
         todos: $("#todos"),
         total: $("#total"),
         addBtn: $("#addButton"),
         selectAllBtn: $("#selectAll"),
         deleteDoneBtn: $("#deleteDone")
     };
     UI.tasks.on("click", "input", function(event) {
        var todoId = $(this).closest("div").data("id");
        var isDone = toDoList[todoId].done;
        isDone = !isDone;
        $(this).closest("div").prop("checked", isDone);
        toDoList[todoId].done = isDone;
        showProgress();
        displayTodos();
        return false;
    });
     UI.tasks.on("click", ".delete", function(event) {
        var todoId = $(this).closest("div").data("id");
        for (var i = 0; i<toDoList.length; i++) {
            if (toDoList[i].id === todoId) {
                toDoList[i].deleted = true;
                displayTodos();
                showProgress();
            }
        }  
        return false;
     });
     var todoTemplate = Handlebars.compile(UI.todos.html());   
     var toDoList = [];
     var data = {"tasks": toDoList };
     var Task = function (id, text, done) {
         this.id = id;
         this.text = text;
         this.done = done;
     };
     UI.addBtn.click(addNewTask);
     UI.selectAllBtn.click(selectAll);
     UI.deleteDoneBtn.click(deleteDone);
 }(window));



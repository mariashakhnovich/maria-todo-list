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

         showProgress();
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

        showProgress();  
     }

     function deleteDone() {
        $.each(getDoneTasks(toDoList), function(i, val){
            val.done = false;
            val.deleted = true;
        })

        showProgress();
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

     function showProgress() {
         var nd;
         var totalClass;
         var deleted = 0;
         var n = getDoneTasks(toDoList).length;
         var hbrsText = todoTemplate(data);

         $.each(toDoList, function(i, val) {
            if (val.deleted){
                deleted++;
            }
        })

        var totalTasks = toDoList.length;
        if (deleted === totalTasks) {
             totalClass = "emptyList";
             nd = "Enter a task!";
        } else {
             var temp = totalTasks - deleted;
             nd = "Done: " + n + " out of " + temp;
             totalClass = "inList";
         }

         UI.total.text(nd).removeClass().addClass(totalClass);
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
        console.log(toDoList[0].done);
        showProgress();
        return false;
    }).on("click", ".delete", function(event) {
        var todoId = $(this).closest("div").data("id");
        $.each(toDoList, function(i, val){
            if (val.id ===todoId) {
                val.deleted = true;
                showProgress();
            }
        })
        return false;
     });

     UI.addBtn.click(addNewTask);
     UI.selectAllBtn.click(selectAll);
     UI.deleteDoneBtn.click(deleteDone);
 }(window));



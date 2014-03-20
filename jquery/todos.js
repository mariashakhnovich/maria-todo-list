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

     UI.tasks.on("click", "input", function(event) {
                 var todoId = $(this).closest("div").data("id");
                 toDoList[todoId].done = !toDoList[todoId].done;
                 $(this).closest("input").prop("checked", toDoList[todoId].done);          
                 $(this).closest("div").toggleClass("done");
                 showProgress();
                 displayTodos();
                 return false;
     });

     UI.tasks.on("click", ".delete", function(event) {
                 var todoId = $(this).closest("div").data("id");
                 /*$.each(toDoList, function(item){
                        if(item.id === todoId) {
                            item.deleted = true;
                            displayTodos();
                            showProgress();
                        }
                 });*/
                for (var i = 0; i<toDoList.length; i++) {
                    if (toDoList[i].id === todoId) {
                        toDoList[i].deleted = true;
                        displayTodos();
                        showProgress();
                    }
                }  
                 return false;

    });

     function displayTodos() {
         var hbrs_text = todoTemplate(data);
         UI.tasks.html(hbrs_text);
     }
     var trueOrFalse = true;

     function selectAll() {
         $.each(toDoList, function(item) {
            item.done = trueOrFalse;
            UI.tasks.find('input').prop("checked", trueOrFalse);
            console.log(UI.tasks.closest("div").attr("class"));
            UI.tasks.closest("div").toggleClass("done");
         });
         trueOrFalse=!trueOrFalse;
         showProgress();  
     }

     function deleteDone() {
         $.each(toDoList, function(item) {
             if(item.done) {
                 item.done = false;
                 item.deleted = true;
             }
         });
         showProgress();
     }
     
     
     function showProgress() {
         var nd;
         var totalClass;
         var deleted = 0;
         

         var countDone = function(list) {
            var done = 0;
            for (var i =0; i<list.length; i++) {
                if (list[i].done) {
                    done++;
                }
            }
            return done;
         }
         
         var n = countDone(toDoList);
         //how many are checked?

        /* $.each(toDoList, function(item) {
            if(item.deleted){
                deleted++;
            }
         }); */

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



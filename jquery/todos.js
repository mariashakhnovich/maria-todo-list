 (function (exports) {

     var UI = {
         tasks: $("#tasks"),
         text: $("#txt")
     };
     
     var todoTemplate = Handlebars.compile($('#todos').html());   
     var toDoList = [];
     var data = {"tasks": toDoList };
 
     var Task = function (id, text, done) {
         this.id = id;
         this.text = text;
         this.done = done;
     };

   
     function addNewTask() {

         var text = UI.text.val();
         var done = false;
         var id = toDoList.length;
         var newTask = new Task(id, text, done);
         console.log('you clicked add new task, but you are not inside if statement');
         if (newTask.text !== "") {
             toDoList.push(newTask);
             UI.text.val("");
             console.log("i live inside the tasks if statement");
             displayTodos();
         }
         
         showProgress();
     }

     UI.tasks.on("click", "input", function(event) {
                 var todoId = $(this).closest("div").data("id");
                 toDoList[todoId].done = !toDoList[todoId].done;          
                 $(this).closest("div").toggleClass("done");
                 showProgress();
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
                        todoList[i].deleted = true;
                        displayTodos();
                        showProgress();
                    }
                }  
                 return false;

    });
     
     function displayTodos() {
        console.log("i live inside displayTodos");
         var hbrs_text = todoTemplate(data);
         UI.tasks.html(hbrs_text);
     }
     
 
     var trueOrFalse = true;
     
     function selectAll() {

         $.each(toDoList, function(item) {
            item.done = trueOrFalse;
            UI.tasks.find('input').prop("checked", trueOrFalse);
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
         var n = $( "input:checked" ).length;

         $.each(toDoList, function(item) {
            if(item.deleted){
                deleted++;
            }
         });


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
        
         
         $("#total").text(nd).removeClass().addClass(totalClass);
     }

     $("#addButton").click(addNewTask);
     $("#selectAll").click(selectAll);
     $("#deleteDone").click(deleteDone);

 }(window));



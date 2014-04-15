describe("to do app testing", function() { 

    it("first task should be this is a test", function(){ 
    	addNewTask("this is a test");
        expect(toDoList[0]).toBe("this is a test"); 
    });

    it("should not allow to pass in empty string", function(){
    	expect(toDoList[0]).toBeUndefined();
    });

    it("should select all when selectAll is called", function() {
    	addNewTask("12345");
    	addNewTask("abcdefg");
    	addNewTask("zero");
    	selectAll();
    	expect(toDoList[0].done).toBeTruthy();
    	expect(toDoList[1].done).toBeTruthy();
    	expect(toDoList[2].done).toBeTruthy();
    });

    it ("should deselect all when selectAll is called twice", function(){
    	addNewTask("12345");
    	addNewTask("abcdefg");
    	addNewTask("zero");
    	selectAll();
    	selectAll();
    	expect(toDoList[0].done).toBeFalsy();
    	expect(toDoList[1].done).toBeFalsy();
    	expect(toDoList[2].done).toBeFalsy();
    })

    it ("should output done tasks when getDoneTasks is called", function () {
    	addNewTask("12345");
    	addNewTask("abcdefg");
    	addNewTask("zero");
    	selectAll();
    	var doneTasks = getDoneTasks(toDoList);
    	expect(doneTasks[0]).toBe("12345");
    	expect(doneTasks[1]).toBe("abcdefg");
    	expect(doneTasks[2]).toBe("zero");
    })

    it ("should delete completed tasks when deleteDone is called", function() {
    	addNewTask("12345");
    	addNewTask("abcdefg");
    	addNewTask("zero");
    	selectAll();
    	deleteDone();
    	var allDeleted = getDeletedTasks(toDoList);
    	expect(allDeleted[0]).toBeTruthy();
    	expect(allDeleted[1]).toBeTruthy();
    	expect(allDeleted[2]).toBeTruthy();
    });

    it ("should only return deleted tasks when deleteDone is called", function(){
    	addNewTask("12345");
    	deleteDone();
    	addNewTask("qwerty")
    	var allDeleted = getDeletedTasks(toDoList);
    	expect(allDeleted[0]).toBe("abcdefg");
    });

    it ("should only return one selected item", function() {
    	addNewTask("12345");
    	selectAll();
    	addNewTask("abcdefg");
    	var allSelected = getDoneTasks(toDoList);
    	expect(allSelected[0]).toBe("12345");
    });


});


document.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    //function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    //function to add a new task
    function addTask(taskText, save = true) {
        //Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Add an event listener to the remove button to remove the task
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save task to Local Storage if `save` is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = "";
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener to the add button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task");
        } else {
            addTask(taskText);
        }
    });

    // Add event listener to the task input field for the 'keypress' event
    taskInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task");
            } else {
                addTask(taskText);
            }
        } 
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});

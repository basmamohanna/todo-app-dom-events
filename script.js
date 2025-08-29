document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage when the app starts
    loadTasks();
    
    // Add task when button is clicked or Enter is pressed
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event delegation for checkbox and delete button
    taskList.addEventListener('click', function(e) {
        const target = e.target;
        
        // Handle checkbox click
        if (target.classList.contains('task-checkbox')) {
            const taskItem = target.closest('.task-item');
            const isCompleted = target.checked; // Get the actual checkbox state
            taskItem.classList.toggle('completed', isCompleted);
            updateTaskStatus(taskItem, isCompleted);
        }
        
        // Handle delete button click
        if (target.classList.contains('delete-btn')) {
            const taskItem = target.closest('.task-item');
            const taskId = taskItem.dataset.taskId; // Get the task ID
            taskItem.remove();
            removeTaskFromStorage(taskId);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (!taskText) return;
        
        const taskId = Date.now().toString();
        createTaskElement(taskText, false, taskId);
        saveTaskToStorage(taskText, false, taskId);
        
        taskInput.value = '';
        taskInput.focus();
    }

    function createTaskElement(taskText, isCompleted, taskId) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.taskId = taskId;
        
        if (isCompleted) {
            taskItem.classList.add('completed');
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = isCompleted;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(textSpan);
        taskItem.appendChild(deleteBtn);
        
        taskList.appendChild(taskItem);
    }

    function saveTaskToStorage(taskText, isCompleted, taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ 
            id: taskId, 
            text: taskText, 
            completed: isCompleted 
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed, task.id);
        });
    }

    function updateTaskStatus(taskItem, isCompleted) {
        const taskId = taskItem.dataset.taskId;
        
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: isCompleted };
            }
            return task;
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromStorage(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

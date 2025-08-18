document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

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
            taskItem.classList.toggle('completed');
        }
        
        // Handle delete button click
        if (target.classList.contains('delete-btn')) {
            target.closest('.task-item').remove();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (!taskText) return;
        
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        
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
        
        taskInput.value = '';
        taskInput.focus();
    }
});
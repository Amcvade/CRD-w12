async function getTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear previous list
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.name} `;
        
        // Add Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
getTasks(); // Call this to populate the list
document.getElementById('task-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const taskInput = document.getElementById('task-input');
    const newTask = { name: taskInput.value, completed: false };
    
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    });

    taskInput.value = ''; // Clear input
    getTasks(); // Refresh the list
});
async function deleteTask(taskId) {
    await fetch(`http://localhost:3000/tasks/${taskId}`, { method: 'DELETE' });
    getTasks(); // Refresh list
}

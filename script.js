// retrieves the task array from tasks.php and create list element for each item in array tasks
function fetchTasks() {
    fetch("tasks.php")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                let li = document.createElement("li");
                li.classList.toggle("completed", task.status === "completed");
                li.innerHTML = `
                    ${task.task}
                    <div>
                        <button class="complete" onclick="completeTask(${task.id})">✔</button>
                        <button class="delete" onclick="deleteTask(${task.id})">❌</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
	
	//get task from user input
    let task = document.getElementById("taskInput").value;
    if (task.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }
	// use post method to send task value to php in json format
    fetch("tasks.php?action=add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    }).then(() => {
        document.getElementById("taskInput").value = "";
        alert("Task added successfully!");
        fetchTasks();
    });
}

function completeTask(id) {
    fetch("tasks.php?action=complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(() => {
        alert("Task marked as completed!");
        fetchTasks();
    });
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        fetch("tasks.php?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        }).then(() => {
            alert("Task deleted successfully!");
            fetchTasks();
        });
    }
}

fetchTasks();

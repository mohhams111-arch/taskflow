const apiUrl = 'http://localhost:3000/api/tasks';

const taskForm = document.getElementById('taskForm');

const taskList = document.getElementById('taskList');

const searchInput = document.getElementById('searchInput');

const taskCounter = document.getElementById('taskCounter');

let editingTaskId = null;

async function getTasks() {

    const response = await fetch(apiUrl);

    const tasks = await response.json();

    taskList.innerHTML = '';

    taskCounter.innerText = tasks.length;

    tasks
    .filter(task =>
        task.title.toLowerCase().includes(
            searchInput.value.toLowerCase()
        )
    )
    .forEach(task => {

        const statusClass =
            task.status === 'completed'
            ? 'completed'
            : 'pending';

        const priorityClass =
            task.priority === 'high'
            ? 'high'
            : task.priority === 'medium'
            ? 'medium'
            : 'low';

        taskList.innerHTML += `
        
            <div class="task">

                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <p>
                    Status:
                    <span class="${statusClass}">
                        ${task.status}
                    </span>
                </p>

                <p>
                    Priority:
                    <span class="${priorityClass}">
                        ${task.priority}
                    </span>
                </p>

                <p>Due Date: ${task.dueDate}</p>

                <button onclick="editTask(
                    ${task.id},
                    '${task.title}',
                    '${task.description}',
                    '${task.status}',
                    '${task.priority}',
                    '${task.dueDate}'
                )">
                    ✏️ Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    🗑️ Delete
                </button>

            </div>
        `;
    });
}

taskForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const title = document.getElementById('title').value.trim();

    if (!title) {

        alert('Task title is required');

        return;
    }

    const task = {

        title: title,

        description: document.getElementById('description').value,

        status: document.getElementById('status').value,

        priority: document.getElementById('priority').value,

        dueDate: document.getElementById('dueDate').value
    };

    if (editingTaskId) {

        await fetch(`${apiUrl}/${editingTaskId}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(task)
        });

        editingTaskId = null;

    } else {

        await fetch(apiUrl, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(task)
        });
    }

    taskForm.reset();

    getTasks();
});

function editTask(id, title, description, status, priority, dueDate) {

    editingTaskId = id;

    document.getElementById('title').value = title;

    document.getElementById('description').value = description;

    document.getElementById('status').value = status;

    document.getElementById('priority').value = priority;

    document.getElementById('dueDate').value = dueDate;
}

async function deleteTask(id) {

    await fetch(`${apiUrl}/${id}`, {

        method: 'DELETE'
    });

    getTasks();
}

searchInput.addEventListener('input', getTasks);

getTasks();
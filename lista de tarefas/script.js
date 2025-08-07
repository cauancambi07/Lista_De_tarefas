//Seleciona os elementos do HTML com os quais vamos interagir
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Carrega as tarefas do localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Salva as tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderiza a lista de tarefas
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((taskText, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.textContent = taskText;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏';
        editBtn.onclick = () => editTask(index);

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '🗑';
        removeBtn.onclick = () => removeTask(index);

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(removeBtn);
        li.appendChild(span);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
}

// Adiciona nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push(taskText);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

// Remove tarefa com confirmação
function removeTask(index) {
    const taskText = tasks[index];
    const confirmationMessage = `🤔 Tem certeza que deseja remover a tarefa: "${taskText}"?`;

    if (confirm(confirmationMessage)) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Edita tarefa
function editTask(index) {
    const currentTask = tasks[index];
    const newTaskText = prompt('🏢 Edite sua tarefa:', currentTask);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index] = newTaskText.trim();
        saveTasks();
        renderTasks();
    }
}

// Eventos
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Renderiza ao carregar
renderTasks();

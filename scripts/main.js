var tasks = [];
window.onload = function () {
    var localTasks = localStorage.getItem('tasks');
    if (localTasks) {
        tasks = JSON.parse(localTasks);
        render();
    }
};
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function task() {
    var inputElement = document.getElementById("taskInput");
    var temp = inputElement.value;
    if (temp) {
        tasks.push(temp);
        inputElement.value = '';
        saveTasks();
        render();
    }
}
function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    render();
}
function edit(index) {
    var editInputElement = document.getElementById("editInput" + index);
    var temp = editInputElement.value;
    if (temp) {
        tasks[index] = temp;
        saveTasks();
        render();
    }
}
function editTask(index) {
    var container = document.getElementById("taskContainer" + index);
    var editInput = document.createElement("input");
    var editSave = document.createElement("button");
    editInput.id = "editInput" + index;
    editInput.value = tasks[index];
    editSave.innerText = "Save";
    editSave.onclick = function () { return edit(index); };
    container.innerHTML = '';
    container.appendChild(editInput);
    container.appendChild(editSave);
}
function renderTask() {
    var tasksListView = document.createElement("div");
    var _loop_1 = function (i) {
        var container = document.createElement('div');
        var information = document.createElement('p');
        var editButton = document.createElement('button');
        var deleteButton = document.createElement('button');
        container.id = "taskContainer" + i;
        container.className = "taskContainer";
        information.textContent = tasks[i];
        information.className = "information";
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function () { return deleteTask(i); };
        deleteButton.className = "deleteButton";
        editButton.innerText = 'Edit';
        editButton.onclick = function () { return editTask(i); };
        editButton.className = "editButton";
        container.appendChild(information);
        container.appendChild(deleteButton);
        container.appendChild(editButton);
        tasksListView.appendChild(container);
    };
    for (var i = 0; i < tasks.length; i++) {
        _loop_1(i);
    }
    return tasksListView;
}
function render() {
    var tasksList = document.getElementById("tasksList");
    tasksList.innerHTML = '';
    tasksList.appendChild(renderTask());
}

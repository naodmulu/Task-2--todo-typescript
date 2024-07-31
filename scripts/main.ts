let tasks: string[]=[];

window.onload = function() {
    let localTasks = localStorage.getItem('tasks')
    if (localTasks) {
        tasks = JSON.parse(localTasks);
        render();
    }
}

function saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function task(): void {
    const inputElement= document.getElementById("taskInput") as HTMLInputElement;
    let temp = inputElement.value;
    if (temp) { 
        tasks.push(temp);
        inputElement.value = ''; 
        saveTasks();
        render();
    }
}

function deleteTask(i:number): void {
    tasks.splice(i, 1);
    saveTasks();
    render();
}

function edit(index:number): void {
    const editInputElement = document.getElementById("editInput" + index) as HTMLInputElement;
    let temp = editInputElement.value;
    if (temp) { 
        tasks[index] = temp;
        saveTasks();
        render();
    }
}

function editTask(index:number):void{
    let container = document.getElementById("taskContainer" + index);

    let editInput = document.createElement("input");
    let editSave = document.createElement("button");

    editInput.id = "editInput" + index;
    editInput.value = tasks[index];
    editSave.innerText = "Save";
    editSave.onclick = () => edit(index)

    container.innerHTML = '';
    container.appendChild(editInput);
    container.appendChild(editSave);
}

function renderTask():HTMLDivElement {
    let tasksListView = document.createElement("div");
    for (let i = 0; i < tasks.length; i++) {
        let container = document.createElement('div');
        let information = document.createElement('p');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        container.id = "taskContainer" + i;
        container.className = "taskContainer";

        information.textContent = tasks[i];
        information.className = "information"

        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteTask(i)
        deleteButton.className = "deleteButton";

        editButton.innerText = 'Edit';
        editButton.onclick = () => editTask(i)
        editButton.className = "editButton";
        
        container.appendChild(information);
        container.appendChild(deleteButton);
        container.appendChild(editButton);
        tasksListView.appendChild(container);
    }
    return tasksListView;
}

    function render(): void {
        let tasksList= document.getElementById("tasksList") as HTMLDivElement;
        tasksList.innerHTML = ''; 
        tasksList.appendChild(renderTask());
    }
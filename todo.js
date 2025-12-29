let tasks = [];
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const taskInput=document.getElementById("taskInput");
const saveBtn = document.getElementById("saveBtn");
addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") addTask();
})

function addTask(){
    const task=taskInput.value;
    if (task==="") return;

    const taskObj = {
        id:Date.now(),
        text:task,
        completed:false
    }
    tasks.push(taskObj);
    createTaskElement(taskObj);

    console.log(tasks);

    taskInput.value = "";
}

function createTaskElement(taskObj) {
    const li = document.createElement("li");

    if (taskObj.completed){
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskObj.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
        toggleComplete(taskObj,li);
    });

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏";
    editBtn.addEventListener("click", () => {
       editTask(taskObj,span);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskObj,li);
    });



    actions.append(completeBtn, editBtn, deleteBtn);
    li.append(span, actions);
    taskList.appendChild(li);
}

saveBtn.addEventListener("click", saveTasks);

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Saved to localStorage:", tasks);
}

function toggleComplete(taskObj,li){
    taskObj.completed=!taskObj.completed;
    li.classList.toggle("completed");
}

function editTask(taskObj,span){
    const newText = prompt("Edit task:",taskObj.text);
    if(newText && newText.trim()){
        taskObj.text=newText.trim();
        span.textContent=taskObj.text;
    }else{
        alert("Cannot enter empty task!!");
    }
}

function deleteTask(taskObj,li){
    tasks = tasks.filter(t=>t.id!==taskObj.id);
    li.remove();
}

function loadTasks(){
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(!storedTasks) return;
    tasks = storedTasks;
    tasks.forEach(task => createTaskElement(task));
}

loadTasks();
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const taskInput=document.getElementById("taskInput");
addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") addTask();
})
function addTask(){
    const task=taskInput.value;
    if (task==="") return;
    const li= document.createElement("li");
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task;

    // actions container
    const actions = document.createElement("div");
    actions.className = "actions";

    // complete button
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    // edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏";
    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
        else{
            alert("Cannot enter empty task!!!")
        }
    });


    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
    taskInput.value = "";
}

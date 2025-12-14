const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const taskInput=document.getElementById("taskInput");
addBtn.addEventListener("click",()=>{
    const task=taskInput.value;
    if (task==="") return;
    const li= document.createElement("li");
    li.textContent=task;
    taskList.appendChild(li);
    taskInput.value="";

});

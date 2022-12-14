"use strict"
let tasks = [];
const addBtn = document.querySelector('.add-btn')
const content = document.querySelector('.content');
// get ul from content class
const uList = document.querySelector('.content ul');
const userTask = document.querySelector('input');


// function responsible for getting the data from local storage
function init() {
    const reference = localStorage.getItem('tasks');
    // validation to check if there's a reference
    if (reference) {
        // converts back to array 
        tasks = JSON.parse(reference);
        renderOfTask(tasks);
    }
  }

// initially get everything from localStorage
init();


userTask.addEventListener('keypress', (ev) => {

    if (ev.key === 'Enter') {

        ev.preventDefault();

        handleTask()
    }

})

addBtn.addEventListener('click', (ev) => {

    ev.preventDefault();

    handleTask();

})

function handleTask () {

    if(userTask.value === '') {
        return; 
    } else {
        // task object
        const task = {
            id: Date.now(), //to be used as a 'key' 
            theTask: userTask.value, //user task
            status: "not-done" //status of the task
        }
        tasks.push(task);

        setToLocalStorage(tasks);
        // clear input 
        document.querySelector('input').value = '';
    }
}

// function to display content, add attributes and element to ul
function renderOfTask(tasks) {
     
    //refresh/clear list content
    uList.innerHTML = '';
    
    for (let i = 0; i < tasks.length; i++) {
        // li element for ul
        const li = document.createElement('li');

        // done button element for li
        const doneBtn = document.createElement('button');

        // adding a class="done" for done button
        doneBtn.classList.add('done');
        doneBtn.innerText = 'Done';
        // add done button to li
        li.appendChild(doneBtn);

        const taskDiv = document.createElement('div');
        taskDiv.style.marginRight = "auto";
        taskDiv.setAttribute('id', tasks[i].id)
        li.appendChild(taskDiv);

        // add task to the list
        taskDiv.append(tasks[i].theTask);

        // li setting attribute 'name' = 'value'
        li.setAttribute('data-id', tasks[i].id);
        li.setAttribute('class', tasks[i].status)

        // -- Added Wed 14 Dec
        // create 'edit' button element
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        editBtn.innerHTML = `<span class="fa-regular fa-pen-to-square"></span>`
        li.appendChild(editBtn)
       
        // delete task button element for li
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.innerHTML = `<span class="fa-solid fa-trash"></span>`
        // add delete button to li
        li.appendChild(deleteBtn);

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('save','hidden');
        saveBtn.innerHTML = `<span class="fa-regular fa-floppy-disk"></span>`
        li.appendChild(saveBtn);
        // append all li settings to ul
        uList.append(li);
    }
    
}

// a handler responsible for the done and delete button
uList.addEventListener('click', function(ev) {

    // get task id
    const dataId =  ev.target.closest('li').getAttribute('data-id');

    // console.timeLog(ev.target.closest('li'));
    const task = document.getElementById(`${dataId}`);

    
    // if delete button is clicked
    if(ev.target.className === 'fa-solid fa-trash') {
        
        // const dataId = ev.target.closest('li').getAttribute('data-id');
        deleteTask(dataId);
    } 
    // if done button is clicked
    if (ev.target.className === "done") {
        
        // const dataId =  ev.target.closest('li').getAttribute('data-id')
        doneTask(dataId);
    }

    if(ev.target.className === 'fa-regular fa-pen-to-square') {

        editTask(task,dataId,ev.target.closest('li')) ;
    }

    if(ev.target.className === 'fa-regular fa-floppy-disk') {
        task.contentEditable = false;
        task.borderRadius = '0';
        task.style.border = 'none'
       
        handleButtonDisplay(task.contentEditable,ev.target.closest('li'));

        updateTask(dataId, task.textContent);
    }

})

function updateTask(dataId, newTask) {

    const updatedTasks = [];

    tasks.forEach(task => {
        if (String(task.id) === dataId ){
            task.theTask = newTask;
        }
        updatedTasks.push(task);
    })
    
    setToLocalStorage(updatedTasks);
 
}

function editTask(task,taskId) {

    const targetTask = document.querySelector(`[data-id="${taskId}"]`)

    task.contentEditable = true;
    task.borderRadius = '7px';
    task.style.border = '3px solid #ff17e4'
    task.focus();

    handleButtonDisplay(task.contentEditable, targetTask);   
}

function handleButtonDisplay(editMode,targetBtn) {

    const doneBtn =   targetBtn.querySelector('.done');
    const deleteBtn = targetBtn.querySelector('.delete');
    const editBtn = targetBtn.querySelector('.edit');
    const saveBtn = targetBtn.querySelector('.save');
    
    if (editMode === 'true') {

        doneBtn.classList.add('hidden');
        deleteBtn.classList.add('hidden');
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');

    } else {

        doneBtn.classList.remove('hidden')
        deleteBtn.classList.remove('hidden');
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
    }
   
}


function deleteTask(dataId) {

    tasks = tasks.filter(function(item) {
        return String(item.id) !== dataId;
    });

    setToLocalStorage(tasks);
}

function doneTask(dataId) {

    tasks = tasks.map(object => {
        if (String(object.id) === dataId) {
          
          return {...object, status: 'done-task'};
        }
        return object;
    });

    setToLocalStorage(tasks);
}


// helper function to push item to local storage and then re-render task to content
function setToLocalStorage(tasks) {

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderOfTask(tasks);
}
"use strict"
let tasks = [];
const addBtn = document.querySelector('.add-btn')
const content = document.querySelector('.content');
// get ul from content class
const uList = document.querySelector('.content ul');

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

addBtn.addEventListener('click', function getValue (ev) {
    ev.preventDefault();
    const userTask = document.querySelector('input').value;
    if(userTask === '') {
        return; 
    } else {
        // task object
        const task = {
            id: Date.now(), //to be used as a 'key' 
            theTask: userTask, //user task
            status: "not-done" //status of the task
        }
        tasks.push(task);

        setToLocalStorage(tasks);
        // clear input 
        document.querySelector('input').value = '';
    }

})

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
        // doneBtn.innerText = 'Done';
        //test below
        doneBtn.innerHTML = `<span class="fa-solid fa-check"></span>`;
        // add done button to li
        li.appendChild(doneBtn);

        // li setting attribute 'name' = 'value'
        li.setAttribute('data-id', tasks[i].id);
        li.setAttribute('class', tasks[i].status)
        li.append(tasks[i].theTask);

        // delete task button element for li
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.innerHTML = `<span class="fa-solid fa-trash"></span>`
        // add delete button to li
        li.appendChild(deleteBtn);

        // append all li settings to ul
        uList.append(li);
    }
    
}

// a handler responsible for the done and delete button
uList.addEventListener('click', function(ev) {
    
    // if delete button is clicked
    if(ev.target.className === 'fa-solid fa-trash') {
        // get task id
        const dataKey =  ev.target.parentElement.parentElement.getAttribute('data-id')
        deleteTask(dataKey);
    } else if (ev.target.className === 'delete') { // guard validation
         // get task id
         const dataKey =  ev.target.parentElement.getAttribute('data-id')
         deleteTask(dataKey);
    }
    
    // if done button is clicked
    if (ev.target.className === "fa-solid fa-check") {
        const dataKey =  ev.target.parentElement.parentElement.getAttribute('data-id')
        doneTask(dataKey);
    } else if (ev.target.className === 'done') { // guard validation
        // get task id
        const dataKey =  ev.target.parentElement.getAttribute('data-id')
        doneTask(dataKey);
    }
   
    
})

function deleteTask(dataId) {
    tasks = tasks.filter(function(item) {
        return String(item.id) !== dataId;
    });
    //make a function
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







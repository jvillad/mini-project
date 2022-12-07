"use strict"

let tasks = [];
const addBtn = document.querySelector('.add-btn')
const content = document.querySelector('.content');

// get ul from content class
const uList = document.querySelector('.content ul');

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
        document.querySelector('input').value = '';
    }

})

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
        // add button to li
        li.appendChild(doneBtn);

        // data
        li.setAttribute('data-id', tasks[i].id);
        li.setAttribute('class', tasks[i].status)
        li.append(tasks[i].theTask);

        // delete task button element for li
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></span>`
        li.appendChild(deleteBtn);

        uList.append(li);
    }
    
}

uList.addEventListener('click', function(ev) {
    
    if(ev.target.className === 'fa-solid fa-trash') {
        // get task id
        const dataKey =  ev.target.parentElement.parentElement.getAttribute('data-id')

        tasks = tasks.filter(function(item) {
            return String(item.id) !== dataKey;
        });
        //make a function
        setToLocalStorage(tasks);
    }
    else if (ev.target.className === 'delete') {
         // get task id
         const dataKey =  ev.target.parentElement.getAttribute('data-id')

         tasks = tasks.filter(function(item) {
             return String(item.id) !== dataKey;
         });
         //make a function
         setToLocalStorage(tasks);
    }
    console.log(ev.target.className)
    if (ev.target.className === "done") {
        const dataKey =  ev.target.parentElement.getAttribute('data-id')

        tasks = tasks.map(object => {
            if (String(object.id) === dataKey) {
              
              return {...object, status: 'done-task'};
            }
            return object;
        });
        setToLocalStorage(tasks);
    }
    
})


// helper function to push item to local storage and then re-render task to content
function setToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderOfTask(tasks);
}

// handles the status change to done
function doneTask(uList) {
    uList.addEventListener('click', function (ev) {

        const dataKey =  ev.target.parentElement.getAttribute('data-id');
        tasks = tasks.map(object => {
            if (String(object.id) === dataKey) {
              
              return {...object, status: 'done-task'};
            }
            return object;
        });
        setToLocalStorage(tasks);
    })

}

// function responsible for getting the data from local storage
function getDataFromLocalStorage() {
    const reference = localStorage.getItem('tasks');
    // validation to check if there's a reference
    if (reference) {
        // converts back to array 
        tasks = JSON.parse(reference);
        renderOfTask(tasks);
    }
  }

// initially get everything from localStorage
getDataFromLocalStorage();





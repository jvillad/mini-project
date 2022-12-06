const addBtn = document.querySelector('.add-btn')
const content = document.querySelector('.content');

addBtn.addEventListener('click', function getValue (ev) {
    
    const userTask = document.querySelector('input').value;
    if(userTask === '') {
        return; 
    } else {
        
        displayTask(userTask);
    }

})

function displayTask(task) {

    // get ul from content class
    const uList = document.querySelector('.content ul');
    
    // li element for ul
    const li = document.createElement('li');
    
    // button element for li
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done');
    doneBtn.innerText = 'Done';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = 'Delete';

    li.innerText = task;
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    uList.appendChild(li);
    
    doneTask(doneBtn);
     //deleteTask(deleteBtn);

}


function deleteTask(deleteBtn) {
    deleteBtn.addEventListener('click', function (ev) {
        // GUARD: Do nothing if click event does not originate from delete button
        if (!ev.target.matches('.delete')) {
            return;
        }
        
        ev.target.closest('li').remove();
  
    })
}

function doneTask(doneBtn) {
    doneBtn.addEventListener('click', function (ev) {
        
        const doneTasks = document.querySelector('.done-content')

        doneTasks.innerText = ev.target.previousSibling.wholeText;
        
        
    })

}



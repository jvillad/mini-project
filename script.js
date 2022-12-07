const addBtn = document.querySelector('.add-btn')
const content = document.querySelector('.content');

addBtn.addEventListener('click', function getValue (ev) {
    ev.preventDefault();
    const userTask = document.querySelector('input').value;
    if(userTask === '') {
        return; 
    } else {
        //TODO: use/check localStorage
        renderTask(userTask);
        document.querySelector('input').value = '';
    }

})

function renderTask(task) {

    // get ul from content class
    const uList = document.querySelector('.content ul');
    
    // li element for ul
    const li = document.createElement('li');
    
    // done button element for li
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done');
    doneBtn.innerText = 'Done';
    
    // delete task button element for li
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerText = 'Delete';

    li.appendChild(doneBtn);
    li.append(task);
    li.appendChild(deleteBtn);
    uList.append(li);
    
    doneTask(doneBtn);
    deleteTask(deleteBtn);

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
        
        const doneTasks = document.querySelector('.done-content ul')
        const li = document.createElement('li');
        
        li.innerHTML = ev.target.nextSibling.wholeText.strike();
        doneTasks.append(li);
        ev.target.closest('li').remove();
        
    })

}



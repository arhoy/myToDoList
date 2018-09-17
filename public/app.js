
// DOM SELECTORS
const DOM = {
    input: document.querySelector('#todoInput'),
    form: document.querySelector('.form__input'),
    list: document.querySelector('.list'),
    close: document.querySelector('.list__close')

}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded',getContent); // get the content of the list on page load
document.addEventListener('keypress',addTaskEventHandler); // listen to keypress event
DOM.list.addEventListener('click',deleteTaskEventHandler); // use event delegation to remove task from UI
DOM.list.addEventListener('click',toggleTaskEventHandler); // use event delegation to toggle the task on and off.

async function getContent(){
    console.log('bloody heelll');
    try{
        const res = await axios('/api/todos');
        // console all res.data elements for dev purpose
         console.log(res.data);

        // add to do the user interface
        UIaddToDos(res.data);

    }
    catch(err){
        console.log('error with function getContent',err);
    }
}

function UIaddToDos(data){
    let html = ``;

    data.forEach(task => {
        html += `<li data-id = "${task._id}" class = "list__item task ${checkIfDone(task)}">${task.name}<span class = "list__close">X</span></li>`;

    });
    DOM.list.innerHTML = html;
}

function checkIfDone(task){
    if(task.completed){
        return "done";
    }
    else{
        return "notDone";
    }
}

async function addTaskEventHandler(e){
    if(e.target.classList.contains('form__input') && (e.keyCode === 13 || e.which === 13) ){
        
        // create the toDO the in backend
        const newToDo = await createToDo(DOM.input.value);
        console.log(newToDo);
        
        // add created toDo to the UI / by recalling the getContent function
        getContent();
   
        // clear the input
        DOM.input.value = '';
       
    }
}

// async function for the post request. ie. creating the todo.
async function createToDo(userInput){
    try{
        const createTask = await axios.post('/api/todos',{name: userInput});
        return createTask.data;
    }
    catch(err){
        console.log(err);
    }
   
}

async function deleteToDo(id){
    console.log('task to delete:',id);
    try{
        const deleteTask = await axios.delete(`/api/todos/${id}`);
    }
    catch(err){
        console.log('there was error in deleteToDo function',err);
    }
}

async function toggleToDo(id,status){
    console.log('task to mark');
    try{
        const toggleTask = await axios.put(`/api/todos/${id}`,{completed:status});
    }
    catch(err){
        console.log('there as a toggleToDo error --',err);
    }
}

function deleteTaskEventHandler(e){
    e.preventDefault();
    if(e.target.classList.contains('list__close')){

        const task = e.target.parentElement;

        // remove from the database by passing in id.
        deleteToDo(task.dataset.id);
        
        // remove element from the UI
        task.parentElement.removeChild(task);
    }
}

function toggleTaskEventHandler(e){
    e.preventDefault();
    const task = e.target;
    let status;

   // task is not completed.
    if(task.classList.contains('done')){
        removeClass(task,'done');
        addClass(task,'notDone');
        status = false;
        // update in database via put request
        toggleToDo(task.dataset.id,status);

    }
    // task has just been completed
    else{
        removeClass(task,'notDone');
        addClass(task,'done');
        status = true;
        // update in database via put request
        toggleToDo(task.dataset.id,status);
    }
}

function addClass(el,classToAdd){
    el.classList.add(classToAdd);  
}

function removeClass(el,classToRemove){
    el.classList.remove(classToRemove);
}

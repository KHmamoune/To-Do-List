const add_tab = document.querySelector(".addt")
const add_task = document.querySelector(".add")
const side = document.querySelector(".side > div > div")
const todo = document.querySelector(".tasks")
const tab_containers = document.querySelector(".tasks > div")
const inbox = document.querySelector(".tab")
const inbox_tab = document.querySelector(".Inbox")
let selected = "Inbox"
let tasks = []


//this is the construct that we use to create our task object.
function task(index, task, description, priority, sub_tasks, dead_line){
    this.index = index
    this.task = task
    this.description = description
    this.priority = priority
    this.sub_tasks = sub_tasks
    this.dead_line = dead_line
}


//this fuction creates the input fields that user utilizes to input the task info.
function createTask(){  
    let holder = document.createElement("div")
    const task_holder = document.querySelector("."+selected)

    holder.innerHTML = `<div class="task">
        <div>
            <input class="subj" type='text'>
            <div>
            <label for="priority">priority: </label>
                <select name="priority" class="prio">
                    <option>high</option>
                    <option>medium</option>
                    <option>low</option>
                </select>
                <div>
                    <input class="dead" type='date'>
                </div>
            </div>
        </div>
        <div class="btns">
            <button class="addd">+ Add Description</button>
            <button class="adds">+ Add Sub Task</button>
            <button class="done">Done</button>
        </div>
    </div>`

    task_holder.appendChild(holder)
    
    const add_description = holder.querySelector(".addd")
    const add_sub = holder.querySelector(".adds")
    const done = holder.querySelector(".done")
    add_description.addEventListener("click", () => addDes(add_description),{once:true})
    add_sub.addEventListener("click", () => addSub(add_sub))
    done.addEventListener("click", () => finish(task_holder, holder))
}


//these three fuctions are used to add tabs, descriptions and sub-tasks respectively.
function addTab(){
    let holder = document.createElement("button")
    let tab = document.createElement("div")
    let text = prompt("tab name:")

    holder.classList.add("tab")
    holder.textContent = text
    tab.classList.add("holder")
    tab.classList.add(text)

    holder.addEventListener("click", () => display(holder, tab))

    side.appendChild(holder)
    tab_containers.appendChild(tab)
}
//we use the "btn" parameter to decide where to put the description/sub-task.
function addDes(btn){
    let holder = document.createElement("textarea")
    holder.classList.add("des")
    btn.before(holder)
    btn.textContent = "- Remove Description"
    btn.addEventListener("click", () => remDes(btn,holder),{once:true})
}

function addSub(btn){
    let holder = document.createElement("div")
    holder.classList.add("sub")
    holder.innerHTML = `<div>
    <label for="sub"><input type="text" class="subt"></label>
    </div>
    <img src="icons/delete.svg">`

    btn.before(holder)
}


function remDes(btn,des){
    des.remove()
    btn.textContent = "+ Add Description"
    btn.addEventListener("click", () => addDes(btn),{once:true})
}


//this is the finishing function where we use the users inputs to create the task element.
function finish(tab, holder){
    const subject = holder.querySelector(".subj")
    const priority = holder.querySelector(".prio")
    const description = holder.querySelector(".des")
    const sub_task = holder.querySelectorAll(".subt")
    const dead_line = holder.querySelector(".dead")
    let subs = []
    let description_text = ""
    let holder2 = document.createElement("div")

    //we check here if there is a description element so it doesn't result in an error when reading null. 
    if(typeof(description) != 'undefined' && description != null){
        description_text = description.value
    }

    //same for the sub-task element.
    if(typeof(sub_task) != 'undefined' && sub_task != null){
        sub_task.forEach(element => {
            subs.push(element.value)
        });
    }

    //here we get the date value and we reformat it to be dd/mm/yyyy.
    let date = dead_line.value.split("-")
    let dead
    if(typeof(date[0]) == 'undefined' ||typeof(date[1]) == 'undefined' ||typeof(date[2]) == 'undefined'){
        dead = ""
    }else{
        dead = date[2]+"/"+date[1]+"/"+date[0]
    }

    //then we add a 2 length array with a task object with all the info and the dom element.
    //and by adding the index we can remove the array element when we remove the dom element. 
    let todo = new task(tasks.length, subject.value, description_text, priority.value, dead)
    tasks.push([todo, holder])

    holder.innerHTML = `<div class="task">
        <div>
            <div>
                <input type="checkbox" name="task" class="check">
                <label for="task"> ${todo.task} </label>
            </div>
            <div>
                <div>
                    <p>${dead}</p>
                </div>
                <img src="icons/chevron-down.svg" class="expand">
                <img src="icons/pencil.svg">
                <img src="icons/delete.svg" class="remtask">
            </div>
        </div>
        <div class="btns">
            <div class="des"> ${todo.description} </div>
        </div>
    </div>`

    //we remove the margin of the description if it is empty (so it looks natural).
    if(todo.description == ""){
        holder.querySelector(".des").style.margin = "0px"
    }

    //depending on the users input for priority we choose the border color.
    if(todo.priority == "low"){
        holder.querySelector(".task").style = "border-left: 10px solid green;"
    }else if(todo.priority == "medium"){
        holder.querySelector(".task").style = "border-left: 10px solid yellow;"
    }else{
        holder.querySelector(".task").style = "border-left: 10px solid red;"
    }

    for(let i=0; i < subs.length; i++){
        if(subs[i] == ""){
            continue
        }

        let holder3 = document.createElement("div")
        holder3.innerHTML =`<div>
        <input type="checkbox" name="sub">
        <label for="sub"> ${subs[i]} </label>
        </div>
        <img src="icons/delete.svg" class=""remsub>`

        holder3.classList.add("sub")
        holder2.appendChild(holder3)
    }

    const btns = holder.querySelector(".btns")
    const delete_task = holder.querySelector(".remtask")
    const show_details = holder.querySelector(".expand")

    delete_task.addEventListener("mousedown", () => removeTask(todo))
    show_details.addEventListener("mousedown", () => show(show_details, holder))
    btns.style.display = "none"

    btns.appendChild(holder2)
    tab.appendChild(holder)
}


function removeTask(current_task){
    for(let i=current_task.index+1; i<tasks.length; i++){
        tasks[i][0].index--
    }
    
    tasks[current_task.index][1].remove()
    tasks.splice(current_task.index,1)
    console.log(tasks)
}


//this function is used to determine which tasks to be shown depending on the currently selected tab.
function display(button, tab){ 
    const buttons = document.querySelectorAll(".tab")
    const tabs = document.querySelectorAll(".holder")

    buttons.forEach(element =>{
        element.classList.remove("selected")
    })

    if(button.textContent == "Inbox"){
        tabs.forEach(element =>{
            element.style.display = "grid"
        })

        button.classList.add("selected")
        selected = button.textContent
    }else{
        tabs.forEach(element =>{
            element.style.display = "none"
        })
    
        tab.style.display= "grid"
        button.classList.add("selected")
        selected = button.textContent
    }
}


//here is the function that expands the tasks to show details such as the description and sub tasks.
function show(btn, holder){
    const details2 = holder.querySelector(".btns")

    if(details2.style.display == "none"){
        details2.style.display = "block"
        btn.src="icons/chevron-up.svg"
    }else{
        details2.style.display = "none"
        btn.src="icons/chevron-down.svg"
    }
}


inbox.addEventListener("click", () => display(inbox, inbox_tab))
add_tab.addEventListener("click", () => addTab())
add_task.addEventListener("click", () => createTask())
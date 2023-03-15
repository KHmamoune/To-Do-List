const add_tab = document.querySelector(".addt")
const add_task = document.querySelector(".add")
const side = document.querySelector(".side > div > div")
const todo = document.querySelector(".tasks")
const tab_containers = document.querySelector(".tasks > div")
const inbox = document.querySelector(".tab")
const inbox_tab = document.querySelector(".Inbox")
let selected = "Inbox"
let tasks = []
let tabs = []


function task(index, task, description, priority, sub_tasks, dead_line){
    this.index = index
    this.task = task
    this.description = description
    this.priority = priority
    this.sub_tasks = sub_tasks
    this.dead_line = dead_line
}


function createDiv(type, text, classes){
    let element = document.createElement(type)
    element.textContent = text
    element.classList.add(classes)
    return element
}


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


function addDes(btn){
    let holder = document.createElement("textarea")
    holder.classList.add("des")
    btn.before(holder)
    btn.textContent = "- Remove Description"
    btn.addEventListener("click", () => remDes(btn,holder),{once:true})
}


function remDes(btn,des){
    des.remove()
    btn.textContent = "+ Add Description"
    btn.addEventListener("click", () => addDes(btn),{once:true})
}


function addSub(btn){
    let holder = document.createElement("div")
    holder.classList.add("sub")
    holder.innerHTML = `<div>
    <input type="checkbox" name="sub">
    <label for="sub"><input type="text" class="subt"></label>
    </div>
    <img src="icons/delete.svg">`

    btn.before(holder)
}


function finish(tab, holder){
    const subject = holder.querySelector(".subj")
    const description = holder.querySelector(".des")
    const sub_task = holder.querySelectorAll(".subt")
    const dead_line = holder.querySelector(".dead")
    let subs = []
    let description_text = ""
    let holder2 = document.createElement("div")

    if(typeof(description) != 'undefined' && description != null){
        description_text = description.value
    }

    if(typeof(sub_task) != 'undefined' && sub_task != null){
        sub_task.forEach(element => {
            subs.push(element.value)
        });
    }

    let date = dead_line.value.split("-")
    let dead
    if(typeof(date[0]) == 'undefined' ||typeof(date[1]) == 'undefined' ||typeof(date[2]) == 'undefined'){
        dead = ""
    }else{
        dead = date[0]+"/"+date[1]+"/"+date[2]
    }

    let todo = new task(tasks.length, subject.value, description_text, "low", dead)
    tasks.push([todo, holder])

    holder.innerHTML = `<div class="task">
        <div>
            <p> ${todo.task} </p>
            <div>
                <div>
                    <p>${dead}</p>
                </div>
                <img src="icons/chevron-down.svg">
                <img src="icons/pencil.svg">
                <img src="icons/delete.svg" class="remtask">
            </div>
        </div>
        <div class="btns">
            <div class="des"> ${todo.description} </div>
        </div>
    </div>`

    for(let i=0; i < subs.length; i++){
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

    delete_task.addEventListener("mousedown", () => removeTask(todo))
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


inbox.addEventListener("click", () => display(inbox, inbox_tab))
add_tab.addEventListener("click", () => addTab())
add_task.addEventListener("click", () => createTask())
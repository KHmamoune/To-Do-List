(()=>{const e=document.querySelector(".addt"),t=document.querySelector(".add"),i=document.querySelector(".side > div > div"),n=document.querySelector(".tasks > div");let s=[];function r(e,t,i,n,s){this.task=e,this.description=t,this.priority=i,this.subtasks=n}e.addEventListener("click",(()=>{let e=prompt("insert the tab name:");i.appendChild(function(e,t,i){let n=document.createElement("button");return n.textContent=t,n.classList.add("tab"),n}(0,e))})),t.addEventListener("click",(()=>function(){let e=prompt("insert the task here:"),t=prompt("insert the description here:"),i=prompt("insert the priority here: (low/medium/high)"),d=prompt("do you want to add sub tasks? (insert number)"),o=[];for(let e=0;e<d;e++){let e=prompt("insert sub task here:");o.push(e)}s.push(new r(e,t,i,o));let c=document.createElement("div");c.innerHTML=`<div class="task"><p> ${e} </p><div><p>11/11/1111</p><img src="icons/chevron-down.svg"><img src="icons/pencil.svg"><img src="icons/delete.svg"></div></div>`,n.appendChild(c)}()))})();
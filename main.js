(()=>{const e=document.querySelector(".addt"),t=document.querySelector(".add"),n=document.querySelector(".side > div > div"),s=(document.querySelector(".tasks"),document.querySelector(".tasks > div")),c=document.querySelector(".tab"),o=document.querySelector(".Inbox");let d="Inbox",i=[];function l(e,t,n,s,c,o){this.index=e,this.task=t,this.description=n,this.priority=s,this.sub_tasks=o,this.dead_line=c}function r(){let e=document.createElement("div");const t=document.querySelector("."+d);e.innerHTML='<div class="task">\n        <div>\n            <input class="subj" type=\'text\'>\n            <div>\n            <label for="priority">priority: </label>\n                <select name="priority" class="prio">\n                    <option>high</option>\n                    <option>medium</option>\n                    <option>low</option>\n                </select>\n                <div>\n                    <input class="dead" type=\'date\'>\n                </div>\n            </div>\n        </div>\n        <div class="btns">\n            <button class="addd">+ Add Description</button>\n            <button class="adds">+ Add Sub Task</button>\n            <button class="done">Done</button>\n        </div>\n    </div>',t.appendChild(e);const n=e.querySelector(".addd"),s=e.querySelector(".adds"),c=e.querySelector(".done");n.addEventListener("click",(()=>u(n)),{once:!0}),s.addEventListener("click",(()=>function(e){let t=document.createElement("div");t.classList.add("sub"),t.innerHTML='<div>\n    <label for="sub"><input type="text" class="subt"></label>\n    </div>\n    <img src="icons/delete.svg">',e.before(t)}(s))),c.addEventListener("click",(()=>function(e,t){const n=t.querySelector(".subj"),s=t.querySelector(".prio"),c=t.querySelector(".des"),o=t.querySelectorAll(".subt"),d=t.querySelector(".dead");let r=[],u="",v=document.createElement("div");void 0!==c&&null!=c&&(u=c.value),void 0!==o&&null!=o&&o.forEach((e=>{r.push(e.value)}));let y,m=d.value.split("-");y=void 0===m[0]||void 0===m[1]||void 0===m[2]?"":m[2]+"/"+m[1]+"/"+m[0];let b=new l(i.length,n.value,u,s.value,y,r);i.push([b,t]),t.innerHTML=`<div class="task">\n        <div>\n            <div>\n                <img src="icons/check-circle-outline.svg" class="checkbox">\n                <p> ${b.task} </p>\n            </div>\n            <div>\n                <div>\n                    <p>${y}</p>\n                </div>\n                <img src="icons/chevron-down.svg" class="expand">\n                <img src="icons/pencil.svg" class="edit">\n                <img src="icons/delete.svg" class="remtask">\n            </div>\n        </div>\n        <div class="btns">\n            <div class="des"> ${b.description} </div>\n        </div>\n    </div>`,""==b.description&&(t.querySelector(".des").style.margin="0px"),"low"==b.priority?t.querySelector(".task").style="border-left: 10px solid green;":"medium"==b.priority?t.querySelector(".task").style="border-left: 10px solid yellow;":t.querySelector(".task").style="border-left: 10px solid red;";for(let e=0;e<r.length;e++){if(""==r[e])continue;let t=document.createElement("div");t.innerHTML=`<div>\n        <img src="icons/check-circle-outline.svg" class="minicheckbox">\n        <p> ${r[e]} </p>\n        </div>\n        <img src="icons/delete.svg" class="remsub">`;const n=t.querySelector(".minicheckbox");n.addEventListener("mousedown",(()=>p(n))),t.classList.add("sub"),v.appendChild(t)}const h=t.querySelector(".btns"),S=t.querySelector(".remtask"),q=t.querySelector(".expand"),k=t.querySelector(".checkbox");S.addEventListener("mousedown",(()=>function(e){for(let t=e.index+1;t<i.length;t++)i[t][0].index--;i[e.index][1].remove(),i.splice(e.index,1)}(b))),q.addEventListener("mousedown",(()=>function(e,t){const n=t.querySelector(".btns");"none"==n.style.display?(n.style.display="block",e.src="icons/chevron-up.svg"):(n.style.display="none",e.src="icons/chevron-down.svg")}(q,t))),k.addEventListener("mousedown",(()=>function(e){const t=e.querySelector(".checkbox"),n=e.querySelector(".edit");t.src="icons/check-circle.svg",e.remove();const s=document.querySelector(".complete");if(n.remove(),null==s){a("complete");const t=document.querySelector(".complete");t.appendChild(e),t.style.display="none"}else s.appendChild(e)}(t))),h.style.display="none",h.appendChild(v),e.appendChild(t)}(t,e)))}function a(e){let t=document.createElement("button"),c=document.createElement("div");t.classList.add("tab"),t.textContent=e,c.classList.add("holder"),c.classList.add(e),t.addEventListener("click",(()=>v(t,c))),n.appendChild(t),s.appendChild(c)}function u(e){let t=document.createElement("textarea");t.classList.add("des"),e.before(t),e.textContent="- Remove Description",e.addEventListener("click",(()=>function(e,t){t.remove(),e.textContent="+ Add Description",e.addEventListener("click",(()=>u(e)),{once:!0})}(e,t)),{once:!0})}function v(e,t){const n=document.querySelectorAll(".tab"),s=document.querySelectorAll(".holder"),c=document.querySelector(".complete");n.forEach((e=>{e.classList.remove("selected")})),"Inbox"==e.textContent?(s.forEach((e=>{e.style.display="grid"})),e.classList.add("selected"),d=e.textContent,c.style.display="none"):(s.forEach((e=>{e.style.display="none"})),t.style.display="grid",e.classList.add("selected"),d=e.textContent)}function p(e){e.src="icons/check-circle.svg"}e.addEventListener("click",(()=>{a(prompt("tab name:"))})),c.addEventListener("click",(()=>v(c,o))),t.addEventListener("click",(()=>r()))})();
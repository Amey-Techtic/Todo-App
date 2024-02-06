let inputTitle= document.getElementById("title");

let inputDetail= document.getElementById("detail");

let listContainer= document.getElementById("listContainer");


function addList(){
   console.log(inputTitle.value,inputDetail.value);
   if(inputTitle.value==='' || inputDetail===''){
      alert("Please enter all task details");
   }
   else{
      let list = document.createElement("li");
      list.innerHTML=inputTitle.value + " : " + inputDetail.value;
      listContainer.appendChild(list);
      let span=document.createElement("span");
      span.innerHTML='\u00d7';

      list.appendChild(span);

   }
   inputTitle.value='';
   inputDetail.value='';
   saveData();

}

//remove element
listContainer.addEventListener("click",function(e){
   if(e.target.tagName==='SPAN'){
      e.target.parentElement.remove();
   }
})

function saveData(){
   localStorage.setItem("data",listContainer.innerHTML);
   //as innerHTML of listContainer div is list li
}

function showTask(){
   listContainer.innerHTML=localStorage.getItem("data")
}

showTask();
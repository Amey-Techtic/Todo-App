let inputTitle = document.getElementById("title");
let inputDetail = document.getElementById("detail");
let listContainer = document.getElementById("listContainer");
let addButton = document.getElementById("addDetails");
let buttonText = document.getElementById("addDetails").innerText;

let todoArray = [];
let todoObject = localStorage.getItem("todoData");
let editId=null; //this will store id of edit element

if (todoObject != null) {
  todoArray =
    JSON.parse(todoObject); /*we will be storing old data through saveDetails() 
   by localstorage getItem so that on page refresh, the old data is not lost*/
}

displayDetails(); //display data in idle state also that is when we dont perform any click event 

console.log(todoArray);

addButton.onclick = () => {

   const title = inputTitle.value;
   const detail = inputDetail.value;

  if(editId!=null){
   //edit

   todoArray.splice(editId,1,{title : title , detail : detail});
   editId=null;
  }
  else{
   //insert
   
   todoArray.push({ title: title, detail: detail }); //this will add data in last index of array;
  }
  
  console.log(todoArray);
  saveDetails(todoArray);
  displayDetails();/*display data when user clicks add button, if we dont call then, we need to 
  refresh page manually to display newly added data*/
  inputTitle.value = "";
  inputDetail.value = "";
  addButton.innerText=buttonText;
};

function saveDetails(todoArray) {
  let stringArray = JSON.stringify(todoArray); //as localstorage setItem allows vaue of only string type
  localStorage.setItem("todoData", stringArray);
}

function displayDetails() {
  let listData = "";
  todoArray.forEach((todo,i) => {
    listData += `<li>${i+1} <h3 id="titleHead">${todo.title} -</h3><h4 id="detailHead"> ${todo.detail} </h4><span><i class="fa-solid fa-pen" id="editIcon" onClick='editInfo(${i})'></i> <i class="fa-solid fa-trash" id="deleteIcon" onClick='deleteInfo(${i})'></i></span></li>`;
  });
  listContainer.innerHTML=listData;
}

function editInfo(id){
   editId=id;
   inputTitle.value=todoArray[id].title;
   inputDetail.value=todoArray[id].detail;
   addButton.innerText='Save Changes';
   console.log(todoArray);
}

function deleteInfo(id){
   todoArray.splice(id,1); //so that this will remove elment of particular id from todoArray as splice affects original array

   saveDetails(todoArray); //this should also save todoArray with removed element in localstorage so that it would not just remove list data from user interface but also from localstorage too;
   
   displayDetails(); // after removing element from todoArray, it must also reflect on user interface too   
}


let input = document.querySelector(".input");
let addbtn = document.querySelector(".add");
let notesDiv = document.querySelector(".notes");
let cont = document.querySelector(".container");

//Empty array
let arrayOfNotes = [];

//check if data in local storage
if (localStorage.getItem("notes")) {
  arrayOfNotes = JSON.parse(localStorage.getItem("notes"));
}

getNotesFromLocalStorage();
//add task
addbtn.onclick = function () {
  if (input.value !== "") {
    addNotesToArray(input.value); //add task to array of tasks
    input.value = "";
  }
};

//click on note element

notesDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    //remove note from local storage
    deleteNotewith(e.target.parentElement.getAttribute("data-id"));
    //remove element from page
    e.target.parentElement.remove();
  }
  //task element
  if (e.target.classList.contains("note")) {
    //toggle comlete for the note div
    toggleStatusNoteWith(e.target.getAttribute("data-id"));

    //toggle done class
    e.target.classList.toggle("done");
  }
});

function addNotesToArray(noteText) {
  //data of task
  const note = {
    id: Date.now(),
    title: noteText,
    completed: false,
  };
  arrayOfNotes.push(note);
  //add Tasks To Page
  addElementsToPageFrom(arrayOfNotes);
  //add notes to localStorage
  addNotesToLocalStorage(arrayOfNotes);
}

function addElementsToPageFrom(arrayOfNotes) {
  //empty tasks div
  notesDiv.innerHTML = "";
  //looping of array of tasks
  arrayOfNotes.forEach((note) => {
    //create main div
    let noteDiv = document.createElement("div");
    noteDiv.className = "note";
    //check if task is done
    if (note.completed) {
      noteDiv.className = "note done";
    }
    noteDiv.setAttribute("data-id", note.id);
    noteDiv.appendChild(document.createTextNode(note.title));
    //create delete btn by span
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    //append btn to main div
    noteDiv.appendChild(span);
    //add task to main tasks div
    notesDiv.appendChild(noteDiv);
  });
}

function addNotesToLocalStorage(arrayOfNotes) {
  window.localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
}
function getNotesFromLocalStorage() {
  let data = window.localStorage.getItem("notes");
  if (data) {
    let notes = JSON.parse(data);
    addElementsToPageFrom(notes);
  }
}

//function to remove note

function deleteNotewith(taskId) {
  // for(let i = 0;i<arrayOfNotes.length;i++){
  // console.log(`${arrayOfNotes[i].id} ===${taskId}`);
  // }
  arrayOfNotes = arrayOfNotes.filter((task) => task.id != taskId);
  addNotesToLocalStorage(arrayOfNotes);
}

function toggleStatusNoteWith(taskId) {
  for (let i = 0; i < arrayOfNotes.length; i++) {
    if (arrayOfNotes[i].id == taskId) {
      arrayOfNotes[i].completed == false
        ? (arrayOfNotes[i].completed = true)
        : (arrayOfNotes[i].completed = false);
    }
  }
  addNotesToLocalStorage(arrayOfNotes);
}

let delteAll = document.createElement("button");
delteAll.className = "delete-all";
delteAll.appendChild(document.createTextNode("Delete All"));
delteAll.onclick = function () {
  window.localStorage.removeItem("notes");
  notesDiv.innerHTML = "";
  arrayOfNotes = [];
};
cont.appendChild(delteAll);

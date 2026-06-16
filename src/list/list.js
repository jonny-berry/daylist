import "../styles.css";
import "./list.css";
import arrowIconLight from "../assets/icons/arrow-light-mode.svg";
import arrowIconDark from "../assets/icons/arrow-dark-mode.svg";
import addIcon from "../assets/icons/add-blue.svg";
import deleteIconLight from "../assets/icons/delete-light-mode.svg";
import deleteIconDark from "../assets/icons/delete-dark-mode.svg";
import checkMarkIcon from "../assets/icons/check-mark.svg";
import xIcon from "../assets/icons/x-icon.svg";
import { getTheme, loadState } from "../storage.js"
import {
  getCurrList,
  updateTodoStatus,
  updateItemName,
  deleteItem,
  addTodo,
  addNote,
  updateTitle,
  userLists,
} from "../list-data.js";



loadState();
renderList(getCurrList());



export function renderList(list) {
  renderHomeArrow();
  renderListInfo(list);
  renderSectionDivider();
  renderTodos(list);
  renderSectionDivider();
  renderNotes(list);
}



function renderHomeArrow() {
  const homeBtn = document.createElement("button");
  homeBtn.className = "home-btn";
  document.body.appendChild(homeBtn);

  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  })
  
  const homeArrow = document.createElement("img");

  getTheme() === "light" || getTheme() === "" ?
  homeArrow.src = arrowIconLight :
  homeArrow.src = arrowIconDark

  homeArrow.className = "home-arrow";
  homeBtn.appendChild(homeArrow);
}



function renderListInfo(list) {
  const container = document.createElement("div");
  container.className = "list-info";
  document.body.appendChild(container);

  const weather = document.createElement("p");
  weather.className = "weather";
  weather.innerText = "☀️ 67°F - 45°F";
  container.appendChild(weather);

  const date = document.createElement("p");
  date.className = "date";
  date.innerText = "📅 Thursday 4/23/26";
  container.appendChild(date);

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = list.title;
  container.appendChild(title);

  title.contentEditable = true;
  title.spellcheck = false;

  title.addEventListener("blur", () => {
    if (!/[a-zA-Z]|[0-9]/.test(title.textContent)) {
      title.textContent = "Add Title";
    }
    updateTitle(list, title);
  })
}



function renderSectionDivider() {
  const divider = document.createElement("div");
  divider.className = "section-divider";
  document.body.appendChild(divider);
}



function addDeleteBtns(list, taskContainer, itemType) {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  taskContainer.appendChild(deleteBtn);

  const deleteImage = document.createElement("img");

  getTheme() === "light" || getTheme() === "" ?
  deleteImage.src = deleteIconLight :
  deleteImage.src = deleteIconDark;

  deleteBtn.appendChild(deleteImage);

  deleteBtn.addEventListener("click", () => {
    const todoListContainer = taskContainer.parentElement;

    todoListContainer.removeChild(taskContainer);
    deleteItem(list, taskContainer.id, itemType);
  })
}



function cycleTaskStatus(list, statusBtn, taskContainer) {
  statusBtn.addEventListener("click", () => {
    updateTodoDisplay(statusBtn);
    updateTodoStatus(list, taskContainer.id);
  });
}



function renderTask(list, taskIndex) {
  const sectionContainer = document.querySelector(".todo-list");

  const taskContainer = document.createElement("div");
  taskContainer.id = list.todos[taskIndex].id;
  taskContainer.className = "task-container";
  sectionContainer.appendChild(taskContainer);

  const button = document.createElement("button");
  button.className = "task-status-btn";
  taskContainer.appendChild(button);

  if (list.todos[taskIndex].status !== "unset") {
    const taskIcon = document.createElement("img");
    taskIcon.className = "task-icon";

    if (list.todos[taskIndex].status === "complete") {
      taskIcon.src = checkMarkIcon;
      button.classList.add("completed-task");
      if (getTheme() === "dark") button.classList.add("completed-task-dark-mode");
    }
    else if (list.todos[taskIndex].status === "incomplete") {
      taskIcon.src = xIcon;
      button.classList.add("incomplete-task");
      if (getTheme() === "dark") button.classList.add("incomplete-task-dark-mode");
    }
    
    button.appendChild(taskIcon);
  }

  const task = document.createElement("p");
  task.innerText = list.todos[taskIndex].name;
  task.className = "task-name"
  task.contentEditable = true;
  taskContainer.appendChild(task);

  setupItemNameEvents(list, task, "todos"); 
  addDeleteBtns(list, taskContainer, "todos");
  cycleTaskStatus(list, button, taskContainer);
}



function renderTodos(list) {
  const container = document.createElement("div");
  container.className = "todo-list";
  document.body.appendChild(container);

  const heading = document.createElement("h2");
  heading.innerText = "To-Do List";
  container.appendChild(heading);

  for (let i = 0; i < list.todos.length; i++) {
    renderTask(list, i);
  }

  renderAddTaskDisplay(list);
}



function setupItemNameEvents(list, itemTextEl, itemType) {
  let itemContainer;
  
  if (itemType === "todos") {
    itemContainer = itemTextEl.parentElement;
  }
  else if (itemType === "notes") {
    itemContainer = itemTextEl.parentElement.parentElement;
  }

  itemTextEl.addEventListener("blur", () => {
    if (!/[a-zA-Z]|[0-9]/.test(itemTextEl.innerText)) {
      itemType === "todos" ? itemTextEl.innerText = "Empty task" : itemTextEl.innerText = "Empty note";
    }
    updateItemName(list, itemTextEl, itemContainer.id, itemType);
  })
}


function updateTodoDisplay(statusBtn) {
  const taskIcon = document.createElement("img");
  taskIcon.className = "task-icon";
  
  statusBtn.innerHTML = "";

  if (statusBtn.classList.contains("completed-task")) {
    statusBtn.classList.remove("completed-task");
    statusBtn.classList.remove("completed-task-dark-mode");
    taskIcon.src = xIcon;
    statusBtn.classList.add("incomplete-task");
    if (getTheme() === "dark") statusBtn.classList.add("incomplete-task-dark-mode");
    statusBtn.appendChild(taskIcon);
  }

  else if (statusBtn.classList.contains("incomplete-task")) {
    statusBtn.classList.remove("incomplete-task");
    statusBtn.classList.remove("incomplete-task-dark-mode");
  }

  else {
    taskIcon.src = checkMarkIcon;
    statusBtn.classList.add("completed-task");
    if (getTheme() === "dark") statusBtn.classList.add("completed-task-dark-mode");
    statusBtn.appendChild(taskIcon);
  }
}



function renderAddTaskDisplay(list) {
  const sectionContainer = document.querySelector(".todo-list");

  const taskContainer = document.createElement("div");
  taskContainer.className = "add-task-container";
  sectionContainer.appendChild(taskContainer);

  const button = document.createElement("button");
  button.className = "add-task-btn";
  if (getTheme() === "dark") button.classList.add("add-task-btn-dark-mode");
  taskContainer.appendChild(button);

  const addEl = document.createElement("img");
  addEl.src = addIcon;
  addEl.className = "task-icon";
  button.appendChild(addEl);

  const task = document.createElement("p");
  task.className = "add-task";
  task.innerText = "Tap to add a task";
  task.contentEditable = true;
  taskContainer.appendChild(task);

  onAddTaskClick(list, task, button);
}



function onAddTaskClick(list, taskTextEl, button) {
  taskTextEl.addEventListener("focus", () => {
    if (taskTextEl.classList.contains("add-task") === true) {
      taskTextEl.innerText = "";
    }
  });
  
  taskTextEl.addEventListener("blur", () => {
    if (taskTextEl.classList.contains("add-task") === true) {
      if (
        /[a-zA-Z]|[0-9]/.test(taskTextEl.innerText) && 
        taskTextEl.innerText !== "Tap to add a task"
      ) {
        convertAddTaskButtonToTask(list, taskTextEl, button);
        renderAddTaskDisplay(list);
      }
      else {
        taskTextEl.innerText = "Tap to add a task";
      }
    }
  });
}


function onAddNoteClick(list, noteTextEl, textSpan) {
  textSpan.addEventListener("focus", () => {
    if (noteTextEl.classList.contains("add-note")) {
      textSpan.innerText = "";
    }

    textSpan.addEventListener("blur", () => {
      if (noteTextEl.classList.contains("add-note") === true) {
        if (
          /[a-zA-Z]|[0-9]/.test(textSpan.innerText) &&
          textSpan.innerText !== "Tap to add a note"
        ) {
          convertAddNoteButtonToNote(list, noteTextEl);
          renderAddNoteDisplay(list);
        } 
        else {
          textSpan.innerText = "Tap to add a note";
        }
      }
    });
  });
}

function convertAddTaskButtonToTask(list, addTaskTextEl, addTaskBtn) {
  addTodo(list, addTaskTextEl);

  const addTaskContainer = addTaskTextEl.parentElement;
  addTaskContainer.id = list.todos.at(-1).id; // Assign final id in todo array
  addTaskContainer.classList.remove("add-task-container");
  addTaskContainer.classList.add("task-container");

  addTaskBtn.classList.remove("add-task-btn");
  addTaskBtn.classList.remove("add-task-btn");
  addTaskBtn.classList.remove("add-task-btn-dark-mode");
  addTaskBtn.classList.add("task-status-btn");
  addTaskBtn.replaceChildren(); // Remove all children

  addTaskTextEl.classList.remove("add-task");
  addTaskTextEl.classList.add("task-name");

  setupItemNameEvents(list, addTaskTextEl, "todos");
  addDeleteBtns(list, addTaskContainer, "todos");
  cycleTaskStatus(list, addTaskBtn, addTaskContainer);
}


function convertAddNoteButtonToNote(list, addNoteTextEl) {
  addNote(list, addNoteTextEl);

  const noteContainer = addNoteTextEl.parentElement;
  noteContainer.id = list.notes.at(-1).id; // Assign final id in notes array
  noteContainer.classList.remove("add-note-container");
  noteContainer.className = "note-container";

  addNoteTextEl.classList.remove("add-note");
  addNoteTextEl.className = "note";

  setupItemNameEvents(list, addNoteTextEl, "notes");
  addDeleteBtns(list, addNoteTextEl.parentElement, "notes");
}



function renderNotes(list) {
  const container = document.createElement("div");
  container.className = "notes";
  document.body.appendChild(container);

  const heading = document.createElement("h2");
  heading.innerText = "Notes";
  container.appendChild(heading);

  const noteList = document.createElement("ul");
  noteList.className = "note-list";
  container.appendChild(noteList);

  for (let i = 0; i < list.notes.length; i++) {
    const noteContatiner = document.createElement("div");
    noteContatiner.id = list.notes[i].id;
    noteContatiner.className = "note-container";
    noteList.appendChild(noteContatiner);

    const bulletPoint = document.createElement("div");
    bulletPoint.className = "bullet-point";
    noteContatiner.appendChild(bulletPoint);

    const note = document.createElement("li");
    note.className = "note";

    const textSpan = document.createElement("span");
    textSpan.contentEditable = true;
    textSpan.className = "note-span";
    textSpan.innerText = list.notes[i].name;
    note.appendChild(textSpan);
    noteContatiner.appendChild(note);

    setupItemNameEvents(list, textSpan, "notes");
    addDeleteBtns(list, noteContatiner, "notes");
  }

  renderAddNoteDisplay(list);
}



function renderAddNoteDisplay(list) {
  const noteList = document.querySelector(".note-list");

  const addNoteContainer = document.createElement("div");
  addNoteContainer.className = "add-note-container";
  noteList.appendChild(addNoteContainer);

  const bulletPoint = document.createElement("div");
  bulletPoint.className = "bullet-point";
  addNoteContainer.appendChild(bulletPoint);

  const note = document.createElement("li");
  note.className = "add-note";

  const textSpan = document.createElement("span");
  textSpan.innerText = "Tap to add a note";
  textSpan.className = "add-note-span";
  textSpan.contentEditable = true;
  note.appendChild(textSpan);
  addNoteContainer.appendChild(note);

  onAddNoteClick(list, note, textSpan);
}

import arrowIcon from "./assets/icons/arrow.svg";
import addIcon from "./assets/icons/add.svg";
import deleteIcon from "./assets/icons/delete.svg";
import checkMarkIcon from "./assets/icons/check-mark.svg";
import xIcon from "./assets/icons/x-icon.svg";
import {
  testList,
  updateTodoStatus,
  updateTodoName,
  deleteTodo,
  addTodo,
  updateTitle,
  updateNoteName
} from "./test-data.js";



renderList(testList);



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
  
  const homeArrow = document.createElement("img");
  homeArrow.src = arrowIcon;
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
  title.innerText = list.title;
  container.appendChild(title);

  title.contentEditable = true;
  title.spellcheck = false;

  title.addEventListener("input", () => {
    if (title.textContent !== "") {
      updateTitle(list, title);
    }
  });

  title.addEventListener("blur", () => {
    if (title.textContent === "") {
      title.textContent = "Add Title";

      updateTitle(list, title);
    }
  })
}



function renderSectionDivider() {
  const divider = document.createElement("div");
  divider.className = "section-divider";
  document.body.appendChild(divider);
}



function addTaskDeleteBtn(list, taskContainer) {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  taskContainer.appendChild(deleteBtn);

  const deleteImage = document.createElement("img");
  deleteImage.src = deleteIcon;
  deleteBtn.appendChild(deleteImage);

  deleteBtn.addEventListener("click", () => {
    const todoListContainer = taskContainer.parentElement;

    todoListContainer.removeChild(taskContainer);
    deleteTodo(list, taskContainer.id);
  })
}



function cycleTaskStatus(list, statusBtn, taskContainer) {
  statusBtn.addEventListener("click", () => {
    updateTodoDisplay(statusBtn);
    updateTodoStatus(testList, taskContainer.id);
  });
}



function renderUnsetTask(list, taskIndex) {
  const sectionContainer = document.querySelector(".todo-list");

  const taskContainer = document.createElement("div");
  taskContainer.id = list.todos[taskIndex].id;
  taskContainer.className = "task-container";
  sectionContainer.appendChild(taskContainer);

  const button = document.createElement("button");
  button.className = "task-status-btn";
  taskContainer.appendChild(button);

  const task = document.createElement("p");
  task.innerText = list.todos[taskIndex].name;
  task.className = "task-name"
  task.contentEditable = true;
  taskContainer.appendChild(task);

  updateTaskName(list, task); 
  addTaskDeleteBtn(list, taskContainer);
  cycleTaskStatus(list, button, taskContainer);
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
      button.className += " completed-task";
    }
    else if (list.todos[taskIndex].status === "incomplete") {
      taskIcon.src = xIcon;
      button.className += " incomplete-task";
    }
    
    button.appendChild(taskIcon);
  }

  const task = document.createElement("p");
  task.innerText = list.todos[taskIndex].name;
  task.className = "task-name"
  task.contentEditable = true;
  taskContainer.appendChild(task);

  updateTaskName(list, task); 
  addTaskDeleteBtn(list, taskContainer);
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



function updateTaskName(list, taskTextEl) {
  taskTextEl.addEventListener("input", () => {
    const taskContainer = taskTextEl.parentElement;

    updateTodoName(testList, taskTextEl, taskContainer.id);
  });
}



function updateTodoDisplay(statusBtn) {
  const taskIcon = document.createElement("img");
  taskIcon.className = "task-icon";
  
  statusBtn.innerHTML = "";

  if (statusBtn.classList.contains("completed-task")) {
    statusBtn.classList.remove("completed-task");
    taskIcon.src = xIcon;
    statusBtn.className += " incomplete-task";
    statusBtn.appendChild(taskIcon);
  }

  else if (statusBtn.classList.contains("incomplete-task")) {
    statusBtn.classList.remove("incomplete-task");
  }

  else {
    taskIcon.src = checkMarkIcon;
    statusBtn.className += " completed-task";
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
  taskTextEl.addEventListener("click", () => {
    taskTextEl.innerText = "";
  });
  
  taskTextEl.addEventListener("blur", () => {
    if (
      taskTextEl.innerText !== "" &&
      taskTextEl.innerText !== "Tap to add a task"
    ) {
      convertAddTaskButtonToTask(list, taskTextEl, button);
      renderAddTaskDisplay(list);
    }
    else {
      taskTextEl.innerText = "Tap to add a task";
    }
  });
}



function convertAddTaskButtonToTask(list, addTaskTextEl, addTaskBtn) {
  addTodo(list, addTaskTextEl);

  const addTaskContainer = addTaskTextEl.parentElement;
  addTaskContainer.id = list.todos.at(-1).id;
  addTaskContainer.classList.remove("add-task-container");
  addTaskContainer.classList.add("task-container");

  addTaskBtn.classList.remove("add-task-btn");
  addTaskBtn.classList.add("task-status-btn");
  addTaskBtn.replaceChildren(); // Remove all children

  addTaskTextEl.classList.remove("add-task");
  addTaskTextEl.classList.add("task-name");

  addTaskDeleteBtn(list, addTaskContainer);
  cycleTaskStatus(list, addTaskBtn, addTaskContainer);
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
    const note = document.createElement("li");
    note.contentEditable = true;
    note.className = "note";
    note.id = list.notes[i].id;
    note.innerText = list.notes[i].name;
    noteList.appendChild(note);

    note.addEventListener("input", () => {
      updateNoteName(list, note);
    });

    note.addEventListener("blur", () => {
      if (note.textContent === "") {
        note.textContent = "Empty note";

        updateNoteName(list, note);
      }
    });
  }

  const note = document.createElement("li");
  note.className = "add-note";
  note.innerText = "Tap to add a note";
  note.contentEditable = true;
  noteList.appendChild(note);
}

import arrowIcon from "./assets/icons/arrow.svg";
import addIcon from "./assets/icons/add.svg";
import checkMarkIcon from "./assets/icons/check-mark.svg";
import xIcon from "./assets/icons/x-icon.svg";
import { testUser, updateTodoStatus } from "./test-data.js";

renderList(testUser);

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
}

function renderSectionDivider() {
  const divider = document.createElement("div");
  divider.className = "section-divider";
  document.body.appendChild(divider);
}

function renderTodos(list) {
  const container = document.createElement("div");
  container.className = "todo-list";
  document.body.appendChild(container);

  const heading = document.createElement("h2");
  heading.innerText = "To-Do List";
  container.appendChild(heading);

  for (let i = 0; i < list.todos.length; i++) {
    const sectionContainer = document.getElementsByClassName("todo-list")[0];

    const taskContainer = document.createElement("div");
    taskContainer.id = list.todos[i].id;
    taskContainer.className = "task-container";
    sectionContainer.appendChild(taskContainer);

    const button = document.createElement("button");
    button.className = "task-status-btn";
    taskContainer.appendChild(button);
    
    if (list.todos[i].status !== "unset") {
      const taskIcon = document.createElement("img");
      taskIcon.className = "task-icon";

      if (list.todos[i].status === "complete") {
        taskIcon.src = checkMarkIcon;
        button.className += " completed-task";
        button.appendChild(taskIcon);
      }

      else if (list.todos[i].status === "incomplete") {
        taskIcon.src = xIcon;
        button.className += " incomplete-task";
        button.appendChild(taskIcon);
      }
    }

    const task = document.createElement("p");
    task.innerText = list.todos[i].name;
    taskContainer.appendChild(task);
  }

  renderAddTaskDisplay();
}

document.querySelectorAll(".task-container").forEach(task => {
  task.addEventListener("click", () => {
    let statusBtn = task.querySelector(".task-status-btn");

    updateTodoDisplay(statusBtn);
    updateTodoStatus(testUser, task.id);
  })
})

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

function renderAddTaskDisplay() {
  const sectionContainer = document.getElementsByClassName("todo-list")[0];

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
  taskContainer.appendChild(task);
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
    note.classList = "note";
    note.innerText = list.notes[i];
    noteList.appendChild(note);
  }

  const note = document.createElement("li");
  note.classList = "note " + " add-note";
  note.innerText = "Tap to add a note";
  noteList.appendChild(note);
}

import arrowIcon from "./assets/icons/arrow.svg";
import addIcon from "./assets/icons/add.svg";

export function renderListPage() {
  renderHomeArrow();
  renderListInfo();
  renderSectionDivider();
  renderTodos();
  renderAddTaskDisplay();
  renderSectionDivider();
  renderNotes();
}

function renderHomeArrow() {
  const homeArrow = document.createElement("img");
  homeArrow.src = arrowIcon;
  homeArrow.className = "home-arrow";
  document.body.appendChild(homeArrow);
}

function renderListInfo() {
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
  title.innerText = "April 23 Daylist";
  container.appendChild(title);
}

function renderSectionDivider() {
  const divider = document.createElement("div");
  divider.className = "section-divider";
  document.body.appendChild(divider);
}

function renderTodos() {
  const container = document.createElement("div");
  container.className = "todo-list";
  document.body.appendChild(container);

  const heading = document.createElement("h2");
  heading.innerText = "To-Do List";
  container.appendChild(heading);
}

function renderAddTaskDisplay() {
  const sectionContainer = document.getElementsByClassName("todo-list")[0];

  const taskContainer = document.createElement("div");
  taskContainer.className = "task-container";
  sectionContainer.appendChild(taskContainer);

  const button = document.createElement("button");
  button.className = "task-state-btn " + "add-task-btn";
  taskContainer.appendChild(button);

  const addEl = document.createElement("img");
  addEl.src = addIcon;
  addEl.className = "add-task-icon"
  button.appendChild(addEl);

  const task = document.createElement("p");
  task.innerText = "Tap to add a task"
  taskContainer.appendChild(task);
}

function renderNotes() {
  const container = document.createElement("div");
  container.className = "notes";
  document.body.appendChild(container);

  const heading = document.createElement("h2");
  heading.innerText = "Notes";
  container.appendChild(heading);

  const noteList = document.createElement("ul");
  noteList.className = "note-list";
  container.appendChild(noteList);
  
  const note = document.createElement("li");
  note.classList = "note";
  note.innerText = "Tap to add a note";
  noteList.appendChild(note);
}

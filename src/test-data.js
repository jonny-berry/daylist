export function createList() {
  let title = "Today's Daylist";

  const id = crypto.randomUUID();

  let todos = [];

  let notes = [];

  return { title, id, todos, notes };
}



export function loadUserLists() {
  const saved = JSON.parse(localStorage.getItem("userLists")) || [];
  saved.forEach(list => userLists.push(list));
}



export let userLists = [];



export function pushUserList(list) {
  userLists.push(list);
}



export let currListId;



export function setCurrListId(id) {
  currListId = id;
}



export function getCurrList() {
  return userLists.find(list => list.id === currListId);
}



export function updateTitle(list, titleEl) {
  list.title = titleEl.textContent;
}



export function updateTodoStatus(list, todoId) {
  let task = list.todos.find(todo => todo.id === todoId);
  
  if (task.status === "unset") { task.status = "complete"; }
  else if (task.status === "complete") { task.status = "incomplete"; }
  else if (task.status === "incomplete") { task.status = "unset"; }
}



export function updateItemName(list, itemTextEl, itemId, itemType) {
  let item = list[itemType].find(item => item.id === itemId);

  item.name = itemTextEl.innerText;
}



export function deleteItem(list, itemId, itemType) {
  let itemIndex = list[itemType].findIndex(item => item.id === itemId)

  list[itemType].splice(itemIndex, 1);
}



export function addTodo(list, taskTextEl) {
  const newTask = {
    name: taskTextEl.innerText,
    status: "unset",
    id: crypto.randomUUID()
  };

  list.todos.push(newTask);
}



export function addNote(list, noteTextEl) {
  const newNote = {
    name: noteTextEl.innerText,
    id: crypto.randomUUID()
  }

  list.notes.push(newNote);
}

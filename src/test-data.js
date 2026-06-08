import { loadState, saveState } from "./storage";



export function createList() {
  const id = crypto.randomUUID();

  let title = "Today's Daylist";

  let todos = [];

  let notes = [];

  let isPinned = false;

  return { id, creationTime, title, todos, notes, isPinned };
}



export function loadUserLists() {
  const saved = JSON.parse(localStorage.getItem("userLists")) || [];
  saved.forEach(list => userLists.push(list));
}



export let userLists = [];




export function prependUserList(list) {
  userLists.unshift(list);

  saveState();
}


export let currListId;



export function setCurrListId(id) {
  currListId = id;
  saveState();
}



export function getCurrList() {
  return userLists.find(list => list.id === currListId);
}



export function updateTitle(list, titleEl) {
  list.title = titleEl.textContent;
  saveState();
}



export function updateTodoStatus(list, todoId) {
  let task = list.todos.find(todo => todo.id === todoId);
  
  if (task.status === "unset") { task.status = "complete"; }
  else if (task.status === "complete") { task.status = "incomplete"; }
  else if (task.status === "incomplete") { task.status = "unset"; }

  saveState();
}



// itemType should be "todos" or "notes"
export function updateItemName(list, itemTextEl, itemId, itemType) {
  let item = list[itemType].find(item => item.id === itemId);

  item.name = itemTextEl.innerText;

  saveState();
}

export function deleteItem(list, itemId, itemType) {
  let itemIndex = list[itemType].findIndex(item => item.id === itemId)

  list[itemType].splice(itemIndex, 1);

  saveState();
}



export function addTodo(list, taskTextEl) {
  const newTask = {
    name: taskTextEl.innerText,
    status: "unset",
    id: crypto.randomUUID()
  };

  list.todos.push(newTask);

  saveState();
}



export function addNote(list, noteTextEl) {
  const newNote = {
    name: noteTextEl.innerText,
    id: crypto.randomUUID()
  }

  list.notes.push(newNote);

  saveState();
}



export function toggleListPin(listId) {
  let list = userLists.find(list => list.id === listId);

  list.isPinned = !list.isPinned;

  saveState();
}

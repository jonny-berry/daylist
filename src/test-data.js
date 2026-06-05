function createList() {
  let title = "Today's Daylist";

  let todos = [
    { name: "Complete task!", status: "complete", id: crypto.randomUUID() },
    { name: "Incomplete task :(", status: "incomplete", id: crypto.randomUUID() },
    { name: "Wait.... I'm unset!!!", status: "unset", id: crypto.randomUUID() }
  ];

  let notes = [
    { name: "This is a note", id: crypto.randomUUID() },
    { name: "Another note????", id: crypto.randomUUID() },
    { name: "Raspberry Lemon", id: crypto.randomUUID() },
    { name: "Beep boop this is a note", id: crypto.randomUUID() }
  ];

  return { title, todos, notes };
}



export const testList = createList();



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

  console.log(list)
}




export function deleteTodo(list, todoId) {
  let taskIndex = list.todos.findIndex(todo => todo.id === todoId);
  
  list.todos.splice(taskIndex, 1);
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
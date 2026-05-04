function createList(title) {
  let todos = [
    { name: "Complete task!", status: "complete", id: crypto.randomUUID() },
    { name: "Incomplete task :(", status: "incomplete", id: crypto.randomUUID() },
    { name: "Wait.... I'm unset!!!", status: "unset", id: crypto.randomUUID() }
  ];

  let notes = [
    "This is a so called note",
    "Issa note",
    "Yet another note. What is going on?",
    "The final note"
  ];

  return { title, todos, notes };
}

export function updateTodoStatus(list, todoId) {
  let task = list.todos.find(todo => todo.id === todoId);
  
  if (task.status === "unset") { task.status = "complete"; }
  else if (task.status === "complete") { task.status = "incomplete"; }
  else if (task.status === "incomplete") { task.status = "unset"; }
}

export function updateTodoName(list, taskTextEl, todoId) {
  let task = list.todos.find(todo => todo.id === todoId);

  task.name = taskTextEl.innerText;
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

export const testList = createList("April 23 Daylist");

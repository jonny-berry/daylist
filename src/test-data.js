function createList(title) {
  let todos = [
    { name: "Im a task!", status:"complete", id:crypto.randomUUID() },
    { name: "Another task?", status:"incomplete", id:crypto.randomUUID() },
    { name: "Wait.... I'm unset!!!", status:"unset", id:crypto.randomUUID() }
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

export const testUser = createList("April 23 Daylist");

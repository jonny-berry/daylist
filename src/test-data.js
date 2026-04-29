function createList(title) {
  let todos = [ ["Im a task!", "complete"], ["Another task?", "incomplete"], ["Wait.... I'm unset!!!", "unset"], ["Okay lets do one more task.", "complete"] ];
  let notes = [ "This is a so called note", "Issa note", "Yet another note. What is going on?", "The final note" ];

  return { title, todos, notes };
}

export const testUser = createList("Boom boom boom");
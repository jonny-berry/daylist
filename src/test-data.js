function createList(title) {
  let todos = [];
  let notes = [];

  return { title, todos, notes };
}

export const testUser = createList("Boom boom boom");
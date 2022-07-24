const getTodos = (state) => state.todos.todos;
const getFilter = (state) => state.todos.filter;

  const getVisibleContacts = (state) =>{
      const todos = getTodos(state);
      const filter = getFilter(state);

      return todos.filter(({ name }) => name.toLowerCase().includes(filter));
  }
  
 export { getTodos, getFilter, getVisibleContacts };
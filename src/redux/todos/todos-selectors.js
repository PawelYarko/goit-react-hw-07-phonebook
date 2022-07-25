import { createSelector } from "@reduxjs/toolkit"

const getTodos = (state) => state.todos.todos;
const getFilter = (state) => state.filter;
const getStatus = (state) => state.todos.status;
const getError = (state) => state.todos.error;

  const getVisibleContacts = createSelector([getTodos, getFilter], (todos, filter) =>{
      return todos.filter(({ name }) => name.toLowerCase().includes(filter));
  });

 export { getTodos, getFilter, getStatus, getError, getVisibleContacts };
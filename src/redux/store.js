import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos/todos-reducers';
import filter from './todos/todos-filter';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter
  },
  },);

export default store;

import { configureStore } from '@reduxjs/toolkit';

import todosReducer from './todos/todos-reducers';


const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  },);

export default store;

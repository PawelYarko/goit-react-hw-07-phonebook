import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { fetchTodos, removeTodo } from './todos-operations';


const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },

  reducers: {
    addTodo(state, { payload }) {
      state.todos = [
        ...state.todos,
        {
          id: nanoid(),
          ...payload,
        },
      ];
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(({ id }) => id !== action.payload.id);
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, _action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.payload;
    },
    [removeTodo.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, changeFilter } = todoSlice.actions;
export default todoSlice.reducer;

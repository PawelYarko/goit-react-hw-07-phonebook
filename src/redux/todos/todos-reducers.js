import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://62d5e3f115ad24cbf2ce8796.mockapi.io/contacts'
      );

      if (!response.ok) {
        throw new Error('error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://62d5e3f115ad24cbf2ce8796.mockapi.io/contacts/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('error');
      }
      dispatch(deleteTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (info, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        id: nanoid(),
        ...info,
      };
      const response = await fetch(
        'https://62d5e3f115ad24cbf2ce8796.mockapi.io/contacts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error('error');
      }
      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    filter: '',
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
    changeFilter(state, { payload }) {
      state.filter = payload;
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

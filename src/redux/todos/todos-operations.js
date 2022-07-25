import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo, deleteTodo } from './todos-reducers';
import { nanoid } from 'nanoid';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {
      try {
        const response = await fetch(
          'https://62d5e3f115ad24cbf2ce8796.mockapi.io/contacts'
        );
  
        if (!response.ok) {
          throw rejectWithValue('error');
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
          throw rejectWithValue('error');
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
          `https://62d5e3f115ad24cbf2ce8796.mockapi.io/contacts?search=${info.name}`, 
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
          }
        );
  
        if (!response.ok) {
          throw rejectWithValue('error');
        }
        const data = await response.json();
        dispatch(addTodo(data));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
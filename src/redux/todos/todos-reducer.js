import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function() {
        const response = await fetch('https://62d5e3f115ad24cbf2ce8796.mockapi.io/contacts');
        const data = await response.json();
        return data;
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState:{
        todos:[],
        filter:'',
    },
    
    reducers:{
        addTodo(state, actions){
            state.todos.push({
                id: nanoid(),
                name: actions.payload.name,
                number: actions.payload.number,})
        },
        deleteTodo(state, actions){
            state.todos = state.todos.filter(({id}) => id !== actions.payload.id)   
        },
        changeFilter(state, {payload}){
            state.filter = payload;
        },

        // extraReducer
    }
})

export const {addTodo, deleteTodo, changeFilter} = todoSlice.actions;
export default todoSlice.reducer;
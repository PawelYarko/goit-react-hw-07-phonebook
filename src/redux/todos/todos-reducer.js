import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function() {
        const response = await fetch('https://62d5e3f115ad24cbf2ce8796.mockapi.io/contacts');  //  ?_limit=5
        const data = await response.json();
        return data;
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState:{
        todos:[],
        filter:'',
        status: null,
        error: null,
    },
    
    reducers:{
        addTodo(state, action){
            state.todos.push({
                id: nanoid(),
                name: action.payload.name,
                phone: action.payload.phone,})
        },
        deleteTodo(state, action){
            state.todos = state.todos.filter(({id}) => id !== action.payload.id)   
        },
        changeFilter(state, {payload}){
            state.filter = payload;
        },
},
        extraReducer:{
            [fetchTodos.pending]:(state, _) => {
                state.status = 'loading';
                state.error = null;
            },
            [fetchTodos.fulfilled]: (state, action) => {
                state.status = 'resolved';
                state.todos.push(action.payload);
            },
            [fetchTodos.rejected]:(state, _) => {
                state.status = 'reject';
                // state.error = 'error';
            },  
        }
    
})

export const {addTodo, deleteTodo, changeFilter} = todoSlice.actions;
export default todoSlice.reducer;
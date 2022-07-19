import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import { nanoid } from 'nanoid';
// import  actions from './todos-actions';

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
        // items(){
        //     [actions.addTodo]: (state, {payload}) => [...state, payload],
        //     [actions.deleteTodo]: (state, {payload}) => state.filter(({id}) => id !== payload),
        // },

        // filter(){
        //     [actions.changeFilter]: (_, {payload}) => payload,
        // },

//         import {createAction} from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// const addTodo = createAction('todos/add', ({name, number}) => ({
    // payload:{
    //     id: nanoid(),
    //     name,
    //     number,
    // }
// }) );

// const changeFilter = createAction('todos/filter');

// const deleteTodo = createAction('todos/delete');
// // eslint-disable-next-line
// export default {addTodo , changeFilter, deleteTodo};



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

// const items = createReducer([], {
//     [actions.addTodo]: (state, {payload}) => [...state, payload],
//     [actions.deleteTodo]: (state, {payload}) => state.filter(({id}) => id !== payload),
// });


// const filter = createReducer('', {
//     [actions.changeFilter]: (_, {payload}) => payload,
// });


// export default combineReducers({
//       items,
//       filter
// });
export const {addTodo, deleteTodo, changeFilter} = todoSlice.actions;
export default todoSlice.reducer;
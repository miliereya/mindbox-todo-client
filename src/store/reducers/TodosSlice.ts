import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITodo } from "../../models/ITodo"
import { v4 as uuid } from 'uuid'

interface TodosSlice {
    todos: ITodo[]
}

const initialState: TodosSlice = {
    todos: []
}

export const TodosSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos(state, action: PayloadAction<ITodo[]>) {
            state.todos = action.payload
        },
        addTodo(state, action: PayloadAction<ITodo>) {
            let id = uuid()
            action.payload.id = id
            state.todos.push(action.payload)
        },
        updateTodo(state, action: PayloadAction<ITodo>) {
            let todos = state.todos
            for (let i = 0; i < todos.length; i++) {
                if (action.payload.id === todos[i].id) {
                    state.todos[i] = action.payload
                }
            }
        },
        deleteTodo(state, action: PayloadAction<string>) {
            let todos = state.todos
            let helpArr: ITodo[] = []
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id !== action.payload) {
                    helpArr.push(todos[i])
                }
            }
            state.todos = helpArr
        },
        deleteCompletedTodos(state) {
            let todos = state.todos
            let helpArr: ITodo[] = []
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].status !== 'done') {
                    helpArr.push(todos[i])
                }
            }
            state.todos = helpArr
        }
    },

})

export default TodosSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ColorsArr, ITodo, TColors, TStatus } from "../../models/ITodo"

const initialState: ITodo = {
    id: '',
    title: '',
    status: 'not active',
    description: '',
    color: ColorsArr[0],
    date: ''
}

export const AddTodoSlice = createSlice({
    name: 'addTodo',
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        setStatus(state, action: PayloadAction<TStatus>) {
            state.status = action.payload
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload
        },
        setColor(state, action: PayloadAction<TColors>) {
            state.color = action.payload
        },
        setDate(state, action: PayloadAction<string>) {
            state.date = action.payload
        },
    },

})

export default AddTodoSlice.reducer
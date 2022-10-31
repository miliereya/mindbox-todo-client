import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import globalSlice from './reducers/GlobalSlice'
import UserSlice from './reducers/UserSlice'
import AddTodoSlice from './reducers/AddTodoSlice'
import TodosSlice from './reducers/TodosSlice'
import { userAPI } from '../services/UserService'

const rootReducer = combineReducers({
    globalSlice,
    UserSlice,
    AddTodoSlice,
    TodosSlice,
    [userAPI.reducerPath]: userAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([userAPI.middleware, userAPI.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
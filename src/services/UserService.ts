import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { SERVER_API } from '../config'
import { ITodo } from '../models/ITodo'
import { SignRequest } from '../models/request/SignRequest'
import { AuthResponse } from '../models/response/AuthResponse'
import { GlobalSlice } from '../store/reducers/GlobalSlice'
import { TodosSlice } from '../store/reducers/TodosSlice'
import { userSlice } from '../store/reducers/UserSlice'

const { setAuth, setUser } = userSlice.actions
const { setLoading } = GlobalSlice.actions
const { setTodos } = TodosSlice.actions

const setAuthData = async (dispatch: any, queryFulfilled: any) => {
    const { data } = await queryFulfilled
    localStorage.setItem('token', data.accessToken)
    dispatch(setAuth(true))
    dispatch(setUser(data.user))
    dispatch(setTodos(data.user.todos))
}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_API}/api/user` }),
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, SignRequest>({
            query: (SignRequest) => ({
                url: 'login',
                method: 'POST',
                body: {
                    ...SignRequest
                },
                credentials: 'include'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true))
                    await setAuthData(dispatch, queryFulfilled)
                } catch (error) { }
                finally {
                    dispatch(setLoading(false))
                }
            },
        }),
        register: build.mutation<AuthResponse, SignRequest>({
            query: (SignRequest) => ({
                url: 'registration',
                method: 'POST',
                body: {
                    ...SignRequest
                },
                credentials: 'include'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true))
                    await setAuthData(dispatch, queryFulfilled)
                } catch (error) { }
                finally {
                    dispatch(setLoading(false))
                }
            },
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
                credentials: 'include'
            })
        }),
        refresh: build.mutation<AuthResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'POST',
                credentials: 'include'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true))
                    await setAuthData(dispatch, queryFulfilled)
                } catch (error) { }
                finally {
                    dispatch(setLoading(false))
                }
            },
        }),
        updateTodos: build.mutation<ITodo[], ITodo[]>({
            query: (todos) => ({
                url: 'update',
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: {
                    todos
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true))
                    await queryFulfilled
                } catch (error) { }
                finally {
                    dispatch(setLoading(false))
                }
            },
        }),
    })
})
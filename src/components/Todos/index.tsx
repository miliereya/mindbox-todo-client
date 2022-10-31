import s from './Todos.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { AddTodo } from '../AddTodo'
import { TodoItem } from '../TodoItem/intex'
import { calculatePagginationArray, calculateShowingResults } from '../../utils/paggination'
import { useState } from 'react'
import ArrowIcon from '../../icons/small-arrow.png'
import { ITodo } from '../../models/ITodo'
import { TodosSlice } from '../../store/reducers/TodosSlice'

type TFilter = 'all' | 'done' | 'in process' | 'not active'

export const Todos = () => {
    const [filter, setFilter] = useState<TFilter>('all')
    const { isAuth } = useAppSelector(state => state.UserSlice)
    const { text, isLoading } = useAppSelector(state => state.globalSlice)
    const { todos: todosState } = useAppSelector(state => state.TodosSlice)
    const { deleteCompletedTodos } = TodosSlice.actions

    const dispatch = useAppDispatch()

    let todos: ITodo[] = []
    for (let i = 0; i < todosState.length; i++) {
        if (filter === 'all') {
            todos.push(todosState[i])
        } else {
            if (filter === todosState[i].status) {
                todos.push(todosState[i])
            }
        }
    }

    const [choosenPage, setChoosenPage] = useState<number>(1)
    const [filterPopupToogle, setFilterPopupToogle] = useState<boolean>(false)
    const step = 5

    const paggArr = calculatePagginationArray(step, todos.length)
    const filters: TFilter[] = ['all', 'done', 'in process', 'not active']

    if (!isAuth && isLoading) return <div></div>

    if (!isAuth) return (
        <div className={s.section}>
            <p className={s.auth_warning}>{text.registr_warning}</p>
        </div>
    )

    return (
        <div className={s.section}>
            <AddTodo />
            <div className={s.filter_wrapper}>
                <p className={s.filter}>{text.filter}: <span>{filter}</span>
                    <button onClick={() => setFilterPopupToogle(!filterPopupToogle)}>
                        <img
                            className={s.arrow_icon}
                            src={ArrowIcon}
                            alt="arrow"
                            style={{ rotate: filterPopupToogle ? '270deg' : '90deg' }}
                        />
                    </button>
                    <div className={s.filter_popup} style={{ display: filterPopupToogle ? 'flex' : 'none' }}>
                        {filters.map(filter => {
                            return (
                                <button
                                    key={filter}
                                    className={s.filter_btn}
                                    onClick={() => { setFilter(filter); setFilterPopupToogle(false) }}
                                >
                                    {filter}
                                </button>
                            )
                        })}
                    </div>
                </p>

                <p className={s.results}>
                    {text.showing}{todos.length > step ? ' ' + calculateShowingResults(choosenPage, step, todos.length) :
                        ` ${todos.length}`} {text.of} {todos.length} {text.tasks}
                </p>
                <button
                    className={s.clear_btn}
                    onClick={() => {dispatch(deleteCompletedTodos());setChoosenPage(1)}}
                >
                    {text.clear_completed}
                </button>
            </div>
            {todos.map((todo, index) => {
                if (index < choosenPage * step - step || index > choosenPage * step - 1) return
                return (
                    <TodoItem key={todo.id} todo={todo} />
                )
            })}
            <div className={s.paggination_wrapper}>
                {paggArr.map(num => {
                    return (
                        <button
                            key={num}
                            className={s.paggination_button}
                            style={num === choosenPage ? {
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-white)'
                            } : {}}
                            onClick={() => (setChoosenPage(num), window.scrollTo(0, 0))}
                        >
                            {num}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
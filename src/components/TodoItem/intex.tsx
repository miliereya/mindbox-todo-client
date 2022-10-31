import s from './TodoItem.module.css'
import { FC, useState } from 'react'
import { ITodo, TStatus } from '../../models/ITodo'
import ArrowIcon from '../../icons/arrow.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { TodosSlice } from '../../store/reducers/TodosSlice'

interface TodoItemProps {
    todo: ITodo
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const { id, title, description, color, date, status } = todo
    const { text } = useAppSelector(state => state.globalSlice)

    const todoCopy = { ...todo }

    const dispatch = useAppDispatch()
    const { updateTodo, deleteTodo } = TodosSlice.actions

    const [toogle, setToogle] = useState<boolean>(false)

    const setStatus = (st: TStatus) => {
        if (status === st) {
            return
        }
        todoCopy.status = st
        dispatch(updateTodo(todoCopy))
    }

    return (
        <div className={s.section} style={{ backgroundColor: color }}>
            <div className={s.wrapper}>
                <button
                    className={s.arrow_btn}
                    onClick={() => setToogle(!toogle)}
                >
                    <img
                        src={ArrowIcon}
                        className={toogle ? s.arrowDown : s.arrow}
                        alt="arrow"
                    />
                </button>
                <div className={s.top_wrapper}>
                    <p className={s.heading}>{title}</p>
                    <div className={s.status_wrapper}>
                        <button
                            onClick={() => setStatus('not active')}
                            className={s.status_btn}
                            style={status === 'not active' ? { backgroundColor: '#f00e0e', opacity: 1, borderRadius: '15px 0 0 15px' } : { borderRadius: '15px 0 0 15px' }}
                        >
                            {text.status_not_started_yet}
                        </button>
                        <button
                            onClick={() => setStatus('in process')}
                            className={s.status_btn}
                            style={status === 'in process' ? { backgroundColor: '#def01a', opacity: 1 } : undefined}
                        >
                            {text.status_in_process}
                        </button>
                        <button
                            onClick={() => setStatus('done')}
                            className={s.status_btn}
                            style={status === 'done' ? { backgroundColor: '#009e1a', opacity: 1, borderRadius: '0 15px 15px 0' } : { borderRadius: '0 15px 15px 0' }}
                        >
                            {text.status_done}
                        </button>
                    </div>
                </div>
            </div>
            {toogle &&
                <div className={s.toogle_wrapper}>
                    <div className={s.desc_wrapper}>
                        <p className={s.description}>{description}</p>
                        <p className={s.date}>{text.date}: {date}</p>
                    </div>
                    <button
                        className={s.add_button}
                        onClick={() => dispatch(deleteTodo(id))}
                    >
                        {text.delete}
                    </button>
                </div>
            }
        </div>
    )
}
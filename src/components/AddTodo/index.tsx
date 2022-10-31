import s from './AddTodo.module.css'
import ArrowIcon from '../../icons/arrow.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useState } from 'react'
import { ColorsArr, ITodo } from '../../models/ITodo'
import { AddTodoSlice } from '../../store/reducers/AddTodoSlice'
import { TodosSlice } from '../../store/reducers/TodosSlice'

export const AddTodo = () => {
    const { text } = useAppSelector(state => state.globalSlice)
    const [toogle, setToogle] = useState<boolean>()

    const dispatch = useAppDispatch()

    const { title, description, color: choosenColor, date, status } = useAppSelector(state => state.AddTodoSlice)
    const { setTitle, setDescription, setColor, setDate, setStatus } = AddTodoSlice.actions
    const { addTodo } = TodosSlice.actions
    const [titleError, setTitleError] = useState<boolean>(false)
    const [descError, setDescError] = useState<boolean>(false)
    const [dateError, setDateError] = useState<boolean>(false)

    const addTaskHandler = () => {
        setTitleError(false)
        setDescError(false)
        setDateError(false)
        let error = false

        if(title === '' || title.length > 30) {
            setTitleError(true)
            error = true
        }
        if(description === '') {
            setDescError(true)
            error = true
        }
        if(date.length !== 10 || new Date('2020-01-01') > new Date(date) || new Date('2030-01-01') < new Date(date)) {
            setDateError(true)
            error = true
        }

        if(error) return

        const task: ITodo = {
            id: '',
            title,
            description,
            color: choosenColor,
            date,
            status
        }
        dispatch(addTodo(task))
        dispatch(setTitle(''))
        dispatch(setDescription(''))
    }

    return (
        <div className={s.section}>
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
                <p className={s.heading}>{text.add}!</p>
            </div>
            {toogle &&
                <div className={s.toogle_wrapper}>
                    <div className={s.input_wrapper}>
                        <div className={s.col_1}>
                            <input
                                className={s.input_title}
                                type="text"
                                value={title}
                                onChange={(e) => dispatch(setTitle(e.target.value))}
                                placeholder={text.title}
                                style={titleError ? {border: '2px solid var(--color-error)'} : {border: '2px solid var(--color-secondary)'}}
                            />
                            <textarea
                                className={s.input_desc}
                                value={description}
                                onChange={(e) => dispatch(setDescription(e.target.value))}
                                placeholder={text.desc}
                                rows={5}
                                style={descError ? {border: '2px solid var(--color-error)'} : {border: '2px solid var(--color-secondary)'}}
                            />
                        </div>
                        <div className={s.col_2}>
                            <p className={s.status_heading}>{text.choose_status}</p>
                            <div className={s.status_wrapper}>
                                <button
                                    onClick={() => dispatch(setStatus('not active'))}
                                    className={s.status_btn}
                                    style={status === 'not active' ? { backgroundColor: '#f00e0e', opacity: 1, borderRadius: '15px 0 0 15px' } : { borderRadius: '15px 0 0 15px' }}
                                >
                                    {text.status_not_started_yet}
                                </button>
                                <button
                                    onClick={() => dispatch(setStatus('in process'))}
                                    className={s.status_btn}
                                    style={status === 'in process' ? { backgroundColor: '#def01a', opacity: 1 } : undefined}
                                >
                                    {text.status_in_process}
                                </button>
                                <button
                                    onClick={() => dispatch(setStatus('done'))}
                                    className={s.status_btn}
                                    style={status === 'done' ? { backgroundColor: '#009e1a', opacity: 1, borderRadius: '0 15px 15px 0' } : { borderRadius: '0 15px 15px 0' }}
                                >
                                    {text.status_done}
                                </button>
                            </div>
                            <p className={s.status_heading}>{text.choose_date}{dateError && <span>(2020-01-01 - 2030-01-01)</span>}</p>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => dispatch(setDate(e.target.value))}
                                className={s.date_input}
                                min='2022-01-01'
                                max='2032-01-01'
                                style={dateError ? {border: '2px solid var(--color-error)'} : {border: '2px solid var(--color-secondary)'}}
                            />
                            <p className={s.color_heading}>{text.color}</p>
                            <div className={s.choose_color}>
                                {ColorsArr.map(color => {
                                    return (
                                        <button
                                            key={color}
                                            style={{
                                                backgroundColor: color, border: choosenColor === color ? '3px solid #f00e0e' : '3px solid var(--color-secondary)'
                                            }}
                                            className={s.color_btn}
                                            onClick={() => dispatch(setColor(color))}
                                        >

                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button
                        className={s.add_button}
                        onClick={addTaskHandler}
                    >
                        +
                    </button>
                </div>
            }
        </div>
    )
}
import { SignRequest } from '../../models/request/SignRequest'
import { userAPI } from '../../services/UserService'
import s from './SignPopup.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'

export const SignPopup = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const [login, { error: loginError }] = userAPI.useLoginMutation()
    const [register, { error: registerError }] = userAPI.useRegisterMutation()

    const { isAuth } = useAppSelector(state => state.UserSlice)
    const { text } = useAppSelector(state => state.globalSlice)


    const credentials: SignRequest = {
        email: email,
        password: password
    }

    useEffect(() => {
        if (loginError) {
            const e: any = { ...loginError }
            setError(e.data.message)
        }
        if (registerError) {
            const e: any = { ...registerError }
            setError(e.data.message)
        }
    }, [loginError, registerError])

    const reigsterHandler = () => {
        setError('')
        if (password.length < 6) {
            return setError('Password length should be more than 6 symbols')
        }
        register(credentials)
    }

    const loginHandler = () => {
        setError('')
        login(credentials)
    }

    return (
        <div className={s.section}>
            <div className={s.form}>
                <p className={s.heading}>{text.registr_form}</p>
                <input
                    className={s.input}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder='Email'
                />
                <input
                    className={s.input}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='Password'
                />
                <div className={s.btn_wrapper}>
                    <button
                        className={s.btn}
                        onClick={loginHandler}
                    >
                        {text.login}
                    </button>
                    <button
                        className={s.btn}
                        onClick={reigsterHandler}
                    >
                        {text.signup}
                    </button>
                </div>
                {error && <p className={s.error}>{error}</p>}
            </div>
        </div>
    )
}
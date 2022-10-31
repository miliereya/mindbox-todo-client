import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { GlobalSlice } from '../../store/reducers/GlobalSlice'
import s from './Header.module.css'
import { useState } from 'react'
import { SignPopup } from '../SignPopup'
import logoutIcon from '../../icons/logout.png'
import { userAPI } from '../../services/UserService'
import { userSlice } from '../../store/reducers/UserSlice'

export const Header = () => {
    const dispatch = useAppDispatch()
    const { text, isLoading } = useAppSelector(state => state.globalSlice)
    const { isAuth, user } = useAppSelector(state => state.UserSlice)
    const { setLanguage } = GlobalSlice.actions
    const { logout } = userSlice.actions
    const [logoutAPI] = userAPI.useLogoutMutation()

    const [signToogle, setSignToogle] = useState<boolean>(false)

    const logoutHanlder = async () => {
        dispatch(logout())
        logoutAPI()
        localStorage.removeItem('token')
    }

    const languageHandler = () => {
        dispatch(setLanguage(text.swap_language_btn))
        localStorage.setItem('language', text.swap_language_btn)
    }

    return (
        <header className={s.section}>
            <div className="container">
                <div className={s.wrapper}>
                    <h1 className={s.heading}>To-do-list</h1>
                    <div className={s.btn_wrapper}>
                        {isAuth && user.email ?
                            <div className={s.user_wrapper}>
                                <p className={s.email}>{user.email}</p>
                                <button onClick={logoutHanlder}>
                                    <img className={s.logout_icon} src={logoutIcon} alt="logout" />
                                </button>
                            </div>
                            :
                            !isLoading && <button
                                onClick={() => setSignToogle(!signToogle)}
                                className={s.btn}
                                disabled={isLoading}
                            >
                                {text.registration_btn}
                            </button>
                        }
                        <button
                            onClick={languageHandler}
                            className={s.btn_language}
                            disabled={isLoading}
                        >
                            {text.swap_language_btn}
                        </button>
                    </div>
                </div>
                {signToogle && !isAuth && <SignPopup />}
            </div>
        </header>
    )
}
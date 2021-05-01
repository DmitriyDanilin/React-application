import React from 'react'
import s from './Login.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { CreateField, Input } from '../common/FormControls/FormControls'
import required, { maxLengthCreator } from '../../Utilits/Validators/validators'
import { connect, useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../redux/auth-reduser'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'

type LoginFormOwnProps = {
    captchaURL: string | null
}


export const Login: React.FC = () => {
    const captchaURL = useSelector ((state: AppStateType) => state.auth.captchaURL)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    
    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormType) => {
        dispatch(logIn(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }
    if (isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <div>
            <h1>Login Form</h1>
            <LoginReduxForm onSubmit={onSubmit}
                captchaURL={captchaURL} />
        </div>
    )
}



const LoginForm: React.FC<InjectedFormProps<LoginFormType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaURL }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {CreateField<LoginFormPropertiesType>("Email", "email", [required], Input)}
            </div>
            <div>
                {CreateField<LoginFormPropertiesType>("Password", "password", [required], Input, "password")}
            </div>
            <div>
            {CreateField<LoginFormPropertiesType>(undefined, "rememberMe", [], "input", "checkbox")}<span>  Remember me</span>
            </div>
            {captchaURL && <img className={s.captcha} src={captchaURL}></img>}
            
            {captchaURL &&  CreateField<LoginFormPropertiesType>(undefined, "captcha", [required], Input)}
            { error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button className={s.loginBTN}>Login</button>
            </div>
        </form>
    )
}

type LoginFormPropertiesType = Extract< keyof LoginFormType, string> // type includes key of LoginFormType, to limim posible names of fields

export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}



const LoginReduxForm = reduxForm<LoginFormType, LoginFormOwnProps>({
    form: 'Login'
})(LoginForm)

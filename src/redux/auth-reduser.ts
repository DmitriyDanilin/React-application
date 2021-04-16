import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, securityAPI } from "../API/api";
import { AppStateType, InferActionsTypes } from "./redux-store";
import {ResultCodeEnum} from "./../API/api"

export type initialStateType ={
    userID: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean,
    captchaURL: null | string
}

let initialState:initialStateType  = {
    userID: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
};

const authReducer = (state = initialState, action: ActionsType):initialStateType  => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>


export const actions ={
    setAuthUserData: (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {
            type: 'SET_USER_DATA', payload:
                { userID, email, login, isAuth }
        }
    },
    getCaptchaURLSuccess: (captcha: string) => {
        return {
            type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captcha}
        }
    }

}


//thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let response = await authAPI.authMe();

    if (response.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } 
    else{
        if (response.resultCode === ResultCodeEnum.CaptchRequired){
            dispatch(getCaptchaURL());
        }
        let message = response.messages.length > 0 ? response.messages[0] : "Some error"
        //@ts-ignore
        dispatch(stopSubmit("Login", { _error: message }));
    }
}

export const logout = ():ThunkType => async (dispatch) => {

    let response = await authAPI.logout()

    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }

}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {

    const response = await securityAPI.getCaptcha();
    const captchaURL = response.url;

    dispatch(actions.getCaptchaURLSuccess(captchaURL));
}

export default authReducer;
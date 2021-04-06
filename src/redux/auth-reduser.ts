import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../API/api";


const SET_USER_DATA = '/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

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

const authReducer = (state = initialState, action: any):initialStateType  => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
type SetAuthUserDataActionPayloadType ={
    userID: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType ={
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA, payload:
            { userID, email, login, isAuth }
    }
}
type GetCaptchaURLSuccessActionType ={
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captcha: string}
}

export const getCaptchaURLSuccess = (captcha: string): GetCaptchaURLSuccessActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS, payload: {captcha}
    }
}


export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.authMe();

    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } 
    else{
        if (response.data.resultCode === 10){
            dispatch(getCaptchaURL());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("Login", { _error: message }));
    }
}

export const logout = () => async (dispatch: any) => {

    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }

}

export const getCaptchaURL = () => async (dispatch: any) => {

    const response = await securityAPI.getCaptcha();
    const captchaURL = response.data.url;

    dispatch(getCaptchaURLSuccess(captchaURL));
}

export default authReducer;
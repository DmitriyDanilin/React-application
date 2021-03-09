import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../API/api";


const SET_USER_DATA = '/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";


let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaURL: action.captcha
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userID, email, login, isAuth) => {
    return {
        type: SET_USER_DATA, payload:
            { userID, email, login, isAuth }
    }
}

export const getCaptchaURLSuccess = (captcha) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS, captcha
    }
}


export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.authMe();

    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const logIn = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {

    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }

}

export const getCaptchaURL = () => async (dispatch) => {

    const response = await securityAPI.getCaptcha();
    const captchaURL = response.data.url;

    dispatch(getCaptchaURLSuccess(captchaURL));
}

export default authReducer;
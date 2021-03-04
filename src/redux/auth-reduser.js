import { stopSubmit } from "redux-form";
import { authAPI } from "../API/api";


const SET_USER_DATA = '/auth/SET_USER_DATA';


let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userID, email, login, isAuth) => { return { type: SET_USER_DATA, payload: { userID, email, login, isAuth } } }

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.authMe();

    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const logIn = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
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


export default authReducer;
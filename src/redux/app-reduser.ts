import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reduser";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESED = 'INITIALIZED_SUCCESED';

export type initialStateType = {
    isInitialized: boolean
}
type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESED
};


let initialState: initialStateType = {
    isInitialized: false
}; 

const appReduser = (state = initialState, action: initializedSuccessActionType):initialStateType  => {
    switch (action.type) {
        case INITIALIZED_SUCCESED: 
            return {
                ...state,
                isInitialized : true
            }
        default:
            return state;
    }
}
export const initializedSuccess  = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESED})

type ThunkType = ThunkAction<void, AppStateType, unknown, initializedSuccessActionType>

export const initilizeApp = ():ThunkType  => (dispatch, getState) =>{
    let dispatchPromise = dispatch(getAuthUserData());
    dispatchPromise.then(()=>{
        dispatch(initializedSuccess());
    })
    
}

export default appReduser;
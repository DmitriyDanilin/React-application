import { getAuthUserData } from "./auth-reduser";

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

export const initilizeApp = () => (dispatch: any) =>{
    let dispatchPromise = dispatch(getAuthUserData());
    dispatchPromise.then(()=>{
        dispatch(initializedSuccess());
    })
    
}

export default appReduser;
import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reduser";
import { AppStateType, InferActionsTypes } from "./redux-store";

export type initialStateType = {
    isInitialized: boolean
}

let initialState: initialStateType = {
    isInitialized: false
}; 


const appReduser = (state = initialState, action: ActionsType):initialStateType  => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESED': 
            return {
                ...state,
                isInitialized : true
            }
        default:
            return state;
    }
}


const actions ={
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESED'} as const)
}

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const initilizeApp = ():ThunkType  => (dispatch) =>{
    let dispatchPromise = dispatch(getAuthUserData());

    Promise.all([dispatchPromise]).then(()=>{
        dispatch(actions.initializedSuccess());
    })
    
}

export default appReduser;
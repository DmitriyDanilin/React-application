import {
    combineReducers, createStore,
    applyMiddleware, compose
} from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reduser"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReduser from "./app-reduser"
import chatReducer from "./chat-reduser"


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReduser,
    chatPage: chatReducer
});

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesTypes<T>> 

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // this is browser extention for store managment


const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.store = store

export default store
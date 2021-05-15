import { profileAPI } from "../API/profile-api";
import { usersAPI } from "../API/users-api";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types"
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { chatAPI, createChannel, MessageType } from "../API/chat-api";
import { Dispatch } from "redux";

let initialState = {
    messages: [] as MessageType[]

};

export type initialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case "/chat/MESSAGES_RECEIVED":
            return{
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}

//ACs
export const actions = {
    messagesReceived: (messages: MessageType[] ) => ({ type: '/chat/MESSAGES_RECEIVED', payload: {messages} }as const)
}


//thunks
let _newMessageHandler: ((messages: MessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) =>  {
    if (_newMessageHandler !== null) {
        return _newMessageHandler
    }
    _newMessageHandler = (messages: MessageType[]) => {
    dispatch(actions.messagesReceived(messages))
    }
    return _newMessageHandler
}

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType | ReturnType<typeof stopSubmit>>

export const startMessagesListening = ():ThunksType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = ():ThunksType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string):ThunksType => async (dispatch) => {
     chatAPI.sendMessage(message)
}

export default chatReducer;
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { chatAPI, MessageType, StatusType } from "../API/chat-api";
import { Dispatch } from "redux";

let initialState = {
    messages: [] as MessageType[],
    status: 'ready' as StatusType
};


export type initialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case "/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case "/chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

//ACs
export const actions = {
    messagesReceived: (messages: MessageType[]) => 
    ({ type: '/chat/MESSAGES_RECEIVED', payload: { messages } } as const),
    statusChanged: (status: StatusType) => 
    ({ type: '/chat/STATUS_CHANGED', payload: { status } } as const)
}


//thunks


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType | ReturnType<typeof stopSubmit>>

let _newMessageHandler: ((messages: MessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler !== null) {
        return _newMessageHandler
    }
    _newMessageHandler = (messages: MessageType[]) => {
        dispatch(actions.messagesReceived(messages))
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler !== null) {
        return _statusChangedHandler
    }
    _statusChangedHandler = (status: StatusType) => {
        dispatch(actions.statusChanged(status))
    }
    return _statusChangedHandler
}



export const startMessagesListening = (): ThunksType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed',statusChangedHandlerCreator(dispatch) )
}
export const stopMessagesListening = (): ThunksType => async (dispatch) => {
    chatAPI.unsubscribe('message-received',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunksType => async () => {
    chatAPI.sendMessage(message)
}

export default chatReducer;
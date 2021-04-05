type initialStateType = {
 dialogs: { id: number, name: string }[],
 messages: {id: number, message: string}[]
}
type sendMessageActionType = {
    type: typeof SEND_MESSAGE, newMessageBody: string
};
type sendMessageActionCreatorType = (newMessageBody: string) => sendMessageActionType

const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState: initialStateType = {
    dialogs: [
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Vitaliy' },
        { id: 3, name: 'Ivan' },
        { id: 4, name: 'Dima' }
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ],
};

const dialogsReducer = (state = initialState, action: sendMessageActionType ) => {

    switch (action.type) {


        case SEND_MESSAGE:
            let newMessageID = state.messages.length;
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: newMessageID, message: body }],
            };

        default:
            return state;

    }
}



export const sendMessageCreator: sendMessageActionCreatorType  = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;
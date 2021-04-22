import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { CreateField, Input, TextArea } from '../common/FormControls/FormControls';
import {required, maxLengthCreator } from '../../Utilits/Validators/validators';
import { initialStateType } from '../../redux/dialogs-reducer';

type PropsType ={
    dialogsPage: initialStateType
    sendMessage: (message: string) => void
}


const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

    let addNewMessageChange = (values : NewMessageBodyFormType) => {
        props.sendMessage(values.newMessageBody);
        values.newMessageBody ="";
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <ReduxAddMessageForm onSubmit={addNewMessageChange} />
            </div>
        </div >
    )
}
const maxLenght = maxLengthCreator(1000);

const AddMessageForm: React.FC<InjectedFormProps<NewMessageBodyFormType>>= (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className={s.textButtonArea}>
                {CreateField<NewMessageBodyPropertiesType>("Message", "newMessageBody", [required, maxLenght], Input)}
                <div><button>Send</button></div>
            </form>
        </div>
    )
}

type NewMessageBodyPropertiesType = Extract< keyof NewMessageBodyFormType, string> // type includes key of LoginFormType, to limim posible names of fields

export type NewMessageBodyFormType = {
    newMessageBody: string
}

const ReduxAddMessageForm = reduxForm<NewMessageBodyFormType>({form: "sendMessage"})(AddMessageForm)

export default Dialogs;
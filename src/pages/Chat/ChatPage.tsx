import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {MessageType} from '../../API/chat-api'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reduser'
import { AppStateType } from '../../redux/redux-store'

export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}



const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () =>
        {dispatch(stopMessagesListening())}
    }, [])
    


    return (
        <div>
            <Messages  />
            <AddMessageForm  />
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state:AppStateType) => state.chatPage.messages)

    return (
        <div style={{ height: "500px", overflow: "auto", marginTop: "30px", padding: "20px" }}>
            {messages.map((m: MessageType, index) => <Message key={index} message={m} />)}

        </div>
    )
}

const Message: React.FC<{ message: MessageType }> = ({ message }) => {

    return (
        <div style={{ border: "2px double black", background: "#DDD", margin: "10px" }}>
            <div >
                <img style={{ width: "50px", borderRadius: "50%" }} src={message.photo} />
                <b style={{ marginLeft: "10px" }}>{message.userName}</b>
            </div>
            <div style={{ marginLeft: "60px" }} >
                {message.message}
            </div>
        </div>
    )
}
const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')


    const dispatch = useDispatch()
     
    const SendMessageHandler = () => {
        if (!message) {
            return
        }
        else {
            dispatch(sendMessage(message))
            setMessage('')
        }

    }
    return (
        <div>
            <div>
                <textarea style={{ width: "300px", marginLeft: "30px", resize: "none" }}
                    onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>

            </div>
            <div>
                <Button disabled={false} style={{ marginLeft: "30px" }}
                    danger={true} onClick={SendMessageHandler}>Send</Button>
            </div>
        </div>
    )
}
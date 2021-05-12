import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

const WS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat: React.FC = () => {



    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([])

    useEffect(() => {
        WS.addEventListener('message', (e) => {
            const newMesage = JSON.parse(e.data)
            setMessages((prevMessages => [...prevMessages, ...newMesage]))
        })
    },[])

    return (
        <div style={{ height: "500px", overflow: "auto", marginTop: "30px", padding: "20px" }}>
            {messages.map((m: MessageType, index) => <Message key={index} message={m} />)}

        </div>
    )
}

const Message: React.FC<{ message: MessageType }> = ({ message }) => {

    return (
        <div  style={{border: "2px double black", background: "#DDD", margin: "10px" }}>
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
    const sendMessage = ()=>{
        if(!message){
            return
        }
        else{
            WS.send(message)
            setMessage('')
        }
        
    }
    return (
        <div>
            <div>
                <textarea  style={{ width: "300px", marginLeft: "30px", resize: "none" }}
                onChange={(e) => setMessage(e.currentTarget.value)} value = {message}></textarea> 
               
            </div>
            <div>
            <Button style={{marginLeft: "30px" }} danger ={true} onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

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
    const [WS, setWS] = useState<WebSocket | null>(null)
    let newWS: WebSocket

    useEffect(() => {
        const closeHandler = () => {
            console.log("WS closed")
            setTimeout(createChannel, 3000)
        }

        function createChannel() {

            newWS?.removeEventListener('close', closeHandler)
            newWS?.close()

            newWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

            newWS?.addEventListener('close', closeHandler)
            setWS(newWS)
        }
        createChannel()

        return () => {
            newWS?.removeEventListener('close', closeHandler)
            newWS?.close();
        }
    }, [])

    return (
        <div>
            <Messages WS={WS} />
            <AddMessageForm WS={WS} />
        </div>
    )
}

const Messages: React.FC<{ WS: WebSocket | null }> = ({ WS }) => {
    const [messages, setMessages] = useState<MessageType[]>([])

    useEffect(() => {
        const messageHandler = (e:MessageEvent) => {
            const newMesage = JSON.parse(e.data)
            setMessages((prevMessages => [...prevMessages, ...newMesage]))
        }
        WS?.addEventListener('message', messageHandler)

        return () => {
            WS?.removeEventListener('message', messageHandler)
        }
    }, [WS])

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
const AddMessageForm: React.FC<{ WS: WebSocket | null }> = ({ WS }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')


    useEffect(() => {

        const openHandler = () => {
            setReadyStatus('ready')
        }

        WS?.addEventListener('open', openHandler)

        return () => {
            WS?.removeEventListener('open', openHandler)
        }
    }, [WS])


    const sendMessage = () => {
        if (!message) {
            return
        }
        else {
            WS?.send(message)
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
                <Button disabled={WS == null || readyStatus !== 'ready'} style={{ marginLeft: "30px" }}
                    danger={true} onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}
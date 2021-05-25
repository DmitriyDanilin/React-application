let newWS: WebSocket | null = null
export type StatusType = 'pending' | 'ready' | 'error'

const closeHandler = () => {
    console.log("WS closed")
    subscribers['status-changed'].forEach(s => s('pending'))
    setTimeout(createChannel, 3000)
}
type EventType = 'message-received' | 'status-changed'

const messageHandler = (e:MessageEvent) => {
    const newMesage = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMesage))
} 
const openHandler = () => {
    subscribers['status-changed'].forEach(s => s('ready'))
} 

const errorHandler = () => {
    subscribers['status-changed'].forEach(s => s('error'))
}
const CleanUp = () => {
    newWS?.removeEventListener('close', closeHandler)
    newWS?.removeEventListener('message', messageHandler)
    newWS?.removeEventListener('open', openHandler)
    newWS?.removeEventListener('error', errorHandler)
}

export function createChannel() {

    CleanUp()
    newWS?.close()

    newWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    subscribers['status-changed'].forEach(s => s('pending'))
    newWS.addEventListener('close', closeHandler)
    newWS.addEventListener('message', messageHandler)
    newWS.addEventListener('open', openHandler)
    newWS.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribers['message-received'] = []
        subscribers['status-changed'] =[]
        CleanUp()
        newWS?.close()
        
    },
    subscribe(eventName: EventType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType | null){
        //@ts-ignore
        subscribers[eventName].push(callback)//wtf???
        return () =>{
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s!== callback)
        }
    },
    unsubscribe(eventName: EventType,callback: MessageReceivedSubscriberType | StatusChangedSubscriberType | null){
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s!== callback)
    },
    sendMessage(message:string) {
        newWS?.send(message)
    }


}
export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type MessageReceivedSubscriberType = (messages: MessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

let subscribers = {
   'message-received': [] as Array<MessageReceivedSubscriberType>,
    'status-changed' : [] as Array<StatusChangedSubscriberType>

}
let newWS: WebSocket | null = null

const closeHandler = () => {
    console.log("WS closed")
    setTimeout(createChannel, 3000)
}

const messageHandler = (e:MessageEvent) => {
    const newMesage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMesage))
} 

export function createChannel() {

    newWS?.removeEventListener('close', closeHandler)
    newWS?.close()

    newWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

    newWS.addEventListener('close', closeHandler)
    newWS.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start(){createChannel()},
    stop(){
        subscribers = []
        newWS?.removeEventListener('close', closeHandler)
        newWS?.removeEventListener('message', messageHandler)
        newWS?.close()
        
    },
    subscribe(callback: (messages: MessageType[]) => void){
        subscribers.push(callback)
        return () =>{
            subscribers = subscribers.filter(s => s!== callback)
        }
    },
    unsubscribe(callback: (messages: MessageType[]) => void){
        subscribers = subscribers.filter(s => s!== callback)
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
type SubscriberType = (messages: MessageType[]) => void

let subscribers = [] as Array<SubscriberType>
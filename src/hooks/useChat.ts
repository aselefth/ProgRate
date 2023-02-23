import { HubConnectionBuilder } from "@microsoft/signalr"
import { useEffect, useState } from "react"
import { useLazyGetMessagesQuery, useSendMessageMutation } from "../store/Api/messagesApiSlice"
import { IMessage } from "../types/types"

export default function useChat () {

    const [chat, setChat] = useState<IMessage[]>([])
    const [getMessages] = useLazyGetMessagesQuery()
    const [addMessage] = useSendMessageMutation()

    useEffect(() => {
        handleGetMessages()

        const connection = new HubConnectionBuilder()
            .withUrl('http://localhost:8080/hubs/chat')
            .withAutomaticReconnect()
            .build()

        connection
            .start()
            .then(() => {
                connection.on('ReceiveMessage', (message: IMessage) => {
                    setChat((prev) => [...prev, message])
                })
            })
            .catch((e) => console.log('Connection failed: ', e))
    }, [])

    async function handleGetMessages() {
        try {
            const messages = await getMessages(undefined).unwrap()
            setChat(messages)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleSendMessage(message: string) {
        try {
            await addMessage({ message })
        } catch (e) {
            console.log(e)
        }
    }

    return {chat, handleGetMessages, handleSendMessage}
}
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { useEffect, useState } from "react"
import { useLazyGetMessagesQuery, useSendMessageMutation } from "../store/Api/messagesApiSlice"
import { useGetUserQuery } from "../store/Api/userApislice"
import { IMessage } from "../types/types"
import { useAppSelector } from "./redux"

export default function useChat (groupName: string) {

    const {isLogged} = useAppSelector(state => state.authSlice)
    const [chat, setChat] = useState<IMessage[]>([])
    const [getMessages] = useLazyGetMessagesQuery()
    const [addMessage] = useSendMessageMutation()
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const {data: user} = useGetUserQuery(undefined, {skip: 
        !isLogged
    })

    useEffect(() => {
        handleGetMessages(groupName)

        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:8080/hubs/chat')
            .withAutomaticReconnect()
            .build()

        newConnection
            .start()
            .then(() => {
                newConnection.on('ReceiveMessage', (message, usr) => {
                    // setChat((prev) => [...prev, message])
                    console.log(message, usr)
                })
            })
            .catch((e) => console.log('Connection failed: ', e))

            newConnection.on('Notify', (msg) => {
                console.log('notify', msg)
            })
        
            newConnection.invoke('Enter', user?.userName, groupName)

            setConnection(newConnection)
    }, [])

    async function handleGetMessages(groupName: string) {
        try {
            const messages = await getMessages(groupName).unwrap()
            setChat(messages)
        } catch (e) {
            console.log(e)
        }
    }

    async function handleSendMessage(message: string) {
        try {
            const res = await addMessage({ message, groupName })
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return {chat, handleGetMessages, handleSendMessage}
}
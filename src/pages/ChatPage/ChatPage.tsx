import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Message from '../../components/Message/Message'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { joinGroup, sendMessage } from '../../services/chatsService'
import {
    useGetMessagesQuery,
    useLazyGetMessagesQuery,
    useSendMessageMutation,
} from '../../store/Api/messagesApiSlice'
import { useGetUserQuery } from '../../store/Api/userApislice'
import { setGroupName } from '../../store/Slices/connectionSlice'
import { IMessage } from '../../types/types'

export default function ChatPage() {
    const { isLogged } = useAppSelector((state) => state.authSlice)
    const { groupName } = useParams()
    const [chat, setChat] = useState<IMessage[]>([])
    const msg = useRef<HTMLInputElement>(null)
    const { connection } = useAppSelector((state) => state.connectionSlice)
    const { data: user } = useGetUserQuery(undefined, {
        skip: !isLogged,
    })
    const [getMessages] = useLazyGetMessagesQuery()
    const [addMessage] = useSendMessageMutation()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setGroupName({ groupName: String(groupName) }))
        handleGetMessages()
        if (connection) {
            connection
                .start()
                .then((result) => {
                    console.log('Connected!')
                    joinGroup(connection, String(groupName))
                    connection.on('ReceiveMessage', (message: IMessage) => {
                        setChat((prev) => [...prev, message])
                    })
                })
                .catch((e) => console.log('Connection failed: ', e))
        }
    }, [])

    async function handleGetMessages() {
        const res = await getMessages(String(groupName))
        res?.data && setChat(res?.data)
    }

    async function handleSendMessage() {
        await sendMessage(
            connection,
            String(msg?.current?.value),
            String(user?.userId),
            String(groupName)
        )
        await addMessage({
            message: String(msg?.current?.value),
            groupName: String(groupName),
        })
    }

    return (
        <div className="flex flex-col gap-2">
            {chat?.map((msg) => (
                <Message key={Math.random()} chat={msg}/>
            ))}
            <div className="flex gap-2">
                <input ref={msg} />
                <button
                    className="px-4 py-2 bg-blue-300 shadow-md"
                    onClick={() => handleSendMessage()}
                >
                    send
                </button>
            </div>
        </div>
    )
}


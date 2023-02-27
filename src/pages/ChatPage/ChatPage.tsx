import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Message from '../../components/Message/Message'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { joinGroup, sendMessage } from '../../services/chatsService'
import {
    useLazyGetMessagesQuery,
    useSendMessageMutation,
} from '../../store/Api/messagesApiSlice'
import { useGetUserQuery } from '../../store/Api/userApislice'
import { setGroupName } from '../../store/Slices/connectionSlice'
import { IMessage } from '../../types/types'
import styles from './ChatPage.module.scss'

export default function ChatPage() {
    const { isLogged } = useAppSelector((state) => state.authSlice)
    const { groupName } = useParams<{ groupName: string }>()
    const [chat, setChat] = useState<IMessage[]>([])
    const msg = useRef<HTMLTextAreaElement>(null)
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
                .then(() => {
                    console.log('Connected!')
                    joinGroup(connection, `${groupName}`)
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
            `${msg?.current?.value}`,
            `${user?.userId}`,
            `${groupName}`
        )
        await addMessage({
            message: `${msg?.current?.value}`,
            groupName: `${groupName}`,
        })
    }

    return (
        <div className={styles.chatPageWrapper}>
            {chat?.map((msg) =>
                msg.userId === user?.userId ? (
                    <Message
                        key={Math.random()}
                        chat={msg}
                        selfPosition="right"
                    />
                ) : (
                    <Message
                        key={Math.random()}
                        chat={msg}
                        selfPosition="left"
                    />
                )
            )}
            <form
                className={styles.messageForm}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                }}
            >
                <textarea ref={msg} />
                <Button type='submit'>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </form>
        </div>
    )
}

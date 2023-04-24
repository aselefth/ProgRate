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
    const isLogged = useAppSelector((state) => state.authSlice.isLogged)
    const { groupName } = useParams<{ groupName: string }>()
    const [chat, setChat] = useState<IMessage[]>([])
    const msg = useRef<HTMLTextAreaElement>(null)
    const scroller = useRef<HTMLSpanElement>(null)
    const connection = useAppSelector((state) => state.connectionSlice.connection)
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
        window.scrollTo(0, document.body.scrollHeight)
    }

    async function handleSendMessage() {
        try {
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
        } catch (e) {
            console.log(e)
        } finally {
            if (msg.current) msg.current.value = ''
            scroller.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
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
            <span ref={scroller}></span>
            <form
                className={styles.messageForm}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                }}
            >
                <textarea ref={msg} />
                <Button type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </form>
        </div>
    )
}

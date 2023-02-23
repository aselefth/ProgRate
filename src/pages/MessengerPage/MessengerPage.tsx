import { useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import Message from '../../components/Message/Message'
import styles from './MessengerPage.module.scss'
import useChat from '../../hooks/useChat'

export default function MessengerPage() {
    const message = useRef<HTMLTextAreaElement>(null)
    const { chat, handleSendMessage } = useChat()

    return (
        <div className={styles.messengerPageWrapper}>
            <div className={styles.messages}>
                {chat.map((message) => (
                    <Message key={Math.random()} chat={message} />
                ))}
            </div>
            <form
                className={styles.inputContainer}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage(String(message?.current?.value))
                }}
            >
                <textarea ref={message} />
                <Button type='submit' fontSize='1.25rem'>
                    submit
                </Button>
            </form>
        </div>
    )
}

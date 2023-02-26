import { useRef, useState } from 'react'
import Button from '../../components/Button/Button'
import Message from '../../components/Message/Message'
import styles from './MessengerPage.module.scss'
import useChat from '../../hooks/useChat'

export default function MessengerPage() {
    const message = useRef<HTMLTextAreaElement>(null)
    // const { chat, handleSendMessage } = useChat()

    return (
        <div className='flex flex-col gap-4 relattive'>
            <div className='flex flex-col gap-2'>
                {chat.map((message) => (
                    <Message key={Math.random()} chat={message} />
                ))}
            </div>
            <form
                style={{border: '2px solid var(--buttonBlue)'}}
                className='flex gap-2 bg-white p-2 rounded shadow-lg fixed bottom-2 w-[700px]'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage(String(message?.current?.value))
                    if (message.current) {
                        message.current.value = ''
                    }
                }}
            >
                <textarea ref={message} className='w-full overflow-y-scroll outline-none text-lg max-h-16'/>
                <Button type='submit' fontSize='1.25rem' height='2rem'>
                    submit
                </Button>
            </form>
        </div>
    )
}

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import {
    useCreateGroupMutation,
    useGetGroupsQuery,
} from '../../store/Api/groupsApiSlice'
import styles from './ChatHomePage.module.scss'

export default function ChatHomePage() {
    const grpName = useRef<HTMLInputElement>(null)
    const { data: chats } = useGetGroupsQuery(undefined)
    const navigate = useNavigate()
    const [createChat] = useCreateGroupMutation()

    async function handleCreateChat(groupName: string) {
        try {
            const res = await createChat(groupName)
            if (grpName.current) grpName.current.value = ''
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.chatHomePageWrapper}>
            <section className={styles.createGroupWrapper}>
                <span>не нашли нужную тему?</span>
                <div className={styles.inpContainer}>
                    <input type="text" ref={grpName} />
                    <Button
                        onclick={() =>
                            handleCreateChat(String(grpName?.current?.value))
                        }
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <span></span>
                    </Button>
                </div>
            </section>
            <section className={styles.chatsContainer}>
                {chats?.map((chat: { id: number; groupName: string }) => (
                    <div
                        className={styles.chat}
                        key={Math.random()}
                        onClick={() => navigate(`/messages/${chat.groupName}`)}
                    >
                        {chat.groupName}
                    </div>
                ))}
            </section>
        </div>
    )
}
